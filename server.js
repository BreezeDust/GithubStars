var express = require('express');
var app = express();
var mystars = require('./api/mystars');
app.use('/mystars', mystars);

app.use(express.static('public'));
app.listen(8888);