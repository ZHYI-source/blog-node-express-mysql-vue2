/** 字典* */
let express = require('express') // express框架
let router = express.Router() // express路由
const dictCtrl = require ('../../controller/dict/dict')
// 查询文章列表接口，
router.get('/system/dir_dict_type', dictCtrl.queryDictType)


module.exports = router
