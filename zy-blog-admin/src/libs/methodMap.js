import {driverScore} from '../api/driverScore/driverScore'
import {zyApi} from '../api/zz/zzPages'//引入zz-api
/* eslint-disable spaced-comment,semi */
/**
 * url 访问地址
 * 注意：如果是导出的话一定要注意responseType设置为blob
 */
const methodMap = {

  /******中智项目api分离*****/

  ...zyApi,

  /***********************/

  //管理员列表
  api_admin_adminList: {url: '/zy-server/admin/list', method: 'get'},
  //获取用户列表
  api_admin_userList: {url: '/zy-server/admin/userList', method: 'post'},
  //机构用户列表
  api_admin_orgUserList: {url: '/zy-server/admin/admin/orgUserList', method: 'post'},

  //订单导出
  // api_admin_exportOrder: {url: '/zy-server/admin/exportOrder', method: 'post', responseType: 'blob'},

  //**用户菜单列表**/
  getUserMenu: {url: '/zy-server/admin/userMenuList', method: 'get'},
  //**用户列表**/
  api_admin_user_list: {url: '/zy-server/admin/userList', method: 'post'},
  //**角色选择列表**/
  api_admin_role_list: {url: '/zy-server/admin/roleList', method: 'post'},
  //**用户登陆**/
  api_admin_reg: {url: '/zy-server/admin/userReg', method: 'post'},
  //**用户删除**/
  api_admin_delete: {url: '/zy-server/admin/userDelete', method: 'post'},
  //**角色列表**/
  api_admin_role_page_list: {url: '/zy-server/admin/rolePageList', method: 'post'},
  //**主页**/
  api_admin_index: {url: '/zy-server/admin/index', method: 'post'},
  //**运营**/
  api_admin_operate_index: {url: '/zy-server/admin/operatelst', method: 'post'},
  //运营登录
  api_admin_view: {url: '/zy-server/admin/userView', method: 'post'},
  //运营登录
  api_admin_reward_list: {url: '/zy-server/admin/driverRewardList', method: 'post'},
  //修改活动状态
  api_admin_reward_update: {url: '/zy-server/admin/updateRewardStatus', method: 'get'},
  //修改活动状态
  api_admin_reward_exlout: {url: '/zy-server/admin/exportDriverReward', method: 'post', responseType: 'blob'},

  orgList: {url: '/zy-server/org/select', method: 'post'},
  //机构列表
  orgInsert: {url: '/zy-server/org/insert', method: 'post'},
  //机构更新
  orgDelete: {url: '/zy-server/org/delete', method: 'post'},
  //机构删除
  orgTree: {url: '/zy-server/org/tree', method: 'post'},
  //获取机构树
  api_org_companyInfo: {url: '/zy-server/org/companyInfo', method: 'post'},
  //获取公司信息
  messageList: {url: '/zy-server/message/messageList', method: 'post'},
  //消息列表
  messageUpdate: {url: '/zy-server/message/messageUpdate', method: 'post'},
  //消息更新
  messageDelete: {url: '/zy-server/message/messageDelete', method: 'post'},
  //消息删除
  messageSend: {url: '/zy-server/message/messageSend', method: 'post'},
  //消息发送
  messageHistory: {url: '/zy-server/message/messageHistory', method: 'post'},
  //消息历史
  api_admin_complaint_number: {url: '/zy-server/admin/complaint/number', method: 'post'},
  //投诉个数统计查询
  api_admin_complaint_super_list: {url: '/zy-server/admin/complaint/superList', method: 'post'},
  //监管投诉查询
  api_admin_complaint_super_changeDriver: {url: '/zy-server/admin/complaint/superChangeDriver', method: 'post'},
  //监管修改投诉司机
  api_admin_complaint_super_detail: {url: '/zy-server/admin/complaint/superDetail', method: 'post'},
  //监管投诉详情
  api_admin_complaint_super_appeal: {url: '/zy-server/admin/complaint/superAppeal', method: 'post'},
  //监管投诉现场处理
  api_admin_complaint_super_back: {url: '/zy-server/admin/complaint/superBack', method: 'post'},
  //监管退回投诉
  api_admin_complaint_super_delete: {url: '/zy-server/admin/complaint/superDelete', method: 'post'},
  //监管删除投诉
  api_admin_complaint_super_deal: {url: '/zy-server/admin/complaint/superDeal', method: 'post'},
  //监管投诉处理
  api_admin_complaint_super_sendMsg: {url: '/zy-server/admin/complaint/superSendMsg', method: 'post'},
  //监管投诉发消息给司机
  api_admin_complaint_super_export: {url: '/zy-server/admin/complaint/superExport', method: 'post', responseType: 'blob'},
  //监管投诉导出
  api_admin_complaint_list: {url: '/zy-server/admin/complaint/list', method: 'post'},
  //投诉查询
  api_admin_complaint_changeDriver: {url: '/zy-server/admin/complaint/changeDriver', method: 'post'},
  //修改投诉司机
  api_admin_complaint_detail: {url: '/zy-server/admin/complaint/detail', method: 'post'},
  //投诉详情
  api_admin_complaint_appeal: {url: '/zy-server/admin/complaint/appeal', method: 'post'},
  //投诉现场处理
  api_admin_complaint_back: {url: '/zy-server/admin/complaint/back', method: 'post'},
  //退回投诉
  api_admin_complaint_delete: {url: '/zy-server/admin/complaint/delete', method: 'post'},
  //删除投诉
  api_admin_complaintReply_list: {url: '/zy-server/admin/complaint/replyList', method: 'post'},
  //投诉详情
  api_admin_complaintReply_update: {url: '/zy-server/admin/complaint/replyUpdate', method: 'post'},
  //投诉编辑
  api_admin_complaintReply_reply: {url: '/zy-server/admin/complaint/reply', method: 'post'},
  //投诉回复
  api_admin_complaint_deal: {url: '/zy-server/admin/complaint/deal', method: 'post'},
  //投诉处理
  api_admin_complaint_sendMsg: {url: '/zy-server/admin/complaint/sendMsg', method: 'post'},
  //投诉发消息给司机
  api_admin_complaint_decide: {url: '/zy-server/admin/complaint/order', method: 'post'},
  //投诉判定
  api_admin_complaint_superReply: {url: '/zy-server/admin/complaint/superReply', method: 'post'},
  //投诉结案
  api_admin_complaint_export: {url: '/zy-server/admin/complaint/export', method: 'post', responseType: 'blob'},
  //投诉导出
  api_admin_complaint_historyList: {url: '/zy-server/admin/complaint/historyList', method: 'post'},
  //历史投诉查询
  api_admin_complaint_historyExport: {url: '/zy-server/admin/complaint/historyExport', method: 'post', responseType: 'blob'},
  //历史投诉导出
  api_admin_complaint_historyDetail: {url: '/zy-server/admin/complaint/historyDetail', method: 'post'},
  //历史投诉详情
  api_admin_errExcel: {url: '/zy-server/admin/errExcelOut', method: 'post', responseType: 'blob'},
  //错误文件导出
  api_admin_ad_range: {url: '/zy-server/admin/ad/range', method: 'post'},
  //广告使用范围
  api_admin_ad_list: {url: '/zy-server/admin/ad/list', method: 'post'},
  //广告查询
  api_admin_ad_createOrUpdate: {url: '/zy-server/admin/ad/createOrUpdate', method: 'post'},
  //广告编辑
  api_admin_ad_delete: {url: '/zy-server/admin/ad/delete', method: 'post'},
  //广告删除
  api_admin_device_gpsByCircle: {url: '/taxi-mongo/device/queryGpsByCircle', method: 'post'},
  //GPS数据圆形查找
  api_admin_device_gpsOfCar: {url: '/taxi-mongo/device/queryGpsOfCar', method: 'post'},
  //单台车GPS数据
  api_admin_device_newestGpsAndOrder: {url: '/taxi-mongo/device/getNewestGpsAndOrder', method: 'post'},
  //单台车最新GPS和最新订单
  api_admin_position_orderList: {url: '/zy-server/admin/position/orderList', method: 'post'},
  //车辆位置-订单查询
  api_admin_position_queryOrderByCar: {url: '/zy-server/admin/position/queryOrderByCar', method: 'post'},
  //车辆位置-按车辆查询订单
  api_admin_position_queryCarByPlateNo: {url: '/zy-server/admin/position/queryCarByPlateNo', method: 'post'},
  //车辆位置-车牌号模糊查找车辆
  api_admin_position_queryOrgNode: {url: '/zy-server/admin/position/queryNode', method: 'post'},
  //车辆位置-子机构节点
  api_admin_position_queryCarNode: {url: '/taxi-mongo/device/queryNode', method: 'post'},
  //车辆位置-在线车辆节点
  api_admin_driverSign: {url: '/zy-server/admin/driverSign', method: 'post'},
  //司机打卡 - 列表
  api_admin_goOffWorkForced: {url: '/zy-server/admin/goOffWorkForced', method: 'post'},
  //司机打卡 - 强制下班
  api_admin_goOnWorkForced: {url: '/zy-server/admin/goOnWorkForced', method: 'post'},
  //司机打卡 - 强制上班
  api_admin_orderReport: {url: '/zy-server/admin/orderReport', method: 'post'},
  //订单统计
  api_admin_carReport: {url: '/zy-server/admin/carReport', method: 'post'},
  //车辆统计
  api_admin_signReport: {url: '/zy-server/admin/signReport', method: 'post'},
  //打卡统计
  api_admin_signReport_export: {url: '/zy-server/admin/signReportExport', method: 'post',  responseType: 'blob'},
  //打卡统计 - 导出
  api_admin_pasteReport: {url: '/zy-server/admin/pasteReport', method: 'post'},
  //贴码统计
  api_admin_pasteReport_export: {url: '/zy-server/admin/pasteReportExport', method: 'post',  responseType: 'blob'},
  //贴码统计 - 导出
  api_admin_histogram: {url: '/zy-server/admin/histogramOfIndex', method: 'post'},
  //首页柱状图
  api_admin_driver_bindCar: {url: '/zy-server/admin/bindingDriverCar', method: 'post'},
  //司机信息 - 车辆绑定
  api_admin_driver_carList: {url: '/zy-server/admin/justOrgCarList', method: 'post'},
  //司机信息 - 车辆列表
  api_admin_driver_templateDownload: {url: '/zy-server/admin/templateDownloadDrivers', method: 'post', responseType: 'blob'},
  //司机信息 - 导入模板下载
  api_admin_sms_send: {url: '/zy-server/admin/sms/send', method: 'post'},
  //短信发送 - 新建发送短信
  api_admin_sms_list: {url: '/zy-server/admin/sms/smsHistory', method: 'post'},
  //短信发送 - 发送历史列表
  api_admin_sms_err: {url: '/zy-server/admin/sms/errExcelOut', method: 'post', responseType: 'blob'},
  //短信发送 - 错误文件导出
  api_admin_sms_templateDownload: {url: '/zy-server/admin/sms/templateDownload', method: 'post',responseType: 'blob'},
  //短信发送 - 导入模板下载
  api_admin_car_err: {url: '/zy-server/admin/errExcelOutCars', method: 'post', responseType: 'blob'},
  //车辆信息 - 错误文件导出
  api_admin_car_templateDownload: {url: '/zy-server/admin/templateDownloadCars', method: 'post',responseType: 'blob'},
  //车辆信息 - 导入模板下载
  api_admin_system_bill: {url: '/zy-server/admin/system/bill', method: 'post'},
  //司机账单 - 列表
  api_admin_system_billExport: {url: '/zy-server/admin/system/billExport', method: 'post', responseType: 'blob'},
  //司机账单 - 文件导出
  api_admin_coupon_idList: {url: '/zy-server/admin/couponList', method: 'post'},
  //广告红包 - 获取优惠券ID
  api_admin_coupon_list: {url: '/zy-server/admin/couponConsumeList', method: 'post'},
  //广告红包 - 列表
  api_admin_coupon_export: {url: '/zy-server/admin/couponConsumeExport', method: 'post', responseType: 'blob'},
  //广告红包 - 导出
  api_admin_coupon_listHd: {url: '/zy-server/admin/couponConsumeListHd', method: 'post'},
  //恒大红包 - 列表
  api_admin_coupon_exportHd: {url: '/zy-server/admin/couponConsumeExportHd', method: 'post', responseType: 'blob'},
  //恒大红包 - 导出
  api_admin_coupon_listYk: {url: '/zy-server/admin/couponConsumeListYk', method: 'post'},
  //眼科红包 - 列表
  api_admin_coupon_exportYk: {url: '/zy-server/admin/couponConsumeExportYk', method: 'post', responseType: 'blob'},
  //眼科红包 - 导出
  api_admin_system_nhDeposit: {url: 'taxi-pay/nhDeposit', method: 'post'},
  //充值缴费 - 生成付款链接
  api_admin_system_submerchatFee: {url: 'taxi-pay/merchant/querySubmerchatFee', method: 'get'},
  //充值缴费 - 查询垫资余额
  api_admin_system_merchantBalance: {url: '/zy-server/admin/system/getMerchantBalance', method: 'post'},
  //充值缴费 - 查询司机账户余额
  api_admin_system_updateAccount: {url: '/zy-server/admin/system/updateAccount', method: 'post'},

  api_admin_system_unbindAccount: {url: '/zy-server/admin/system/unbindAccount', method: 'post'},
  //充值缴费 - 修改银行卡号
  api_admin_system_outPay: {url: '/zy-server/admin/system/outPay', method: 'post'},
  //充值缴费 - 余额提现
  api_admin_system_guaranteePay: {url: '/zy-server/admin/system/guaranteePay', method: 'post'},
  //充值缴费 - 垫资担保
  api_admin_system_grantRedEnvelope: {url: '/zy-server/admin/system/grantRedEnvelope', method: 'post'},
  //充值缴费 - 红包发放
  api_admin_system_uploadFileToAbc: {url: '/zy-server/admin/system/uploadFileToAbc', method: 'post'},
  //充值缴费 - 农行上传材料
  api_admin_system_selectCmbInfo: {url: '/zy-server/admin/system/selectCmbInfo', method: 'post'},
  //充值缴费 - 招行查询
  api_admin_system_updateCmbInfo: {url: '/zy-server/admin/system/updateCmbInfo', method: 'post'},
  //充值缴费 - 招行修改
  api_admin_system_verifyList: {url: '/zy-server/admin/system/verifyList', method: 'post'},
  //司机审核 - 列表
  api_admin_system_verifyPass: {url: '/zy-server/admin/system/verifyPass', method: 'post'},
  //司机审核 - 审核通过
  api_admin_system_verifyExport: {url: '/zy-server/admin/system/verifyExport', method: 'post',responseType: 'blob'},
  //司机审核 - 导出
  api_admin_system_verifyDelete: {url: '/zy-server/admin/system/verifyDelete', method: 'post'},
  //司机审核 - 删除
  api_admin_system_verifyChange: {url: '/zy-server/admin/system/verifyChange', method: 'post'},
  //司机审核 - 个人转企业
  api_admin_captain_list: {url: '/zy-server/admin/captain/select', method: 'post'},
  //队长管理 - 列表
  api_admin_captain_insert: {url: '/zy-server/admin/captain/insert', method: 'post'},
  //队长管理 - 新增
  api_admin_captain_delete: {url: '/zy-server/admin/captain/delete', method: 'post'},
  //队长管理 - 删除
  api_admin_captain_view: {url: '/zy-server/admin/captain/view', method: 'post'},
  //队长管理 - 编辑队长查看
  api_admin_captain_update: {url: '/zy-server/admin/captain/update', method: 'post'},
  //队长管理 - 编辑队长更新
  api_admin_captain_import: {url: '/zy-server/admin/captain/importExcel', method: 'post'},
  //队长管理 - 导入
  api_admin_captain_template: {url: '/zy-server/admin/captain/templateDownload', method: 'post',responseType: 'blob'},
  //队长管理 - 导入模板下载
  api_admin_captain_errExcel: {url: '/zy-server/admin/captain/errExcelOut', method: 'post', responseType: 'blob'},
  //队长管理 - 错误信息导出
  api_admin_screen_newestOrder: {url: '/zy-server/admin/screen/newestOrder', method: 'post'},
  //数据大屏 - 最新订单
  api_admin_screen_orderRank: {url: '/zy-server/admin/screen/orderRank', method: 'post'},
  //数据大屏 - 订单排名
  api_admin_screen_getOnlineCar: {url: '/zy-server/admin/screen/getOnlineCar', method: 'post'},
  //数据大屏 - 大屏取点
  api_admin_screen_getHealthInfo: {url: '/zy-server/admin/screen/getHealthInfo', method: 'post'},
  //数据大屏 - 乘客健康数据
  api_admin_violation_list: {url: '/zy-server/admin/violation/list', method: 'post'},
  //违章查询 - 列表
  api_admin_violation_export: {url: '/zy-server/admin/violation/export', method: 'post',responseType: 'blob'},
  //违章查询 - 导出
  api_admin_invoice_list: {url: '/zz-server/admin/invoice/list', method: 'post'},
  //电子发票 - 列表
  api_admin_invoice_retry: {url: '/zz-server/admin/invoice/retry', method: 'post'},
  //电子发票 - 重新开票
  api_admin_invoice_createInvoice: {url: '/zz-server/admin/invoice/insert', method: 'post'},
  //电子发票 - 新增
  api_admin_invoice_updateInvoice: {url: '/zz-server/admin/invoice/update', method: 'post'},
  //电子发票 - 编辑
  api_admin_invoice_orgList: {url: '/zz-server/admin/invoice/orgList', method: 'post'},
  //税号管理 - 列表
  api_admin_invoice_cancellation: {url: '/zz-server/admin/invoice/cancellation', method: 'post'},
  //税号管理 - 注销
  api_admin_invoice_updateCar: {url: '/zz-server/admin/invoice/updateCar', method: 'post'},
  //税号管理 - 更换车
  api_admin_invoice_updateOrg: {url: '/zz-server/admin/invoice/updateOrg', method: 'post'},
  //税号管理 - 编辑
  api_admin_invoice_orgExport: {url: '/zz-server/admin/invoice/orgExport', method: 'post',responseType: 'blob'},
  //税号管理 - 导出
  api_admin_invoice_import: {url: '/zz-server/admin/invoice/importExcel', method: 'post'},
  //税号管理 - 导入
  api_admin_invoice_orgHistory: {url: '/zz-server/admin/invoice/orgHistory', method: 'post'},
  //税号管理 - 历史记录
  api_admin_invoice_template: {url: '/zz-server/admin/invoice/templateDownload', method: 'post',responseType: 'blob'},
  //税号管理 - 导入模板下载
  api_admin_invoice_errExcel: {url: '/zz-server/admin/invoice/errExcelOut', method: 'post', responseType: 'blob'},
  //税号管理 - 错误信息导出
  api_admin_invoice_carOrderList: {url: '/zz-server/admin/invoice/carOrderList', method: 'post'},
  //车辆交易统计 - 列表
  api_admin_invoice_carOrderExport: {url: '/zy-server/admin/invoice/carOrderExport', method: 'post', responseType: 'blob'},
  //车辆交易统计 - 导出
  api_admin_invoice_number: {url: '/zy-server/admin/invoice/number', method: 'post'},
  //充值管理 - 余额及车辆统计
  api_admin_invoice_balanceList: {url: '/zy-server/admin/invoice/balanceList', method: 'post'},
  //充值管理 - 列表
  api_admin_invoice_recharge: {url: '/zy-server/admin/invoice/recharge', method: 'post'},
  ////充值管理 - 充值
  api_admin_invoice_depositList: {url: '/zy-server/admin/invoice/depositList', method: 'post'},
  //充值记录 - 列表
  api_admin_invoice_depositExport: {url: '/zy-server/admin/invoice/depositExport', method: 'post',responseType: 'blob'},
  //充值记录 - 导出
  api_admin_invoice_deduceList: {url: '/zy-server/admin/invoice/deduceList', method: 'post'},
  //扣费明细 - 列表
  api_admin_invoice_deduceExport: {url: '/zy-server/admin/invoice/deduceExport', method: 'post',responseType: 'blob'},
  //扣费明细 - 导出
  api_admin_invoice_verifyList: {url: '/zy-server/admin/invoice/verifyList', method: 'post'},
  //充值审核 - 列表
  api_admin_invoice_verifyExport: {url: '/zy-server/admin/invoice/verifyExport', method: 'post',responseType: 'blob'},
  //充值审核 - 导出
  api_admin_invoice_pass: {url: '/zy-server/admin/invoice/pass', method: 'post'},
  //充值审核 - 通过
  api_admin_invoice_notPass: {url: '/zy-server/admin/invoice/notPass', method: 'post'},
  //充值审核 - 驳回
  api_admin_invoice_logList: {url: '/zy-server/admin/invoice/logList', method: 'post'},
  //开票日志 - 列表
  api_admin_invoice_logExport: {url: '/zy-server/admin/invoice/logExport', method: 'post',responseType: 'blob'},
  //开票日志 - 导出
  api_admin_login_sms: {url: '/zy-server/sms/captcha', method: 'get'},
  //登录验证码
  api_admin_system_cashFailList: {url: '/zy-server/admin/system/cashFailList', method: 'post'},
  //交易失败 - 列表
  api_admin_system_cashFailDeal: {url: '/zy-server/admin/system/cashFailDeal', method: 'post'},
  //交易失败 - 处理
  api_admin_system_cashFailUpdateLog: {url: '/zy-server/admin/system/cashFailUpdateLog', method: 'post'},
  //交易失败 - 修改备注
  api_admin_invoice_cashFailRepay: {url: '/zy-server/admin/system/cashFailRepay', method: 'post'},
  //交易失败 - 重新打款
  api_admin_system_cashFailExport: {url: '/zy-server/admin/system/cashFailExport', method: 'post',responseType: 'blob'},
  //交易失败 - 导出
  api_admin_invoice_report: {url: '/zy-server/admin/invoice/report', method: 'post'},
  //发票统计 - 列表
  api_admin_complaint_report: {url: '/zy-server/admin/complaint/report', method: 'post'},
  //投诉统计 - 列表
  api_admin_complaint_reportExport: {url: '/zy-server/admin/complaint/reportExport', method: 'post',responseType: 'blob'},
  //投诉统计 - 导出
  api_admin_complaint_month: {url: '/zy-server/admin/complaint/month', method: 'post'},
  //投诉月报- 列表
  api_admin_complaint_monthExport: {url: '/zy-server/admin/complaint/monthExport', method: 'post',responseType: 'blob'},
  //招行流水
  api_admin_cmbCheck: {url: '/zy-server/admin/cmbCheck', method: 'post'},
  //招行流水导出
  api_admin_cmbCheckExport: {url: '/zy-server/admin/cmbCheckExport', method: 'post',responseType: 'blob'},

  //投诉月报 - 导出
  /********************************司机评分*********************************/
  ...driverScore
  //=====================================appserver服务********************
};
export default methodMap;
