//模型创建 https://www.sequelize.com.cn/core-concepts/model-basics#%E5%AD%97%E7%AC%A6%E4%B8%B2

//留言
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("menus",
        {
            pid: {
                type: Sequelize.INTEGER,
                comment: '父级ID',
            },
            path: {
                type: Sequelize.STRING,
                comment: '菜单路径',
            },
            title: {
                type: Sequelize.STRING,
                comment: '菜单标题',
            },
            icon: {
                type: Sequelize.STRING,
                comment: '菜单图标',
            },
            lever: {
                type: Sequelize.INTEGER,
                comment: '菜单层级',
            },
            authority: {
                type: Sequelize.STRING,
                comment: '操作标识',
            },
        }, {
            tableName: 'mg_menus'
        });
};
