const express = require('express');
const router = express.Router();
const article = require('../module/article');

router.get('/', function (req, res, next) {
    res.send('Please start to query your api！');
});

// post请求增加文章接口
router.post('/article', function (req, res, next) {
    let _article = req.query;
    let title = _article.title;
    let author = _article.author;
    let content = _article.content;

    let sql = `insert into article (title, author, content, date) values ("${title}", "${author}", "${content}", now())`;

    console.log(sql);
    article(sql, 'post').then(function (data) {
        console.log(data);
        res.json(data);
        res.end();
    }).catch(function (err) {
    })
});

// get请求查询文章接口
router.get('/article', function (req, res, next) {
    let _article = req.query;
    let id = _article.id;
    let title = _article.title;
    let author = _article.author;
    let sql = '';

    if (id && author && title) {
        sql = `SELECT * FROM article WHERE id like ${id} AND author like "${author}" AND title like "${title}";`;
    } else if (id) {
        sql = `SELECT * FROM article WHERE id like ${id};`;
    } else if (author) {
        sql = `SELECT * FROM article WHERE author like "${author}";`;
    } else if (title) {
        sql = `SELECT * FROM article WHERE author like "${title}";`;
    } else {
        sql = `SELECT * FROM article`;
    }

    console.log(sql);

    article(sql, 'get').then(function (data) {
        res.json(data);
        res.end();
    }).catch(function (err) {
    })
});

// delete请求删除文章接口
router.delete('/article', function (req, res, next) {
    let _article = req.query;
    let id = _article.id;
    let sql = `delete from article where id = ${id}`;

    console.log(sql);

    article(sql, "delete").then(function (data) {
        res.json(data);
        res.end();
    }).catch(function (err) {
    })
});

// delete请求删除文章接口
router.put('/article', function (req, res, next) {
    let _article = req.query;
    let id = _article.id;
    let title = _article.title;
    let author = _article.author;
    let content = _article.author;
    let sql = '';

    if (title && author && content) {
        sql = `update article set title = "${title}", author = "${author}", content = "${content}" where id =  ${id}`;
    } else if (author) {
        sql = `update article set title = "${author}" where id =  ${id}`;
    } else if (title) {
        sql = `update article set title = "${title}" where id =  ${id}`;
    } else if (content) {
        sql = `update article set title = "${content}" where id =  ${id}`;
    }

    console.log(sql);

    article(sql, "put").then(function (data) {
        res.json(data);
        res.end();
    }).catch(function (err) {
    })
});

module.exports = router;
