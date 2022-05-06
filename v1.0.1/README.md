# zy-all-blog

#### 介绍
借鉴[Gblog](https://gitee.com/fengziy/Gblog)，[vue-element-admin](https://gitee.com/fengziy/Gblog)做了一些自己的改动，整合成博客全栈系统，`vue2 + node.js + express + mysql` 包含前端博客展示、后台管理、node后端代码全自撸。整套博客系统开箱即用,对`elemen-ui`二次封装组件非常便利，管理端权限模块还未完成，已完成用户登录，验证码，token验证，文章编辑，修改，查看，发布，评论，分类查询，站点配置，音乐配置等等，如果对你有用请star,star,star

#### 项目目录：

- [zy-blog-web](https://gitee.com/Z568_568/all-blog-sys/tree/master/zy-blog-web) 是博客web展示界面
- [zy-blog-admin](https://gitee.com/Z568_568/all-blog-sys/tree/master/zy-blog-admin) 是博客后台管理界面
- [zy-blog-server](https://gitee.com/Z568_568/all-blog-sys/tree/master/zy-blog-server) 是博客前后台服务端（`express` + `mysql`）admin 123456

#### 安装教程

- 项目于以 `yarn / npm`  安装依赖， 若安装 `node-sass` 不行 就下载`yarn` 安装即可
- `yarn install / npm  install`
- 启动项目 ： web:`npm run server`  admin:`npm run dev`
- 数据库文件地址sql:  [all-blog-sys/zy-blog-server/sql/zy-blog.sql](https://gitee.com/Z568_568/all-blog-sys/blob/master/zy-blog-server/sql/zy-blog.sql)
- 打开`navicat`建立数据库 `zy-blog`,运行sql文件 
- 服务端server内的`db.js`文件填写数据库信息，监听 5220端口，启动服务：`nodemon index.js（热加载） / node index.js`

### DEMO 
1.  [前端web端 ZY-Blog](http://zhouyi.run/#/)

2.  [博客管理端 ZY-admin](http://zhouyi.run:5221/#/login?redirect=%2F)

> 前端项目`web`端截图

![输入图片说明](DOC/img/%E9%A6%96%E9%A1%B5%20-%20ZYblog%20-%20Google%20Chrome%202022_2_20%2017_20_55.png)

![输入图片说明](DOC/img/%E9%A6%96%E9%A1%B5%20-%20ZYblog%20-%20Google%20Chrome%202022_2_20%2017_21_55.png)

![输入图片说明](DOC/img/%E9%A6%96%E9%A1%B5%20-%20ZYblog%20-%20Google%20Chrome%202022_2_20%2017_23_46.png)


> 前端项目管理`admin`端截图

![输入图片说明](DOC/img/ZY%20-%20%E7%94%A8%E6%88%B7%E9%85%8D%E7%BD%AE%201%20-%20Microsoft%E2%80%8B%20Edge%202022_2_20%2017_24_59.png)

![输入图片说明](DOC/img/ZY%20-%20%E7%94%A8%E6%88%B7%E9%85%8D%E7%BD%AE%201%20-%20Microsoft%E2%80%8B%20Edge%202022_2_20%2017_25_54.png)

