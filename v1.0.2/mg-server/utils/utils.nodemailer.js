const nodemailer = require("nodemailer");
/**
 * 邮箱发送
 *
 * @param  {Object}  pm 对方信息
 */

exports.sendMailer = (pm) => {
    return new Promise((resolve, reject) => {
        // 创建Nodemailer传输器 SMTP 或者 其他 运输机制
        let transporter = nodemailer.createTransport(
            {
                service: 'QQ', // 使用内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
                port: 465, // SMTP 端口
                secureConnection: true, // 使用 SSL
                auth: {
                    user: '1840354092@qq.com', // 发送方邮箱的账号
                    pass: '邮箱授权密码', // 邮箱授权密码
                }
            }
        );
        // 定义transport对象并发送邮件
        transporter.sendMail({
            from: `"MG'Blog" <1840354092@qq.com>`, // 发送方邮箱的账号
            to: pm.email, // 邮箱接受者的账号
            subject: "MG'Blog 留言回复🎈", // Subject line
            // text: '"MG'Blog 👻"', // 文本内容
            html: `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy_130iiorSSjF1RWgNBX7qy3evKv2HKsH0g&usqp=CAU">
        <p style="text-indent: 2em;">您好！ "${pm.email}" </p>
        <p style="text-indent: 2em;">您在<a href="http://www.zhouyi.run/#/">MG'Blog</a>上的留言博主已收到🎈 感谢您的支持！</p>
        <p >✨回复内容：</p>
        <p style="text-indent: 2em;">${pm.content}</p>
        <p style="text-indent: 2em;">祝您工作顺利，心想事成🎉🎉🎉</p>
        <p style="text-align: right;">—— <a href="http://www.zhouyi.run/#/">MG'Blog</a></p>`,
        }, (error, info) => {
            if (error) {
                reject(error)
            }
            resolve(info)
        });
    })
}
