var express = require('express');
var router = express.Router();
const user = require('../module/user');

/* GET users listing. */
router.post('/', function (req, res, next) {
    // 添加用户
    let _user = req.query;
    let username = _user.username;
    let email = _user.email;

    // 插入数据
    user.addUser(username, email).then(function () {
        // 查询新添加的用户
        return user.findByName({username: username});
    }).then(function (data) {
        res.json({
            data: {
                data
            }
        });
        res.end();
    });
});

module.exports = router;
