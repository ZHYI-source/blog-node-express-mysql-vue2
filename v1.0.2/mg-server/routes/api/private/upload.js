let express = require('express');
let router = express.Router();
let path = require("path");

let fs = require('fs');

const multer = require('multer');
// 临时上传目录
let upload = multer({dest: 'uploads_files'});

let baseURL = require('../../../config/upload.config').baseURL;

/**
 * 提供文件上传服务
 * @route POST /api/private/upload
 * @group 文件上传 - 上传图片接口
 * @param {file} file.query.required - 图片
 * @returns {object} 200 - 返回结果对象：文件地址 url，暂存地址 tmp_path
 * @returns {object} 500 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/", upload.single('file'), function (req, res, next) {
    let fileExtArray = req.file.originalname.split(".");
    let ext = fileExtArray[fileExtArray.length - 1];
    let targetPath = req.file.destination + '/' + req.file.filename + "." + ext;
    let imgName = req.file.filename + "." + ext;
    let mimetype = req.file.mimetype;
    let mineTypeMap = ['text/html', 'text/xml', 'text/plain',]
    let resUrl = baseURL + '/api/public/admin/getFiles' + '?id=' + imgName + '&&mimetype=' + mimetype
    let resUrlFile = baseURL + '/api/public/admin/getFiles' + '?id=' + imgName + '&&mimetype=' + mimetype + '&&charset=utf-8'
    // console.log(req.file)
    fs.rename(path.join(process.cwd(), "/" + req.file.path), path.join(process.cwd(), targetPath), function (err) {
        if (err) {
            return res.sendResult({data: null, code: 500, message: '上传文件失败'})
        }
        return res.sendResult({
            data: {
                "tmp_path": targetPath,
                "url": mineTypeMap.includes(mimetype) ? resUrlFile : resUrl
            }, code: 200, message: '上传成功'
        })
    })
});

module.exports = router;
