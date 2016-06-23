'use strict';

const aws = require('aws-sdk');
const s3 = new aws.S3({ apiVersion: '2006-03-01' });

const ARTICLE_BUCKET_NAME = "sambaiz-net-article";
const GENERATE_BUCKET_NAME = "sambaiz-net-gen";
const PAGE_KEY = (page) => `article-page${page}.json`;
const ID_KEY = (id) => `article-id-${id}.json`;
const ID_DATE_KEY_PREFIX = 'article-id-date'
// order by date desc (Amazon S3 lists objects in UTF-8 character encoding in lexicographical order.)
function orderByDateDesc(date) {
  let n = (new Date().getTime() + "").length;
  return (Array(n+1).join("0") + (Math.pow(10,n) - new Date(date).getTime())).slice(-1 * n)
}
const ID_DATE_KEY = (id, date) => `${ID_DATE_KEY_PREFIX}-${orderByDateDesc(date)}-${id}.json`;
const ORIGIN_KEY_TO_ID_DATE_KEY = (key) => `article-origin-key-to-id-date-${key}`;
const NUM_ARTICLES_PER_PAGE = 50;

/**
 * functions for S3
 */

function promise(func, param) {
    return new Promise((resolve, reject) => {
        func(param, (err, data) => {
            if(err) reject(err);
            else resolve(data);
        });
    });
}

function listObjectsV2(bucket, maxKeys, prefix, continuationToken){
  let param = {Bucket: bucket, MaxKeys: maxKeys};
  if (prefix) param.Prefix = prefix;
  if (continuationToken) param.ContinuationToken = continuationToken;
  return promise(s3.listObjectsV2.bind(s3),
    param
  )
}

function getObject(bucket, key) {
  let param = {Bucket: bucket, Key: key};
  return promise(s3.getObject.bind(s3), param);
}

function uploadObject(bucket, key, body) {
  let param = {Bucket: bucket, Key: key, Body: body};
  return promise(s3.upload.bind(s3), param);
}

function deleteObject(bucket, key) {
  let param = {Bucket: bucket, Key: key};
  return promise(s3.deleteObject.bind(s3), param);
}

function formatArticle(article) {
    return {
        id: article.id,
        date: article.date,
        title: article.title,
        tags: article.tags
    };
}

function updateArticlesPage(callback) {

    function updatePage(page, continuationToken) {
        // 1. get key
        listObjectsV2(GENERATE_BUCKET_NAME, NUM_ARTICLES_PER_PAGE, ID_DATE_KEY_PREFIX, continuationToken).then(
            (objs) => {
                // 2. get data
                Promise.all(
                    objs.Contents.map((obj) =>
                        getObject(GENERATE_BUCKET_NAME, obj.Key)
                    )
                ).then(
                    (data) =>
                        // 3. upload page
                        uploadObject(GENERATE_BUCKET_NAME, PAGE_KEY(page),
                          JSON.stringify(data.map((a) => formatArticle(JSON.parse(a.Body.toString()))))
                        )
                ).then(
                    (_) => {
                        if (objs.isTruncated) return objs.updatePage(page + 1, objs.NextContinuationToken);
                        else {
                            callback(null, 'updating page finished');
                        }
                    }
                ).catch((err) => {
                    console.log(err);
                    callback(`failed to update page ${page}`, null);
                });
            }
        ).catch((err) => {
            console.log(err);
            callback('failed to get objects list', null);
        });
    }

    updatePage(1);
}

/*
  upload
   - article detail data (concat article meta-data(.json) and detail(.md)) fetched by id
   - article index data (article meta-data only) having key includes id and date
  to GENERATE_BUCKET
*/
function updateArticle(key) {
  // exist both *.json and *.md
  return getObject(
    ARTICLE_BUCKET_NAME, ((k) => `${k[0]}.${({json:"md",md:"json"})[k[1]]}`)(key.split("."))
  ).then(
    (_) =>
      getObject(ARTICLE_BUCKET_NAME, key.replace(".md", ".json"))
  ).then(
    (a) => {
      let json = JSON.parse(a.Body.toString())
      return getObject(
        ARTICLE_BUCKET_NAME, key.replace(".json", ".md")
      ).then(
        (md) =>
          uploadObject(
            GENERATE_BUCKET_NAME, ID_KEY(json.id),
            ((json) => {json.detail = md.Body.toString(); return JSON.stringify(json)})(json)
          )
      ).then(
        (_) =>
          uploadObject(
            GENERATE_BUCKET_NAME, ID_DATE_KEY(json.id, json.date),
            JSON.stringify(json)
          )
      ).then(
        (_) =>
          // After origin object is deleted, this id and date is used for deleting objects from GENERATE_BUCKET
          uploadObject(GENERATE_BUCKET_NAME, ORIGIN_KEY_TO_ID_DATE_KEY(key.replace(".md", ".json")),
            JSON.stringify({id: json.id, date: json.date})
          )
      )
    }
  )
}

// delete objects from GENERATE_BUCKET
function deleteArticle(key) {
  return getObject(
    GENERATE_BUCKET_NAME, ORIGIN_KEY_TO_ID_DATE_KEY(key.replace(".md", ".json"))
  ).then(
    (a) => {
      let json = JSON.parse(a.Body.toString());
      return deleteObject(
        GENERATE_BUCKET_NAME, ID_DATE_KEY(json.id, json.date)
      ).then(
        (_) => deleteObject(GENERATE_BUCKET_NAME, ID_KEY(json.id))
      )
    }
  ).then(
    (_) =>
      deleteObject(GENERATE_BUCKET_NAME, ORIGIN_KEY_TO_ID_DATE_KEY(key.replace(".md", ".json")))
  );
}

/*
 Article data is updated at the time of uploading article data to S3.
 */
exports.handler = (event, context, callback) => {
    let eventName = event.Records[0].eventName;
    if(eventName === "ObjectCreated:Put") deleteArticle(event.Records[0].s3.object.key).then(
        (_) => Promise.resolve(), (_) => Promise.resolve()
      ).then(
        (_) => updateArticle(event.Records[0].s3.object.key).then(
          (_) => updateArticlesPage(callback), (_) => callback(null, 'both json meta-data and markdown detail-data required')
        )
      );

    else if(eventName === "ObjectRemoved:Delete") deleteArticle(event.Records[0].s3.object.key).then(
      (_) => updateArticlesPage(callback), (_) => callback(null, 'nothing to delete')
    );

    else {
      console.log(`Unknown event name ${eventName}`);
      callback(`Unknown event name`, null);
    }
};
