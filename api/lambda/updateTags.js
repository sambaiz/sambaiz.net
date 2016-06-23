'use strict';

const aws = require('aws-sdk');
const s3 = new aws.S3({ apiVersion: '2006-03-01' });

const TAG_BUCKET_NAME = "sambaiz-net-tag";
const GENERATE_BUCKET_NAME = "sambaiz-net-gen";
const TAG_LIST_KEY = `tag.json`;

function promise(func, param) {
    return new Promise((resolve, reject) => {
        func(param, (err, data) => {
            if(err) reject(err);
            else resolve(data);
        });
    });
}

function formatTag(tag) {
    return {
        name: tag.name,
        color: tag.color
    };
}

function updateTagList(callback) {

    function updateList(page, continuationToken, tags) {

        if (!tags) tags = []

        let param = {Bucket: TAG_BUCKET_NAME};
        if (continuationToken) param.ContinuationToken = continuationToken;

        // 1. get key
        promise(
            s3.listObjectsV2.bind(s3), param
        ).then(
            (objs) => {
                // 2. get data
                Promise.all(
                    objs.Contents.map((obj) => {
                        let param = {Bucket: TAG_BUCKET_NAME, Key: obj.Key};
                        return promise(s3.getObject.bind(s3), param);
                    })
                ).then(
                    (tgs) => {
                        if (objs.isTruncated) updateList(page + 1, objs.NextContinuationToken, tags.concat(tgs));
                        else {
                            // 3. upload tag list
                            promise(
                                s3.upload.bind(s3),
                                {
                                    Bucket: GENERATE_BUCKET_NAME,
                                    Key: TAG_LIST_KEY,
                                    Body: JSON.stringify(tags.concat(tgs).map((a) => formatTag(JSON.parse(a.Body.toString()))))
                                }
                            ).then(
                                (_) => {
                                    callback(null, 'updating tag finished');
                                }
                            );
                        }
                    }
                ).catch((err) => {
                    console.log(err);
                    callback(`failed to update tag`, null);
                });
            }
        ).catch((err) => {
            console.log(err);
            callback('failed to get objects list', null);
        });
    }

    updateList(1);
}

/*
 Tag list data is updated at the time of updating tag data in S3.
 */
exports.handler = (event, context, callback) => {
    let eventName = event.Records[0].eventName;
    if(eventName === "ObjectCreated:Put" || eventName === "ObjectRemoved:Delete"){
        updateTagList(callback);
    }else {
        console.log(`Unknown event name ${eventName}`);
        callback(`Unknown event name`, null);
    }
};
