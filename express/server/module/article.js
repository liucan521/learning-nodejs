/**
 * 数据库
 * @param sql msyql语句
 */
function article(sql, methods) {
    return new Promise(function (resolve, reject) {

        const mysql = require('mysql');
        const connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'password',
            database: 'blog',
        });

        connection.connect();
        connection.query(sql, function (err, results, fields) {
            if (err) {
                reject({
                    code: '403',
                    data: {
                        err: err.message
                    }
                });
            } else {
                switch (methods) {
                    case 'post':
                        resolve({
                            code: '200',
                            data: {
                                message: '添加成功！'
                            }
                        });
                        break;
                    case 'get':
                        resolve({
                            code: '200',
                            data: {
                                data: results
                            }
                        });
                        break;
                    case 'delete':
                        resolve({
                            code: '200',
                            data: {
                                message: '删除成功！'
                            }
                        });
                        break;
                    case 'put':
                        resolve({
                            code: '200',
                            data: {
                                message: '更新成功！'
                            }
                        });
                        break;
                    default:
                        resolve({
                            code: '401',
                            data: {
                                data: '方法不存在'
                            }
                        })
                }
            }
        });
        connection.end();
    })
}

module.exports = article;