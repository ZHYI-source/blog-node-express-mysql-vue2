/**
 *@author ZY
 *@date 2021/11/19
 *@Description:
 */


const path = require('path')
const Busboy = require('busboy')
const fs = require('fs')
const conn = require('../../common') // 引入公共连接池
const tools = require('../../utils/tools') // 引入工具模块


/**
 * 获取上传文件的后缀名
 * @param  {string} fileName 获取上传文件的后缀名
 * @return {string}          文件后缀名
 */
function getSuffixName(fileName) {
    let nameList = fileName.split('.')
    return nameList[nameList.length - 1]
}

// const host = process.env.VUE_HOST
//文件上传
exports.upload = async (req, res, next) => {
    const busboy = Busboy({headers: req.headers});
    // 解析请求文件事件
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        let fileNames = ''
        let _uploadFilePath = '' //存放的完整路径
        let _savePath = '' //存放数据库的完整路径
        //判断文件类型
        fileNames = Date.now() + Math.random().toString(16).substr(2) + '.' + getSuffixName(filename.filename)
        _uploadFilePath = path.join('public', '/img', fileNames)
        _savePath = fileNames //存储

        let saveTo = path.join(_uploadFilePath)
        // 文件保存到制定路径
        file.pipe(fs.createWriteStream(saveTo));

        // 文件写入事件结束
        file.on('end', function () {
            let datas = {
                message: '文件上传成功',
                url: 'http://localhost:5220/zy-server/public/images?id='+ fileNames
            }
            res.json(datas)
        })
    });
    busboy.on('finish', function (data) {
        console.log('文件上传成功！', data)
    });
    // 解析错误事件
    busboy.on('error', function (err) {
        console.log('文件上出错')
        reject(result)
    })
    return req.pipe(busboy);
};

/*
*  "css": "text/css",
 "gif": "image/gif",
 "html": "text/html",
 "ico": "image/x-icon",
 "jpeg": "image/jpeg",
 "jpg": "image/jpeg",
 "js": "text/javascript",
 "json": "application/json",
 "pdf": "application/pdf",
 "png": "image/png",
 "svg": "image/svg+xml",
 "swf": "application/x-shockwave-flash",
 "tiff": "image/tiff",
 "txt": "text/plain",
 "wav": "audio/x-wav",
 "wma": "audio/x-ms-wma",
 "wmv": "video/x-ms-wmv",
 "xml": "text/xml"*/
//查看图片
exports.getImg = async (req, res, next) => {
    let id = req.query.id
    const filePath = path.resolve(__dirname, `../../public/img/${id}`);
    //设置请求的返回头type,content的type类型列表见上面
    res.setHeader("Content-Type", 'image/jpeg');
//格式必须为 binary 否则会出错
    var content = fs.readFileSync(filePath,"binary");
    res.writeHead(200, "Ok");
    res.write(content,"binary"); //格式必须为 binary，否则会出错
    res.end();
};
