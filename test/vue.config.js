
// 所有配置项说明请参见https://cli.vuejs.org/config/
module.exports = {
    lintOnSave: false, //关闭eslint检验
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    // lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://114.117.164.181:5110/',
                target: 'http://localhost:5220',//本地服务器
                ws: true,
                secure: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                // additionalData: '@use "@/assets/style/public.scss" as *;'
            },
        }
    },
    configureWebpack: {
        // //在webpack的name字段中提供应用程序的标题，这样
        // //它可以在index.html中访问，以注入正确的标题。
        // name: name,
        // resolve: {
        //   alias: {
        //     '@': resolve('src')
        //   }
        // }
    },

}
