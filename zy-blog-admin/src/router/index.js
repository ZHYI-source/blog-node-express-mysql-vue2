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
    path: '',
    component: Layout,
    redirect: 'dir-article-info',
    meta: { title: '博客管理', icon: 'icon'},
    children: [
      {
        path: "dir-article-info",
        name: "article",
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

    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'employee',
    meta: { title: '运营管理', icon: 'peoples'},
    children: [
      {
        path: "employee",
        name: "employee",
        component: () =>
          import("@/views/zzPages/operations/dir-employee-info.vue"),
        meta: {
          title: '用户信息',
          perms: [
            'POST /admin/operate/worker/list',
            'POST /admin/operate/worker/import',
            'POST /admin/operate/worker/create',
          ]
        },
      },
      {
        path: "client",
        name: "client",
        component: () =>
          import("@/views/zzPages/operations/dir-client-info"),
        meta: {
          title: '客户信息',
          perms: [
            'POST /admin/getRideRecord'
          ]
        },
      },
      {
        path: "contract",
        name: "contract",
        component: () =>
          import("@/views/zzPages/operations/dir-contract-info"),
        meta: {
          title: '合同管理',
          perms: [
            'POST /admin/getRideRecord'
          ]
        },
      },
    ]
  },

  {
    path: '/task',
    component: Layout,
    redirect: '/task/dir-task-info',
    alwaysShow: true,
    name: 'task',
    meta: {
      title: '任务管理',
      icon: 'example'
    },
    children: [
      {
        path: 'task',
        component: () => import('@/views/zzPages/task/dir-task-info'),
        name: 'task',
        meta: {
          perms: [
            'POST /admin/task/task/list',
            'POST /admin/task/task/change',
            'POST /admin/task/task/create',
          ],
          title: '任务信息',
          noCache: true
        }
      },
      {
        path: 'order',
        component: () => import('@/views/zzPages/task/dir-order-info'),
        name: 'task',
        meta: {
          perms: [
            'POST /admin/task/order/list',
            // 'POST /admin/task/task/change',
            'POST /admin/task/order/create',
          ],
          title: '用工信息',
          noCache: true
        }
      },]
  },

  {
    path: '/invoice',
    component: Layout,
    redirect: '/invoice/electronic',
    alwaysShow: true,
    name: 'electronic ',
    meta: {
      title: '税源管理',
      icon: 'edit'
    },
    children: [

      {
        path: "invoiceNo",
        name: "invoiceNo",
        component: () =>
          import("@/views/zzPages/tax/dir-invoice-info"),
        meta: {
          title: '电子发票',
          perms: [
            'POST /admin/invoice/carOrderList',
            'POST /admin/invoice/carOrderExport'
          ]
        },
      },
      {
        path: "tax",
        name: "tax",
        component: () =>
          import("@/views/zzPages/tax/dir-tax-info"),
        meta: {
          title: '税号管理',
          perms: [
            'POST /admin/invoice/carOrderList',
            'POST /admin/invoice/carOrderExport'
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
        component: () => import('@/views/sys/admin'),
        name: 'admin',
        meta: {
          perms: ['GET /admin/admin/list', 'POST /admin/admin/create', 'POST /admin/admin/update', 'POST /admin/admin/delete'],
          title: '用户中心',
          noCache: true
        }
      },
      {
        path: 'role',
        component: () => import('@/views/sys/role'),
        name: 'role',
        meta: {
          perms: [
            'GET /admin/role/list',
            'POST /admin/role/create',
            'POST /admin/role/update',
            'POST /admin/role/delete',
            'GET /admin/role/getPermissions',
            'POST /admin/role/permissions'
          ],
          title: '角色管理',
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
