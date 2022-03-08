import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  // {
  //   path: '/max',
  //   component: () => import('@/views/max/index'),
  //   hidden: true
  // },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },

]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: 'index',
    meta: { title: '首页', icon: 'dashboard'},
    children: [
      {
        path: "index",
        name: "index",
        component: () =>
          import("@/views/dashboard/index.vue"),
        meta: {
          title: '首页',
          perms: [
            // 'POST /admin/operate/worker/list',
            // 'POST /admin/operate/worker/import',
            // 'POST /admin/operate/worker/create',
          ]
        },
      },


    ]
  },

  {
    path: '/article',
    component: Layout,
    redirect: 'dir-article-info',
    meta: { title: '博客管理', icon: 'icon'},
    children: [
      {
        path: "dir-article-info",
        name: "article-info",
        component: () =>
          import("@/views/blog/dir-article-info"),
        meta: {
          title: '文章信息',
          perms: [
            'POST /admin/operate/worker/list',
            'POST /admin/operate/worker/import',
            'POST /admin/operate/worker/create',
          ]
        },
      },
      {
        path: "dir-article-class",
        name: "article-class",
        component: () =>
          import("@/views/blog/dir-article-class"),
        meta: {
          title: '文章分类',
          perms: [
            // 'POST /admin/operate/worker/list',
            // 'POST /admin/operate/worker/import',
            // 'POST /admin/operate/worker/create',
          ]
        },
      },
      {
        path: "dir-article-comments",
        name: "article-comments",
        component: () =>
          import("@/views/blog/dir-article-comments"),
        meta: {
          title: '文章评论',
          perms: [
            // 'POST /admin/operate/worker/list',
            // 'POST /admin/operate/worker/import',
            // 'POST /admin/operate/worker/create',
          ]
        },
      },

    ]
  },
  {
    path: '/web',
    component: Layout,
    redirect: 'dir-web-about',
    meta: { title: '站点管理', icon: 'international'},
    children: [
      {
        path: "dir-web-about",
        name: "web-about",
        component: () =>
          import("@/views/blog/dir-web-about"),
        meta: {
          title: '关于信息',
          perms: [
            // 'POST /admin/operate/worker/list',
            // 'POST /admin/operate/worker/import',
            // 'POST /admin/operate/worker/create',
          ]
        },
      },{
        path: "dir-web-site",
        name: "web-site",
        component: () =>
          import("@/views/blog/dir-web-site"),
        meta: {
          title: '站点信息',
          perms: [
            // 'POST /admin/operate/worker/list',
            // 'POST /admin/operate/worker/import',
            // 'POST /admin/operate/worker/create',
          ]
        },
      },{
        path: "dir-web-music",
        name: "web-music",
        component: () =>
          import("@/views/blog/dir-web-music"),
        meta: {
          title: '站点音乐',
          perms: [
            // 'POST /admin/operate/worker/list',
            // 'POST /admin/operate/worker/import',
            // 'POST /admin/operate/worker/create',
          ]
        },
      },
    ]
  },


  {
    path: '/sys',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'sysManage',
    meta: {
      title: '系统管理',
      icon: 'people'
    },
    children: [
      {
        path: 'admin',
        component: () => import('@/views/system/dir-user-info'),
        name: 'admin',
        meta: {
          perms: ['GET /admin/user/list', 'POST /admin/user/create', 'POST /admin/user/update', 'POST /admin/user/delete'],
          title: '用户中心',
          noCache: true
        }
      },
      {
        path: 'role',
        component: () => import('@/views/system/dir-role-info'),
        name: 'role',
        meta: {
          perms: [
            'GET /admin/role/list',
            'POST /admin/role/create',
            'POST /admin/role/update',
            'POST /admin/role/delete'],
          title: '角色中心',
          noCache: true
        }
      },
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
