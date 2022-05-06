//模型创建 https://www.sequelize.com.cn/core-concepts/model-basics#%E5%AD%97%E7%AC%A6%E4%B8%B2

//社交信息
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("socials",
        {
            id: {
                type: Sequelize.UUID,
                notNull: true,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
            },
            title: {
                type: Sequelize.STRING,
                comment: '社交图标提示title',
            },
            icon: {
                type: Sequelize.STRING,
                notNull: true,
                notEmpty: true,
                comment: '社交个体的图标iconfont',
            },
            color: {
                type: Sequelize.STRING,
                comment: '图标颜色',
            },
            href: {
                type: Sequelize.STRING,
                comment: '社交链接',
            },
            text: {
                type: Sequelize.STRING,
                comment: '社交文字说明',
            },
            img: {
                type: Sequelize.STRING,
                comment: '社交图片',
            },
        }, {
            tableName: 'mg_socials'
        });
};
