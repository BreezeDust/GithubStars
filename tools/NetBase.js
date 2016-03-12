/**
 * Created by BreezeDust on 16/2/19.
 * 简单的发送基本请求的类
 */
var http = require('http');
var https = require('https');
var URL = require('url');
var QS = require('querystring');

var events = require('events');
var emitter = new events.EventEmitter();
/**
 * 链接类型
 * @type {{HTTP: 1, HTTPS: 2}}
 */
var LINKTYPE={
    HTTP:1,
    HTTPS:2
};

/**
 * 简单get请求
 * @param url
 * @param jsonData
 * @returns {*}
 */
function get(url,jsonData,headerData){
    var parseUrl=URL.parse(url);
    if(jsonData!=null){
        // 数据拼接
        var dataStr=QS.stringify(jsonData);
        var newQuery="";
        if(parseUrl.query=="" || parseUrl.query==null){
            newQuery=dataStr;
        }
        else{
            newQuery=parseUrl.query+"&"+dataStr;
        }
        parseUrl.query=newQuery;
        parseUrl.path=parseUrl.pathname+"?"+parseUrl.query;
    }
    console.log(parseUrl);
    console.log(dataStr);
    var options = {
        hostname: parseUrl.hostname,
        port: parseUrl.port,
        path: parseUrl.path,
        method: 'GET',
        headers: {
            'User-Agent': 'request'
        }
    };
    setHeader(options,headerData);
    var selectType=checkLinkType(parseUrl);
    console.log(options);
    return sendRequest(options,selectType);
}
/**
 * 简单post请求
 * @param url
 * @param jsonData
 * @returns {*}
 */
function post(url,jsonData,headerData){
    var parseUrl=URL.parse(url);
    var dataStr="";
    if(jsonData!=null){
        dataStr=QS.stringify(jsonData);
    }
    var options = {
        hostname: parseUrl.hostname,
        port: parseUrl.port,
        path: parseUrl.path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': dataStr.length
        }
    };
    setHeader(options,headerData);
    var linkType=checkLinkType(parseUrl);
    console.log(options);
    return sendRequest(options,linkType,dataStr);
}
function setHeader(options, headerData) {
    if (headerData != null) {
        for (var key in headerData) {
            options.headers[key]=headerData[key];
        }
    }
}
/**
 * 处理选择类型
 * @param parseUrl
 * @returns {*}
 */
function checkLinkType(parseUrl){
    if(parseUrl.protocol.indexOf("http:")==0){
        if(parseUrl.port==null || parseUrl.port==""){
            parseUrl.port="80";
        }
        return LINKTYPE.HTTP;
    }
    else if(parseUrl.protocol.indexOf("https:")==0){
        if(parseUrl.port==null || parseUrl.port==""){
            parseUrl.port="443";
        }
        return LINKTYPE.HTTPS;
    }
}
/**
 * 发送request请求
 * @param options
 * @param linkType
 * @returns {CallBack}
 * @param postData
 */
function sendRequest(options,linkType,postData){
    // 请求后回调
    var reqCallback=function(res){
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            emitter.emit("end",body,res);
        });
    };
    var req=null;
    if (linkType == LINKTYPE.HTTP) {
        req = http.request(options, reqCallback);
    }
    else {
        req = https.request(options, reqCallback);
    }
    req.on('error',function(e){
        emitter.emit("error",e);
    });
    // 处理post请求的数据
    if(postData!=null && typeof(postData)=="string"){
        req.write(postData);
    }
    req.end();
    return emitter;
}

///////////////////
exports.get=get;
exports.post=post;

