'use strict';

/*
 GET /articles
 | Enable CORS
 | Method Request -> Query Strings: p
 | Integration Request -> Mapping Templates: application/json
 |                                 Template: { "page": "$input.params('p')" }
 | Method Response -> Content type: application/json;charset=UTF-8 Empty
 | Method Response + 404
 | Integration Response + "not found" 404
 */

const aws = require('aws-sdk');
const s3 = new aws.S3({ apiVersion: '2006-03-01' });

const GEN_BUCKET_NAME = "sambaiz-net-gen";
const PAGE_KEY = (page) => `article-page${page}.json`;

function promise(func, param) {
    return new Promise((resolve, reject) => {
        func(param, (err, data) => {
            if(err) reject(err);
            else resolve(data);
        });
    });
}

function getArticles(page, callback){
    let param = {Bucket: GEN_BUCKET_NAME, Key: PAGE_KEY(page)};
    promise(s3.getObject.bind(s3), param).then(
        (data) => {
            callback(null, JSON.parse(data.Body.toString()));
        },
        (err) => {
            console.log(err);
            callback('not found', null);
        }
    );
}

exports.handler = (event, context, callback) => {
    getArticles(event.page, callback);
};
