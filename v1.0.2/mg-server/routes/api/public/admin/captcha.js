let express = require('express');
let router = express.Router();
let svgCaptcha = require('svg-captcha');
let {aes} = require('../../../../utils/utils.crypto');
/**
 * 获取验证码
 * @route GET /api/public/v1/captcha
 * @group 登录 - login
 * @returns {object} 200 - svg格式验证码
 * @returns {object} 500 - 获取验证码错误
 * @returns {Error}  default - Unexpected error
 */
router.get("/",
    async (req, res, next) => {
        try {
            //验证码配置api
            let options = {
                //线条数
                noise: Math.floor(Math.random() * 5),
                color: true,
                fontSize: 55,
                width: 90,
                height: 38,
            }
            let captcha = svgCaptcha.createMathExpr(options)
            let resData={
                codeSvg: captcha.data,
                codeText: aes.en(captcha.text) ,
                key: new Date().getTime()
            }
            res.sendResult({data:resData, code:200, message:"获取验证码成功"});
        } catch (err) {
            next(err)
        }
    })

module.exports = router;

