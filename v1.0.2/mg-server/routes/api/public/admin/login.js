let express = require('express');
let router = express.Router();
const logger = require("../../../../utils/utils.logger").logger();
const Login = require("../../../../controllers/login.controller");
/**
 * 登录
 * @route POST /api/public/v1/login
 * @group 登录 - login
 * @param {string} username - 请输入用户名
 * @param {string} password - 请输入密码
 * @returns {object} 200 - token
 * @returns {object} 500 - 登录失败错误
 * @returns {Error}  default - Unexpected error
 */
router.post("/", function (req,res){
    const pm = req.body;
    // 请求验证+
    if (!pm.username)  return res.sendResult({data: '', code: 500, message: "用户名不能为空！"})

    if (!pm.password)  return res.sendResult({data: '', code: 500, message: "密码不能为空！"})

    Login.login(pm,(data,err)=>{
        if (err) return res.sendResultAto(null,401,err)
        res.sendResultAto(data,200,'登录成功')
    })

});

module.exports = router;
