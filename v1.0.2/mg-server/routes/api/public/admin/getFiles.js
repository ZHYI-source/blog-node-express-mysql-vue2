let express = require('express');
let fs = require('fs');
var path = require("path");
let router = express.Router();
const logger = require("../../../../utils/utils.logger").logger();
/**
 *@author ZY
 *@date 2022/3/6 17:58
 *@Description:预览图片接口
 *@params {id} string 图片名称带有后缀名
 */
router.get("/",
    async (req, res, next) => {
        try {
            // console.log(req.query)
            let id = req.query.id
            let mimetype = req.query.mimetype
            const filePath = path.resolve(process.cwd(), `uploads_files/${id}`);
            //设置请求的返回头type,content的type类型列表见上面
            res.setHeader("Content-Type", mimetype);
            //格式必须为 binary 否则会出错
            var content = fs.readFileSync(filePath, "binary");
            if (!content) {
                res.sendResult({data:'',code:400,message:"资源不存在"});
            }
            res.write(content, "binary"); //格式必须为 binary，否则会出错
            res.end();
        } catch (err) {
            next(err)
        }
    })

/**
 *@author ZY
 *@date 2022/3/6 17:58
 *@Description:下载文件接口
 *@params {name} string 文件名称带有后缀名
 */

router.get("/download",
    async (req, res, next) => {
        try {
            let name = req.query.name
            logger.debug('/download => name:', name);
            let url = path.resolve(process.cwd(), `uploads_files/${name}`);
            res.download(url)
        } catch (err) {
            logger.error('/download => err:', err);
            next(err)
        }
    })

module.exports = router;

