/**
 * Created by BreezeDust on 16/2/25.
 */
var patch=require('path');
global.APP_PATCH=patch.resolve(__dirname,"../../");
/********************************/
var UserModel = require(APP_PATCH+"/model/UserModel");
var assert = require('assert');

describe('--->UserModel', function () {
    it('#add',function(){
        var jsonData={
            githubToken:"testToken",
            userName:"testUserName",
            userEmail:"testUserEmail",
            userIco:"testUserIco"
        };
        UserModel.add(jsonData,function(err,res){
            if(err){
                return done(err);
            }
            else{
                return done(res);

            }
        });
    });
});