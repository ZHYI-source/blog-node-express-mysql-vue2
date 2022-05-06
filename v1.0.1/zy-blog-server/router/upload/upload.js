//上传图片
let express = require('express')
let router = express.Router()
const fileCtrl = require ('../../controller/sms/upload')


router.post('/zy-server/upload/v1', fileCtrl.upload)

router.get('/zy-server/public/images', fileCtrl.getImg)


module.exports = router
