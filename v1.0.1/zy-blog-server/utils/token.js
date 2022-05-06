
//生成token
//用于生成和解析token
var jwt = require('jsonwebtoken');
var signkey = 'gLR+JUuKR/R5KrA1gr4ukg==';//密钥AE对称加过密

//设置token
exports.setToken = function (username, password) {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({
            username,
            password
        }, signkey, { expiresIn: '24h' });
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
