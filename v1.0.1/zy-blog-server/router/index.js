//路由  接口地址就在这里写
const  express = require ('express')

const router = express.Router()
//文件上传
router.use(require('./upload/upload'))

/**
 *@author ZY
 *@date 2022/2/12 15:57
 *@Description:web端
 */
router.use(require('./web/web-blog'))

/**
 *@author ZY
 *@date 2022/2/12 15:57
 *@Description:管理端
 */
router.use(require('./system/sms'))
router.use(require('./system/blog'))


module.exports = router

