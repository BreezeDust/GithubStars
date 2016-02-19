/**
 * Created by BreezeDust on 16/2/4.
 */
var express = require('express');
var router = express.Router();
var http = require('http');
var https = require('https');
var net=require('../tools/NetBase');

router.get('/', function(req, res) {
    res.set({'Content-Type':'text/json','Encodeing':'utf8'});
    var api="https://api.github.com/users/breezedust/starred";
    var callBack=net.get(api);
    callBack.on('end', function(body) {
        res.send(body);

    });
    callBack.on('error',function(e){
        res.send(e.message);
    });
});

module.exports = router;
