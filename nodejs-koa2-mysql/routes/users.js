const router = require('koa-router')()
const user = require('../module/users');


router.prefix('/users')

router.post('/', async (ctx, next) => {
    let _user = ctx.query;
    let username = _user.username;
    let email = _user.email;
    // 插入数据
    await user.addUser(username, email).then(function (ret) {
        // 查询新添加的用户
        return user.findByName({id: ret.id});
    }).then(function (data) {
        ctx.body = {
            data: data
        }
    });
})

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
})

module.exports = router
