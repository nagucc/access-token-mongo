/**
 * Created by 文琪 on 2015/3/1.
 */

var MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID;
var array = require('array');
var uuid = require('node-uuid');
var moment = require('moment');


/**
 * 初始化
 * @param connString
 * 数据库连接字符串
 * @param collection
 * 保存access_token使用的Collection的名称，默认为'access_tokens'
 * @returns {{getToken: Function, saveToken: Function}}
 */
module.exports = function(connString, collection){
    collection = collection || 'access_tokens';
    return {
        // 获取指定的AccessToken
        /**
         * @param options
         * 指定参数。
         * appId
         * appSecret
         * expire 过期时间，默认为7000秒
         * @param callback
         */
        getToken: function (options, callback) {
            MongoClient.connect(connString, function (err, db) {
                var at = db.collection(collection);
                at.findOne({
                    'appId': options.appId,
                    'appSecret': options.appSecret,
                    'expire': {'$gt': new Date()}
                }, function (err, at) {
                    db.close();
                    if(at == null){
                        callback('error');
                    } else {
                        callback(err, at.token);
                    }
                });
            });
        },
        saveToken: function (options, token, callback) {
            options.expire = options.expire || 7000;
            MongoClient.connect(connString, function (err, db) {
                var at = db.collection(collection);
                at.update({
                    'appId': options.appId,
                    'appSecret': options.appSecret
                }, {
                    'appId': options.appId,
                    'appSecret': options.appSecret,
                    'expire': moment().add(options.expire, 's').toDate(),
                    'token': token
                }, {upsert: true}, function (err, doc) {
                    db.close();
                    callback(err, doc);
                });
            });
        }
    };
}