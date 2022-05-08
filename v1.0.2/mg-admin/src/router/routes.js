import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: {name: 'index'},
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: '/index',
        name: 'index',
        meta: {
          auth: true,
          title: '首页',
        },
        component: _import('system/index')
      },
      {
        path: '/dir-article-info',
        name: 'dir-article-info',
        meta: {
          title: '博文管理',
          auth: true,
          perms: [
            'POST /api/private/article/create',
            'POST /api/private/article/list',
            'POST /api/private/article/delete',
            'POST /api/private/article/update',
          ],
        },
        component: _import('client/dir-article-info')
      },
      {
        path: '/dir-sort-info',
        name: 'dir-sort-info',
        meta: {
          title: '分类管理',
          auth: true,
          perms: [
            'POST /api/private/sort/create',
            'POST /api/private/sort/list',
            'POST /api/private/sort/delete',
            'POST /api/private/sort/update',
          ],
        },
        component: _import('client/dir-sort-info')
      },
      {
        path: '/dir-tags-info',
        name: 'dir-tags-info',
        meta: {
          title: '标签管理',
          auth: true,
          perms: [
            'POST /api/private/tags/create',
            'POST /api/private/tags/list',
            'POST /api/private/tags/delete',
            'POST /api/private/tags/update',
          ],
        },
        component: _import('client/dir-tags-info')
      },
      {
        path: '/dir-website-info',
        name: 'dir-website-info',
        meta: {
          title: '站点管理',
          auth: true,
          perms: [
            'POST /api/private/website/create',
            'POST /api/private/website/list',
            'POST /api/private/website/delete',
            'POST /api/private/website/update',
          ],
        },
        component: _import('client/dir-website-info')
      },
      {
        path: '/dir-friends-info',
        name: 'dir-friends-info',
        meta: {
          title: '友链管理',
          auth: true,
          perms: [
            'POST /api/private/friends/create',
            'POST /api/private/friends/list',
            'POST /api/private/friends/delete',
            'POST /api/private/friends/update',
          ],
        },
        component: _import('client/dir-friends-info')
      },
      {
        path: '/dir-musics-info',
        name: 'dir-musics-info',
        meta: {
          title: '音乐管理',
          auth: true,
          perms: [
            'POST /api/private/musics/create',
            'POST /api/private/musics/list',
            'POST /api/private/musics/delete',
            'POST /api/private/musics/update',
          ],
        },
        component: _import('client/dir-musics-info')
      },
      {
        path: '/dir-about-info',
        name: 'dir-about-info',
        meta: {
          title: '博主管理',
          auth: true,
          perms: [
            'POST /api/private/about/create',
            'POST /api/private/about/list',
            'POST /api/private/about/delete',
            'POST /api/private/about/update',
          ],
        },
        component: _import('client/dir-about-info')
      },
      {
        path: '/dir-message-info',
        name: 'dir-message-info',
        meta: {
          title: '留言管理',
          auth: true,
          perms: [
            'POST /api/private/message/create',
            'POST /api/private/message/list',
            'POST /api/private/message/delete',
            'POST /api/private/message/update',
            'POST /api/private/message/replyMsg',
          ],
        },
        component: _import('client/dir-message-info')
      },
      {
        path: '/dir-comments-info',
        name: 'dir-comments-info',
        meta: {
          title: '评论管理',
          auth: true,
          perms: [
            'POST /api/private/comments/create',
            'POST /api/private/comments/list',
            'POST /api/private/comments/delete',
            'POST /api/private/comments/update',
          ],
        },
        component: _import('client/dir-comments-info')
      },
      {
        path: '/dir-socials-info',
        name: 'dir-socials-info',
        meta: {
          title: '社交管理',
          auth: true,
          perms: [
            'POST /api/private/socials/create',
            'POST /api/private/socials/list',
            'POST /api/private/socials/delete',
            'POST /api/private/socials/update',
          ],
        },
        component: _import('client/dir-socials-info')
      },
      {
        path: '/code/dir-code-info',
        name: 'dir-code-info',
        meta: {
          title: '代码生成',
          auth: true
        },
        component: _import('system/code/dir-code-info')
      },
      {
        path: '/roles/dir-roles-info',
        name: 'dir-roles-info',
        meta: {
          title: '角色管理',
          auth: true,
          perms: [
            'POST /api/private/roles/create',
            'POST /api/private/roles/list',
            'POST /api/private/roles/delete',
            'POST /api/private/roles/update',
          ],
        },
        component: _import('system/roles/dir-roles-info')
      },
      {
        path: '/users/dir-users-info',
        name: 'dir-users-info',
        meta: {
          title: '用户管理',
          auth: true,
          perms: [
            'POST /api/private/users/create',
            'POST /api/private/users/list',
            'POST /api/private/users/delete',
            'POST /api/private/users/update',
          ],
        },
        component: _import('system/users/dir-users-info')
      },
      {
        path: '/menus/dir-menus-info',
        name: 'dir-menus-info',
        meta: {
          title: '菜单管理',
          auth: true,
          perms: [
            'POST /api/private/menus/create',
            'POST /api/private/menus/list',
            'POST /api/private/menus/delete',
            'POST /api/private/menus/update',
          ],
        },
        component: _import('system/menus/dir-menus-info')
      },


      {
        path: 'icon/list', name: 'icon-list',
        component: _import('system/icon/list.vue'),
        meta: {
          title: '图标列表',
          auth: true
        }
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        meta: {
          title: '刷新',
        },
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        meta: {
          title: '重定向',
        },
        component: _import('system/function/redirect')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
    },
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    meta: {
      title: '404',
    },
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
