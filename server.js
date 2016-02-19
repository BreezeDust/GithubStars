var express = require('express');
var app = express();
var mystars = require('./api/mystars');
//var net=require('./tools/NetBase');
//var callBack=net.get("https://www.baidu.com/");
//callBack.on('end', function(body) {
//    console.log(body);
//});
//callBack.on('error',function(e){
//    console.log(e);
//});
app.use('/mystars', mystars);

app.use(express.static('public'));
app.listen(8888);