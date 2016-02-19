/**
 * Created by BreezeDust on 16/2/19.
 */
var http = require('http');
var https = require('https');
var URL = require('url');

function CallBack(){
    this.method=[];
    CallBack.prototype.on=function(eventMethod,callback){
        this.method[eventMethod]=callback;
    };
    return this;
}
function get(url,jsonData){
    var parseUrl=URL.parse(url);
    //console.log(parseUrl);
    if(parseUrl.protocol.indexOf("http:")==0){
        if(parseUrl.port==null){
            parseUrl.port="80";
        }
        var options = {
            hostname: parseUrl.hostname,
            port: parseUrl.port,
            path: parseUrl.path,
            method: 'GET',
            headers: {
                'User-Agent': 'request'
            }
        };
        console.log("a");
    }
    else if(parseUrl.protocol.indexOf("https:")==0){
        if(parseUrl.port==null){
            parseUrl.port="443";
        }
        var options = {
            hostname: parseUrl.hostname,
            port: parseUrl.port,
            path: parseUrl.path,
            method: 'GET',
            headers: {
                'User-Agent': 'request'
            }
        };
        console.log(options);
        return sendHttps(options);
    }
}
function post(){
}

function sendHttp(options){

}
function sendHttps(options){
    var callBack=new CallBack();
    var req = https.request(options, function(res){
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            if(callBack.method["end"]!=null){
                callBack.method["end"](body);
            }
        });
    });
    req.end();
    req.on('error',function(e){
        if(callBack.method["error"]!=null){
            callBack.method["error"](e);
        }
    });
    return callBack;
}
exports.get=get;
exports.post=post;

