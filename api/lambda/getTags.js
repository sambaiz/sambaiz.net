'use strict';

/*
 GET /tags
 | Enable CORS
 | Method Response -> Content type: application/json;charset=UTF-8 Empty
 */

const aws = require('aws-sdk');
const s3 = new aws.S3({ apiVersion: '2006-03-01' });

const GEN_BUCKET_NAME = "sambaiz-net-gen";
const TAG_LIST_KEY = `tag.json`;

function promise(func, param) {
    return new Promise((resolve, reject) => {
        func(param, (err, data) => {
            if(err) reject(err);
            else resolve(data);
        });
    });
}

function getTags(callback){
    let param = {Bucket: GEN_BUCKET_NAME, Key: TAG_LIST_KEY};
    promise(s3.getObject.bind(s3), param).then(
        (data) => {
            callback(null, JSON.parse(data.Body.toString()));
        },
        (err) => {
            console.log(err);
            callback('error', null);
        }
    );
}

exports.handler = (event, context, callback) => {
    getTags(callback);
};
