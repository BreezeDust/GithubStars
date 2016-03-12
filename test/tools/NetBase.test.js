/**
 * Created by BreezeDust on 16/3/12.
 */
var patch=require('path');
global.APP_PATCH=patch.resolve(__dirname,"../../");
/********************************/
var Net=require(APP_PATCH+"/tools/NetBase");
var assert = require('assert');

describe('--->NetBase',function(){
    it('get',function(){
        var callBack = Net.get("https://www.baidu.com/");
        callBack.on('end', function (body) {
            return done(body);
        });
        callBack.on('error', function (e) {
            return done(e);
        });
    });
});