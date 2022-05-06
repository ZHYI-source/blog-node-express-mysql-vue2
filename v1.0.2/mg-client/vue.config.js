module.exports = {
    productionSourceMap: false,
    lintOnSave: false, //关闭lint校验
    devServer: {
        proxy: {
            '/mg': {
                target: 'http://localhost:5222', //本地服务器
                ws: true,
                secure: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/mg': ''
                }
            }
        }
    },
}
