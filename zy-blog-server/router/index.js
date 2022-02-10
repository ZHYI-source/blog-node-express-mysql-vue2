//路由  接口地址就在这里写
const  express = require ('express')

const router = express.Router()
//菜单相关路由
router.use(require('./blog/article'))
router.use(require('./system/sms'))


module.exports = router

