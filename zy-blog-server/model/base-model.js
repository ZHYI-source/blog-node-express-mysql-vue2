let tools = require('../utils/tools') // 引入工具模块
//公共字段
module.exports = {
    createdTime:tools.getDate(),
    modifyTime:tools.getDate()||null
}
