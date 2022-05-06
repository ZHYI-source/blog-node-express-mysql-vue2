//模型创建 https://www.sequelize.com.cn/core-concepts/model-basics#%E5%AD%97%E7%AC%A6%E4%B8%B2

//关于博主信息
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("about",
        {
            id: {
                type: Sequelize.UUID,
                notNull: true,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
            },
            about_content: {
                type: Sequelize.TEXT("long"),
                notEmpty: true,
                notNull: true,
                comment: '关于博主内容',
            },

        }, {
            tableName: 'mg_about'
        });
};
