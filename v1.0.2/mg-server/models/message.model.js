//模型创建 https://www.sequelize.com.cn/core-concepts/model-basics#%E5%AD%97%E7%AC%A6%E4%B8%B2

//留言
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("message",
        {
            id: {
                type: Sequelize.UUID,
                notNull: true,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
            },
            email: {
                type: Sequelize.STRING,
                comment: '留言邮箱',
            },
            status: {
                type: Sequelize.BOOLEAN,
                comment: '回复状态',
                defaultValue: false
            },
            content: {
                type: Sequelize.TEXT("long"),
                comment: '留言内容',
            },
        }, {
            tableName: 'mg_message'
        });
};
