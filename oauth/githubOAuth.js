/**
 * Created by BreezeDust on 16/3/1.
 */
var express = require('express');
var router = express.Router();
var config = require(APP_PATCH + "/config")
var net = require(APP_PATCH + '/tools/NetBase');
var API = require(APP_PATCH + '/GithubAPI');
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
            saveTokenAndUserID(obj.access_token);
        } else {
            res.send(body);
        }
    });

});
function saveTokenAndUserID(token) {
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
                userName: user.name,
                userEmail: user.email,
                userIco: user.avatar_url
            };
            UserModel.add(jsonData,function(err,res){
                if(err){
                    console.log(err);
                }
                else{
                    console.log(res);
                }
            });
        }
    });

}
module.exports = router;