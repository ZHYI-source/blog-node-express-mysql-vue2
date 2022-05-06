//模型创建 https://www.sequelize.com.cn/core-concepts/model-basics#%E5%AD%97%E7%AC%A6%E4%B8%B2

//分类
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("cate",
        {
            id: {
                type: Sequelize.UUID,
                notNull: true,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
            },
            sort_name: {
                type: Sequelize.STRING,
                notNull: true,
                notEmpty: true,
                comment: '分类名称',
            },
            sort_desc: {
                type: Sequelize.STRING,
                comment: '分类描述',
            },
            sort_path: {
                type: Sequelize.STRING,
                comment: '分类页面路径',
            },
        }, {
            tableName: 'mg_sorts'
        });
};
