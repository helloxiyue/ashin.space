var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */

router.get('/css.html', function (req, res) {
    res.sendfile('./public/static/gui/css.html');
});

router.get('/components.html', function (req, res) {
    res.sendfile('./public/static/gui/components.html');
});

router.get('/plugin.html', function (req, res) {
    res.sendfile('./public/static/gui/plugin.html');
});

module.exports = router;
