# access-token-mongo
使用MongoDB读取和保存access_token

## 目的
当我们调用某些基于OAuth认证的API时，常常需要使用保存在一定时间范围内有效的access_token信息。
**access-token-mongo**组件为此类功能提供了统一的解决方案，使用MongoDB保存需要access_token。

## 安装
`npm install access-token-mongo`

## 用法

### 保存和读取微信企业号平台操作时生成的access_token

```
var API = require('wechat-enterprise-api');
var AccessToken = require('access-token-mongo')('db connection string');

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

## API

### 初始化

`var AccessToken = require('access-token-mongo')(dbconn, collectionName);`

当我们需要使用 **access-token-mongo**时，首先需要初始化，初始化方法有两个参数：
- *dbconn* 此参数用于指定数据库的连接字符串。此参数是必须的。
- *collectionName* 此参数用于指定存放access_token数据的collection的名称。此参数是可选的，默认为“access_tokens”。

### 读取access_token

`AccessToken.getToken(options, callback)`

读取access_token的方法包括两个参数：
- *options* 参数对象。包括：
    - *appId* 用于指定获取access_token的appId，以便唯一标识一个access_token。此参数是必须的。
    - *secret* 用于指定获取access_token的secret，以便唯一标识一个access_token。此参数是必须的。
- *callback* 读取acccess_token之后执行的回调函数。包括两参数：
    - *err* 读取失败时的错误提示
    - *token* 读取到的access_token对象。

### 保存access_token

`AccessToken.saveToken(options, token, callback);`

保存access_token的方法包括三个参数：
- *options* 参数对象。包括：
    - *appId* 用于指定获取access_token的appId，以便唯一标识一个access_token。此参数是必须的。
    - *secret* 用于指定获取access_token的secret，以便唯一标识一个access_token。此参数是必须的。
    - *expire* 用于指定当前access_token的过期时间，单位是秒。此参数是可选的，默认为7000。
- *callback* 读取acccess_token之后执行的回调函数。包括两参数：
    - *err* 保存失败时的错误提示。
    - *doc* 保存access_token之后返回的对象。