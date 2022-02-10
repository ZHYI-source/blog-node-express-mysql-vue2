
//生成token
//用于生成和解析token
var jwt = require('jsonwebtoken');
var signkey = 'mes_qdhd_mobile_xhykjyxgs';

//设置token
exports.setToken = function (username, userid) {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({
            name: username
        }, signkey, { expiresIn: '1h' });
        resolve(token);
    })
}
//验证token
exports.verToken = function (token) {
    return new Promise((resolve, reject) => {
        var info = jwt.verify(token.split(' ')[1], signkey);
        resolve(info);
    })
}
