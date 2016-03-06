/**
 * Created by BreezeDust on 16/3/1.
 */
var express = require('express');
var router = express.Router();
var config = require(APP_PATCH + "/config")
var net = require(APP_PATCH + '/tools/NetBase');
var API = require(APP_PATCH + '/GithubAPI');
var CryptoUtils = require(APP_PATCH + "/tools/CryptoUtils");
var UserModel = require(APP_PATCH + "/model/UserModel");


router.get('/login', function (req, res) {
    console.log("--->", "login");
    res.redirect(API.toLogin + "?" + "client_id=" + config.appClientID + "&scope=" + "user");
});
router.get('/callback', function (req, res) {
    res.set({'Content-Type': 'text/json', 'Encodeing': 'utf8'});
    var jsonData = {
        "client_id": config.appClientID,
        "client_secret": config.appClientSecret,
        "code": req.query.code
    };
    var headerData = {
        "Accept": "application/json",
        'User-Agent': 'request'
    };
    var response = net.post(API.getAccessToken, jsonData, headerData);
    response.on("end", function (body, postRes) {
        if (postRes.statusCode == 200) {
            var obj = JSON.parse(body);
            console.log("--->", obj.access_token);
            _saveTokenAndUserInfo(obj.access_token,function(err,res){
                if(err){
                    // TODO 写入失败
                }
                else{
                    // TODO 写入成功
                }
            });
        } else {
            // TODO 授权失败
            res.send(body);
        }
    });

});
function _saveTokenAndUserInfo(token,callback) {
    var jsonData = {
        "access_token": token
    };
    var headerData = {
        "Accept": "application/json",
        'User-Agent': 'request'
    };
    var responseUser = net.get(API.getUser, jsonData, headerData);
    responseUser.on("end", function (body, getRes) {
        console.log(body);
        if (getRes.statusCode == 200) {
            var user = JSON.parse(body);
            var jsonData = {
                githubID: user.id,
                githubToken: token,
                tokenPassword: _createTokenPassword(),
                userName: user.name,
                userEmail: user.email,
                userIco: user.avatar_url
            };
            UserModel.getByGithubID(jsonData.githubID,function(err,res){
                if(err){
                    // TODO 写入失败
                    console.log(err);
                }
                else{
                    //console.log(res.length+" "+res[0]["githubID"]);
                    if(res.length>0){
                        // 存在用户
                        jsonData.userID=res[0]["userID"];
                        UserModel.updateByUserID(jsonData,callback);
                    }
                    else{
                        // 不存在
                        UserModel.add(jsonData,callback);
                    }
                }
            });


        }
    });
}
function _createTokenPassword(){
    return CryptoUtils.md5("---");
}
module.exports = router;