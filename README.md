# access-token-mongo
使用MongoDB读取和保存access_token

## 目的
当我们调用某些基于OAuth认证的API时，常常需要使用保存在一定时间范围内有效的access_token信息。
**access-token-mongo**组件为此类功能提供了统一的解决方案，使用MongoDB保存需要access_token。

## 安装
`npm install access-token-mongo`

## 用法


```
var API = require('wechat-enterprise-api');
var AccessToken = require('access-token-mongo')(config.db);

var wxapi = new API('your appId', 'your secret', 0,
    function(callback){
        AccessToken.getToken({      // 获取数据库中保存的access_token
            appId: 'your appId',
            appSecret: 'your secret'
        }, function(err, token){
            callback(null, token);
        });
    },
    function(token, callback){
        AccessToken.saveToken({     // 保存access_token到数据库中
            appId: 'your appId',
            appSecret: 'your secret'
        }, token, function(){
            callback(null, token);
        });
    });

```