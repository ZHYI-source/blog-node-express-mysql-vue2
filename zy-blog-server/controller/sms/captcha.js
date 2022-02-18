
let svgCaptcha = require('svg-captcha');
//查询字典列表业务处理
exports.queryCaptcha = async (req, res, next) => {
    try {
        //验证码配置api
        let options = {
            noise: Math.floor(Math.random()*5),
            color: true,
            fontSize:86,
            width:120,
            height:50,
        }
        let captcha=svgCaptcha.createMathExpr(options)
        res.json({
            image:captcha.data,
            key: '1491618026777497602',
            text:captcha.text
        }) //以json的方式返回客户端
    } catch (err) {
        next(err)
    }
}

