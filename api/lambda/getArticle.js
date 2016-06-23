'use strict';

/*
 GET /articles/{id}
 | Enable CORS
 | Integration Request -> Mapping Templates: application/json
 |                                 Template: { "id": "$input.params('id')" }
 | Method Response 200 -> Content type: application/json;charset=UTF-8 Empty
 | Method Response + 404
 | Integration Response + "not found" 404
 */

const aws = require('aws-sdk');
const s3 = new aws.S3({ apiVersion: '2006-03-01' });

const GEN_BUCKET_NAME = "sambaiz-net-gen";
const ID_KEY = (id) => `article-id-${id}.json`;

function promise(func, param) {
    return new Promise((resolve, reject) => {
        func(param, (err, data) => {
            if(err) reject(err);
            else resolve(data);
        });
    });
}

function getArticle(id, callback){
    let param = {Bucket: GEN_BUCKET_NAME, Key: ID_KEY(id)};
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
    getArticle(event.id, callback);
};
