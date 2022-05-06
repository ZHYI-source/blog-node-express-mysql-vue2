//模型创建 https://www.sequelize.com.cn/core-concepts/model-basics#%E5%AD%97%E7%AC%A6%E4%B8%B2

//音乐
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("music",
        {
            id: {
                type: Sequelize.UUID,
                notNull: true,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
            },
            name: {
                type: Sequelize.STRING,
                notNull: true,
                notEmpty: true,
                comment: '音乐名称',
            },
            author: {
                type: Sequelize.STRING,
                comment: '作者',
            },
            url: {
                type: Sequelize.TEXT("long"),
                comment: '地址',
            },
            cover: {
                type: Sequelize.TEXT("long"),
                comment: '封面',
            },
            lrc: {
                type: Sequelize.TEXT("long"),
                comment: '歌词',
            },
        }, {
            tableName: 'mg_musics'
        });
};
