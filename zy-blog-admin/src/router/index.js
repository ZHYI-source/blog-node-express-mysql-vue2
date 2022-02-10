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
      },
      // {
      //   path: 'complaintReport',
      //   component: () => import('@/views/complaintReport/index'),
      //   name: 'complaintReport',
      //   meta: {
      //     perms: [
      //       'POST /admin/complaint/report',
      //       'POST /admin/complaint/reportExport'
      //     ],
      //     title: '投诉统计',
      //     noCache: true
      //   }
      // },
      // {
      //   path: 'messageSend',
      //   component: () => import('@/views/messageSend/index'),
      //   name: 'messageSend',
      //   meta: {
      //     perms: [
      //       'POST /admin/sms/send',
      //       'POST /admin/sms/smsHistory',
      //       'POST /admin/sms/importExcel'
      //     ],
      //     title: '短信发送',
      //     noCache: true
      //   }
      // }
    ]
  },
  // {
  //   path: '/account',
  //   component: Layout,
  //   redirect: '/account/dir-task-pay',
  //   alwaysShow: true,
  //   name: 'account',
  //   meta: {
  //     title: '财务管理',
  //     icon: 'money'
  //   },
  //   children: [
  //     {
  //       path: 'task-pay',
  //       component: () => import('@/views/zzPages/account/dir-task-pay'),
  //       name: 'task-pay',
  //       meta: {
  //         perms: [
  //           'POST /admin/task/task/list',
  //           'POST /admin/task/task/change',
  //           'POST /admin/task/task/create',
  //         ],
  //         title: '任务付款',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'checking',
  //       component: () => import('@/views/zzPages/account/dir-account-checking'),
  //       name: 'checking',
  //       meta: {
  //         perms: [
  //           'POST /admin/task/task/list',
  //           'POST /admin/task/task/change',
  //           'POST /admin/task/task/create',
  //         ],
  //         title: '对账信息',
  //         noCache: true
  //       }
  //     },
  //     // {
  //     //   path: 'complaintReport',
  //     //   component: () => import('@/views/complaintReport/index'),
  //     //   name: 'complaintReport',
  //     //   meta: {
  //     //     perms: [
  //     //       'POST /admin/complaint/report',
  //     //       'POST /admin/complaint/reportExport'
  //     //     ],
  //     //     title: '投诉统计',
  //     //     noCache: true
  //     //   }
  //     // },
  //     // {
  //     //   path: 'messageSend',
  //     //   component: () => import('@/views/messageSend/index'),
  //     //   name: 'messageSend',
  //     //   meta: {
  //     //     perms: [
  //     //       'POST /admin/sms/send',
  //     //       'POST /admin/sms/smsHistory',
  //     //       'POST /admin/sms/importExcel'
  //     //     ],
  //     //     title: '短信发送',
  //     //     noCache: true
  //     //   }
  //     // }
  //   ]
  // },
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
      // {
      //   path: "electronic",
      //   name: "electronic",
      //   component: () =>
      //     import("@/views/invoice/index.vue"),
      //   meta: {
      //     title: '发票',
      //     perms: [
      //       'POST /admin/invoice/list',
      //       'POST /admin/invoice/update',
      //       'POST /admin/invoice/insert',
      //       'POST /admin/invoice/retry'
      //     ]
      //   },
      // },
      // {
      //   path: "report",
      //   name: "report",
      //   component: () =>
      //     import("@/views/invoiceReport/index.vue"),
      //   meta: {
      //     title: '发票统计',
      //     perms: [
      //       'POST /admin/invoice/report'
      //     ]
      //   },
      // },
      // {
      //   path: 'invoiceNo',
      //   name: 'invoiceNo',
      //   component: () =>
      //     import('@/views/invoiceNo/index'),
      //   meta: {
      //     title: '税号',
      //     perms: [
      //       'POST /admin/invoice/orgList',
      //       'POST /admin/invoice/cancellation',
      //       'POST /admin/invoice/updateCar',
      //       'POST /admin/invoice/updateOrg',
      //       'POST /admin/invoice/orgExport',
      //       'POST /admin/invoice/importExcel',
      //       'POST /admin/invoice/orgHistory'
      //     ],
      //     noCache: true
      //   },
      // },
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
      // {
      //   path: 'rechargeList',
      //   name: 'rechargeList',
      //   component: () =>
      //     import('@/views/rechargeList/index'),
      //   meta: {
      //     title: '充值管理',
      //     perms: [
      //       'POST /admin/invoice/balanceList',
      //       'POST /admin/invoice/recharge'
      //     ],
      //     noCache: true
      //   },
      // },
      // {
      //   path: 'rechargeRecord',
      //   name: 'rechargeRecord',
      //   component: () =>
      //     import('@/views/rechargeRecord/index'),
      //   meta: {
      //     title: '充值记录',
      //     perms: [
      //       'POST /admin/invoice/depositList',
      //       'POST /admin/invoice/depositExport'
      //     ],
      //     noCache: true
      //   },
      // },
      // {
      //   path: 'deduction',
      //   name: 'deduction',
      //   component: () =>
      //     import('@/views/deduction/index'),
      //   meta: {
      //     title: '扣费明细',
      //     perms: [
      //       'POST /admin/invoice/deduceList',
      //       'POST /admin/invoice/deduceExport'
      //     ],
      //     noCache: true
      //   },
      // },
    ]
  },

  // {
  //   path: '/activity',
  //   component: Layout,
  //   redirect: '/activity/ad',
  //   alwaysShow: true,
  //   name:'activity',
  //   meta: { title: '活动管理', icon: 'education'},
  //   children: [
  //     {
  //       path: "ad",
  //       name: "ad",
  //       component: () =>
  //         import("@/views/ad/index.vue"),
  //       meta: {
  //         title: '广告管理',
  //         perms: [
  //           'POST /admin/ad/list',
  //           'POST /admin/ad/createOrUpdate',
  //           'POST /admin/ad/list'
  //         ]
  //       },
  //     },
  //     {
  //       path: "orgNotice",
  //       name: "orgNotice",
  //       component: () =>
  //         import("@/views/orgNotice/index.vue"),
  //       meta: {
  //         title: '消息通知',
  //         perms: [
  //           'POST /message/messageHistory',
  //           'POST /message/messageSend',
  //           'POST /message/messageDelete',
  //           'POST /message/messageUpdate',
  //           'POST /message/messageList'
  //         ]
  //       },
  //     },
  //     {
  //       path: "driverNotice",
  //       name: "driverNotice",
  //       component: () =>
  //         import("@/views/driverNotice/index.vue"),
  //       meta: {
  //         title: '司机消息',
  //         perms: [
  //           'POST /message/messageHistory',
  //           'POST /message/messageSend',
  //           'POST /message/messageDelete',
  //           'POST /message/messageUpdate',
  //           'POST /message/messageList'
  //         ]
  //       },
  //     },
  //     {
  //       path: "coupon",
  //       name: "coupon",
  //       component: () =>
  //         import("@/views/coupon/index.vue"),
  //       meta: {
  //         title: '广告红包',
  //         perms: [
  //           'POST /admin/couponConsumeList',
  //           'POST /admin/couponConsumeExport'
  //         ]
  //       }
  //     },
  //     {
  //       path: "couponHd",
  //       name: "couponHd",
  //       component: () =>
  //         import("@/views/couponHd/index.vue"),
  //       meta: {
  //         title: '恒大红包',
  //         perms: [
  //           'POST /admin/couponConsumeListHd'
  //           // 'POST /admin/couponConsumeExportHd'
  //         ]
  //       }
  //     },
  //     {
  //       path: "couponYk",
  //       name: "couponYk",
  //       component: () =>
  //         import("@/views/couponYk/index.vue"),
  //       meta: {
  //         title: '眼科红包',
  //         perms: [
  //           'POST /admin/couponConsumeListYk'
  //           // 'POST /admin/couponConsumeExportYk'
  //         ]
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/driver',
  //   component: Layout,
  //   redirect: '/driver',
  //   alwaysShow: true,
  //   name: 'scores',
  //   meta: { title: '司机评分', icon: 'edit' },
  //   children: [
  //     {
  //       path: 'driverPortrait',
  //       name: 'driverPortrait',
  //       component: () => import('@/views/driverScores/dir-driver-portrait'),
  //       meta: {
  //         perms: [
  //           'POST /admin/comment/driverList',
  //           'POST /admin/comment/driverDetail',
  //         ],
  //         title: '司机画像'
  //       },
  //     },
  //     {
  //       path: 'complaintsRecord',
  //       name: 'complaintsRecord',
  //       component: () => import('@/views/driverScores/dir-complaints-record'),
  //       meta: {
  //         perms: [
  //           'POST /admin/comment/driverComplaintList',
  //           'POST /admin/comment/driverComplaintDetail',
  //         ],
  //         title: '投诉履历'
  //       },
  //     },
  //     {
  //       path: 'evaluationRecord',
  //       name: 'evaluationRecord',
  //       component: () => import('@/views/driverScores/dir-evaluation-record'),
  //       meta: {
  //         perms: [
  //           'POST /admin/comment/driverCommentList',
  //           'POST /admin/comment/driverCommentListExport',
  //           'POST /admin/comment/commentDetail',
  //         ],
  //         title: '评价记录'
  //       },
  //     },
  //     {
  //       path: 'monthlyReport',
  //       name: 'monthlyReport',
  //       component: () => import('@/views/driverScores/dir-monthly-report'),
  //       meta: {
  //         perms: [
  //           'POST /admin/comment/reportPerMonth',
  //           'POST /admin/comment/reportPerMonthDetail',
  //           'POST /admin/comment/reportPerMonthExport',
  //         ],
  //         title: '月评报表'
  //       },
  //     },
  //     {
  //       path: 'companyMonthlyReport',
  //       name: 'companyMonthlyReport',
  //       component: () => import('@/views/driverScores/dir-company-monthly-report'),
  //       meta: {
  //         perms: [
  //           'POST /admin/comment/orgReportPerMonth',
  //           'POST /admin/comment/orgReportDetail',
  //         ],
  //         title: '企业月报'
  //       },
  //     },
  //     {
  //       path: 'riskIdentify',
  //       name: 'riskIdentify',
  //       component: () => import('@/views/driverScores/dir-risk-identify'),
  //       meta: {
  //         perms: [
  //           'POST /admin/comment/driverRisk',
  //           'POST /admin/comment/riskDetail',
  //         ],
  //         title: '风险识别'
  //       },
  //     }
  //
  //
  //   ]
  // },
  // {
  //   path: '/info',
  //   component: Layout,
  //   redirect: '/info/car',
  //   alwaysShow: true,
  //   name: 'info',
  //   meta: { title: '基础信息', icon: 'list' },
  //   children: [
  //     {
  //       path: 'org',
  //       name: 'org',
  //       component: () => import('@/views/org/index'),
  //       meta: {
  //         perms: ['POST /org/insert'],
  //         title: '机构管理'
  //       }
  //     },
  //     {
  //       path: 'car',
  //       name: 'car',
  //       component: () => import('@/views/car/car'),
  //       meta: {
  //         perms: [
  //           'POST /admin/addOrUptCar',
  //           'POST /admin/carlst',
  //           'POST /admin/importExcelCars',
  //           'POST /admin/exportCarlst',
  //           'POST /admin/scrapCar'
  //         ],
  //         title: '车辆信息'
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/monitor',
  //   component: Layout,
  //   redirect: '/monitor/carPosition',
  //   alwaysShow: true,
  //   name: 'monitor',
  //   meta: { title: '车辆监控', icon: 'location' },
  //   children: [
  //     {
  //       path: 'carPosition',
  //       name: 'carPosition',
  //       component: () => import('@/views/carPosition/index'),
  //       meta: {
  //         perms: ['POST /admin/position/orderList'],
  //         title: '车辆位置'
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/report',
  //   component: Layout,
  //   redirect: '/report/carReport',
  //   alwaysShow: true,
  //   name: 'report',
  //   meta: {
  //     title: '统计报表',
  //     icon: 'chart'
  //   },
  //   children: [
  //     {
  //       path: 'carReport',
  //       component: () => import('@/views/carReport/index'),
  //       name: 'carReport',
  //       meta: {
  //         perms: ['POST /admin/carReport'],
  //         title: '统计总览',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'complaintMonth',
  //       component: () => import('@/views/complaintMonth/index'),
  //       name: 'complaintMonth',
  //       meta: {
  //         perms: [
  //           'POST /admin/complaint/month',
  //           'POST /admin/complaint/monthExport'
  //         ],
  //         title: '投诉月报',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'orderReport',
  //       component: () => import('@/views/orderReport/index'),
  //       name: 'orderReport',
  //       meta: {
  //         perms: ['POST /admin/orderReport'],
  //         title: '订单统计',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'signReport',
  //       component: () => import('@/views/signReport/index'),
  //       name: 'signReport',
  //       meta: {
  //         perms: ['POST /admin/signReport'],
  //         title: '打卡统计',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'cmbAccount',
  //       component: () => import('@/views/cmbAccount/index'),
  //       name: 'cmbAccount',
  //       meta: {
  //         perms: [
  //           'POST /admin/cmbCheck',
  //           'POST /admin/cmbCheckExport',
  //         ],
  //         title: '招行流水',
  //         noCache: true
  //       }
  //     }
  //     // {
  //     //   path: 'pasteReport',
  //     //   component: () => import('@/views/pasteReport/index'),
  //     //   name: 'pasteReport',
  //     //   meta: {
  //     //     perms: [
  //     //       'POST /admin/pasteReport',
  //     //       'POST /admin/pasteReportExport'
  //     //     ],
  //     //     title: '贴码统计',
  //     //     noCache: true
  //     //   }
  //     // }
  //   ]
  // },
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
  // {
  //   path: '/system',
  //   component: Layout,
  //   redirect: '/system/driverOrder',
  //   alwaysShow: true,
  //   name: 'system',
  //   meta: {
  //     title: '系统工具',
  //     icon: 'system'
  //   },
  //   children: [
  //     {
  //       path: 'driverOrder',
  //       component: () => import('@/views/driverOrder/index'),
  //       name: 'driverOrder',
  //       meta: {
  //         perms: [
  //           'POST /admin/system/bill',
  //           'POST /admin/system/billExport'
  //         ],
  //         title: '司机账单',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'cashFail',
  //       component: () => import('@/views/cashFail/index'),
  //       name: 'cashFail',
  //       meta: {
  //         perms: [
  //           'POST /admin/system/cashFailList',
  //           'POST /admin/system/cashFailExport',
  //           'POST /admin/system/cashFailDeal',
  //           'POST /admin/system/cashFailUpdateLog',
  //           'POST /admin/system/cashFailRepay'
  //         ],
  //         title: '交易失败',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'payment',
  //       component: () => import('@/views/payment/index'),
  //       name: 'payment',
  //       meta: {
  //         perms: [
  //           'POST /admin/system/getMerchantBalance',
  //           'POST /admin/system/outPay',
  //           'POST /admin/system/guaranteePay',
  //           'POST /admin/system/updateAccount',
  //           'POST /admin/system/grantRedEnvelope',
  //           'POST /admin/system/uploadFileToAbc',
  //           'POST /admin/system/selectCmbInfo',
  //           'POST /admin/system/updateCmbInfo'
  //         ],
  //         title: '充值缴费',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'invoiceVerify',
  //       component: () => import('@/views/invoiceVerify/index'),
  //       name: 'invoiceVerify',
  //       meta: {
  //         perms: [
  //           'POST /admin/invoice/verifyList',
  //           'POST /admin/invoice/pass',
  //           'POST /admin/invoice/verifyExport',
  //           'POST /admin/invoice/notPass'
  //         ],
  //         title: '发票审核',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'driverVerify',
  //       component: () => import('@/views/driverVerify/index'),
  //       name: 'driverVerify',
  //       meta: {
  //         perms: [
  //           'POST /admin/system/verifyList',
  //           'POST /admin/system/verifyPass',
  //           'POST /admin/system/verifyDelete',
  //           'POST /admin/system/verifyExport'
  //         ],
  //         title: '司机审核',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'invoiceLog',
  //       component: () => import('@/views/invoiceLog/index'),
  //       name: 'invoiceLog',
  //       meta: {
  //         perms: [
  //           'POST /admin/invoice/logList',
  //           'POST /admin/invoice/logExport'
  //         ],
  //         title: '开票日志',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },
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
