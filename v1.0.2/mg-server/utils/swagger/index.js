/**
 *@author ZY
 *@date 2022/4/9 21:00
 *@Description: 配置swagger
 */

const options = {
    swaggerDefinition: {
        info: {
            title: 'mg-api',
            version: '1.0.0',
            description: `芒果快熟’接口api`
        },
        host: `${process.env.SWEG_URL}:${process.env.DEV_PORT}`,
        basePath: '/',
        produces: ['application/json', 'application/xml'],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: ''
            }
        }
    },
    route: {
        url: '/swagger',//打开swagger文档页面地址
        docs: '/swagger.json' //swagger文件 api
    },
    basedir: __dirname, //app absolute path

    files: [  //在那个文件夹下面收集注释
        '../../routes/api/**/*.js',
    ]
}

module.exports = options
