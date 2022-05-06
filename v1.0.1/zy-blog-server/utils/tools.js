//各种通用工具类
let {md5} = require("./crypto");
//时间格式化
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

const tools = {
    //生成永不重复的id
    createRandomId: () => {
        return md5(
            (Math.random() * 10000000).toString(16).substr(0, 4)
            + '-' +
            (new Date()).getTime()
            + '-' +
            Math.random().toString().substr(2, 5)
        ).toString()
    },
    //获取实时时间
    getDate:()=>{
       return new Date().Format("yyyy-MM-dd hh:mm:ss")
    },



}

module.exports = tools
