var express = require('express');
var app = express();

app.get('/GetLocation', function (req, res) {
    res.send('Hello EA');
 })


module.exports = app;





