/**
 *@author ZY
 *@date 2021/12/9
 *@Description:中智项目web端api
 * 注意：如果是导出的话一定要注意responseType设置为blob
*/
export const zyApi ={

  /**登录模块**/
  api_sms_captcha: {url: 'zy-server/sms/captcha', method: 'get',},//图片验证码

  /**用户模块**/
  api_admin_operate_worker_create: {url: 'zz-server/admin/operate/worker/create', method: 'post',},//新增用户
  api_admin_operate_worker_update: {url: 'zz-server/admin/operate/worker/update', method: 'post',},//修改用户
  api_admin_operate_worker_list: {url: 'zz-server/admin/operate/worker/list', method: 'post',},//用户列表
  api_admin_operate_worker_import: {url: 'zz-server/admin/operate/worker/import', method: 'post',},//用户导入
  api_admin_operate_templateDownload: {url: 'zz-server/admin/operate/templateDownload', method: 'post',responseType:'blob'},//用户导入模板下载
  api_admin_operate_errExcelOut: {url: 'zz-server/admin/operate/errExcelOut', method: 'post', responseType:'blob'},//用户错误信息导出

  /**客户模块**/
  api_admin_operate_company_list: {url: 'zz-server/admin/company/list', method: 'post',},//客户列表
  api_admin_operate_company_create: {url: 'zz-server/admin/company/create', method: 'post',},//客户新增
  api_admin_operate_company_delete: {url: 'zz-server/admin/company/delete', method: 'post',},//客户删除
  api_admin_operate_company_update: {url: 'zz-server/admin/company/update', method: 'post',},//客户修改
  api_admin_operate_company_import: {url: 'zz-server/admin/company/import', method: 'post',responseType:'blob'},//客户导入
  api_admin_operate_company_errExcelOut: {url: 'zz-server/admin/company/errExcelOut', method: 'post',responseType:'blob'},//客户导出
  api_admin_operate_company_templateDownload: {url: 'zz-server/admin/company/templateDownload', method: 'post',responseType:'blob'},//客户导入模板下载


  /**合同管理**/
  api_admin_contract_list: {url: 'zz-server/admin/contract/list', method: 'post',},//合同列表
  api_admin_contract_create: {url: 'zz-server/admin/contract/create', method: 'post',},//新增合同
  api_admin_contract_delete: {url: 'zz-server/admin/contract/delete', method: 'post',},//删除合同
  api_admin_contract_filing: {url: 'zz-server/admin/contract/filing', method: 'post',},//合同归档
  api_admin_contract_seal: {url: 'zz-server/admin/contract/seal', method: 'post',},//合同盖章
  api_admin_contract_view: {url: 'zz-server/admin/contract/view', method: 'post',},//查看合同
  api_admin_contract_download: {url: 'zz-server/admin/contract/download', method: 'post', },//合同下载


  /**用工信息**/
  api_admin_task_order_list: {url: 'zz-server/admin/task/order/list', method: 'post',},//用工信息列表
  api_admin_task_order_create: {url: 'zz-server/admin/task/order/create', method: 'post',},//新增用工信息
  api_admin_task_order_delete: {url: 'zz-server/admin/task/order/delete', method: 'post',},//删除用工信息
  api_admin_task_order_deal: {url: 'zz-server/admin/task/order/deal', method: 'post',},//审核用工信息
  api_admin_task_order_back: {url: 'zz-server/admin/task/order/back', method: 'post',},//退回用工信息
  api_admin_task_order_change: {url: 'zz-server/admin/task/order/change', method: 'post',},//退回用工信息
  api_admin_task_order_detail: {url: 'zz-server/admin/task/order/detail', method: 'post',},//用工信息详情
  api_admin_task_order_deals: {url: 'zz-server/admin/task/order/deals', method: 'post',},//批量审核用工信息
  api_admin_task_order_import: {url: 'zz-server/admin/task/order/import', method: 'post',},//用工信息导入
  api_admin_task_order_errExcelOut: {url: 'zz-server/admin/task/order/errExcelOut', method: 'post',responseType:'blob'},//用工信息错误信息导出
  api_admin_task_order_templateDownload: {url: 'zz-server/admin/task/order/templateDownload', method: 'post',responseType:'blob'},//用工信息导入模板下载

  /**任务信息**/
  api_admin_task_task_list: {url: 'zz-server/admin/task/task/list', method: 'post',},//任务列表
  api_admin_task_task_change: {url: 'zz-server/admin/task/task/change', method: 'post',},//任务修改
  api_admin_task_task_create: {url: 'zz-server/admin/task/task/create', method: 'post',},//任务增加

  /**税号信息**/
  api_admin_invoice_insertOrg: {url: 'zz-server/admin/invoice/insertOrg', method: 'post',},//税号新增
  api_admin_invoice_cancellation: {url: 'zz-server/admin/invoice/cancellation', method: 'post',},//税号注销
  api_admin_invoice_orgHistory: {url: 'zz-server/admin/invoice/orgHistory', method: 'post',},//税号历史记录
  api_admin_invoice_orgList: {url: 'zz-server/admin/invoice/orgList', method: 'post',},//税号查询
  api_admin_invoice_updateOrg: {url: 'zz-server/admin/invoice/updateOrg', method: 'post',},//税号编辑
  api_admin_invoice_errExcelOut: {url: 'zz-server/admin/invoice/errExcelOut', method: 'post',responseType:'blob'},//税号错误信息导出
  api_admin_invoice_templateDownload: {url: 'zz-server/admin/invoice/templateDownload', method: 'post',responseType:'blob'},//税号导入模板下载
  api_admin_invoice_importExcel: {url: 'zz-server/admin/invoice/importExcel', method: 'post',},//税号导入

  /**发票信息**/
  api_admin_invoice_insert: {url: 'zz-server/admin/invoice/insert', method: 'post',},//新增发票
  api_admin_invoice_list: {url: 'zz-server/admin/invoice/list', method: 'post',},//发票详情
  api_admin_invoice_retry: {url: 'zz-server/admin/invoice/retry', method: 'post',},//重新开票
  api_admin_invoice_update: {url: 'zz-server/admin/invoice/update', method: 'post',},//发票编辑
  api_admin_invoice_queryBeforeInsert: {url: 'zz-server/admin/invoice/queryBeforeInsert', method: 'post',},//发票开具的用工查询

  // /**管理员**/
  api_admin_admin_create: {url: 'zz-server/admin/admin/create', method: 'post',},//管理员添加


}
