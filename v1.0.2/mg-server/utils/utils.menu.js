
exports.menus = function (){
    return [
        {path: '/index', title: '首页', icon: 'home'},
        {
            title: '客户端管理',
            icon: 'th-large',
            path: '/dir-article-info',
            children: [
                {path: '/dir-article-info', icon: 'th-large', title: '博文管理',},
                {path: '/dir-sort-info', icon: 'th-large', title: '分类管理'},
                {path: '/dir-tags-info', icon: 'th-large', title: '标签管理'},
                {path: '/dir-friends-info', icon: 'th-large', title: '友链管理'},
                {path: '/dir-website-info', icon: 'th-large', title: '站点管理'},
                {path: '/dir-about-info', icon: 'th-large', title: '博主管理'},
                {path: '/dir-message-info', icon: 'th-large', title: '留言管理'},
                {path: '/dir-comments-info', icon: 'th-large', title: '评论管理'},
                {path: '/dir-socials-info', icon: 'th-large', title: '社交管理'},
            ]
        },
        {
            title: '系统管理',
            icon: 'th-large',
            path: '/code/dir-code-info',
            children: [
                {path: '/code/dir-code-info', icon: 'th-large', title: '代码生成'},
            ]
        },
        {
            icon: 'asterisk',
            title: '图标列表',
            path: '/icon/list',

        }
    ]
};