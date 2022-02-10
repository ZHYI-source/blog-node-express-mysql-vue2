const util = require('util')
module.exports = () => {
    return (err,req,res,next) =>{
        res.status(500).json({
            error:'错误提示！'+err,
            // error:util.format(err)
        })
    }
}
