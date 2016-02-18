/**
 * Created by BreezeDust on 16/2/4.
 */
var express = require('express');
var router = express.Router();
var http = require('http');
var https = require('https');


router.get('/', function(req, res) {
    res.set({'Content-Type':'text/json','Encodeing':'utf8'});

    var options = {
        hostname: 'api.github.com',
        port: 443,
        path: '/users/breezedust/starred',
        method: 'GET',
        headers: {
            'User-Agent': 'request'
        }
    };

    var req = https.request(options, function(getRes){
        var body = '';
        getRes.on('data', function(chunk) {
            body += chunk;
        });
        getRes.on('end', function() {
            res.send(body);

        });
    });
    req.end();
    req.on('error',function(e){
        res.send(e.message);
    });
});

module.exports = router;
