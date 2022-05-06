//模型创建 https://www.sequelize.com.cn/core-concepts/model-basics#%E5%AD%97%E7%AC%A6%E4%B8%B2
const db = require('./index')
const tag = db.tags
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("mg_article", {
        id: {
            type: Sequelize.UUID,
            notNull: true,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
        },
        sort_id: {
            type: Sequelize.STRING,
            notNull: true,
            notEmpty: true,
            comment: '分类ID',
        },
        article_title: {
            type: Sequelize.STRING,
            notNull: true,
            notEmpty: true,
            comment: '文章标题',
        },
        article_summary: {
            type: Sequelize.STRING,
            notNull: true,
            notEmpty: true,
            comment: '文章摘要',
        },
        article_content: {
            type: Sequelize.TEXT("long"),
            notEmpty: true,
            comment: '文章内容',
        },
        article_cover: {
            type: Sequelize.STRING,
            comment: '文章封面',
            defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa3rMMTNtwMeiHwh3ZBJ-dHyg84iWK04GGyA&usqp=CAU'
        },
        isPublish: {
            type: Sequelize.BOOLEAN,
            comment: '是否发布',
            defaultValue: true
        },
        viewsCount: {
            type: Sequelize.INTEGER,
            notEmpty: true,
            defaultValue: 0,
            comment: '文章浏览量',
        },
        commentsCount: {
            type: Sequelize.INTEGER,
            notEmpty: true,
            defaultValue: 0,
            comment: '文章评论数',
        },
        isTop: {
            type: Sequelize.BOOLEAN,
            notEmpty: true,
            defaultValue: false,
            comment: '是否顶置',
        },
        isHot: {
            type: Sequelize.BOOLEAN,
            notEmpty: true,
            defaultValue: false,
            comment: '是否火热',
        },
        isRecommend: {
            type: Sequelize.BOOLEAN,
            notEmpty: true,
            defaultValue: false,
            comment: '是否推荐',
        },
        reprint: {
            type: Sequelize.STRING,
            comment: '转载地址',
        },
        editType: {
            type: Sequelize.STRING,
            comment: 'md',
        },
    });
};
