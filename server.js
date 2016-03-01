global.APP_PATCH=__dirname;
/********************************/
var express = require('express');
var app = express();
var mystars = require('./api/mystars');
var githubAuth=require(APP_PATCH+'/oauth/githubOAuth');

//var net=require('./tools/NetBase');
//var callBack=net.get("https://www.baidu.com/");
//callBack.on('end', function(body) {
//    console.log(body);
//});
//callBack.on('error',function(e){
//    console.log(e);
//});

//var mysql=require("./database/mysql/mysql");
//mysql.query("INSERT INTO test (name,phone) VALUES ('t','222')");



app.use('/mystars', mystars);
app.use('/githubOAuth', githubAuth);
app.use(express.static('public'));
app.listen(8888);