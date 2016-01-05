var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function (req, res) {
    res.render('ashin/home', {
        'webTitle':'阿xin的空间'
    });
});

/* GET users listing. */

/*
router.get('/btn', function (req, res) {
    res.render('btn', {
        webTitle: '按钮'
    });
});

router.get('/input', function (req, res) {
    var input_html = fs.readFileSync('./source/code/input_html.html', 'utf-8');

    res.render('input', {
        webTitle: '输入框',
        htmlCode:input_html
    });
});
*/

module.exports = router;
