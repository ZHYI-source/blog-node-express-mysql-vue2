/**
 *@author ZY
 *@date 2021/11/9
 *@Description:司机评分模块接口
 * 注意：如果是导出的话一定要注意responseType设置为blob
*/
export const driverScore ={
  /**司机画像**/
  api_admin_comment_driverList: {url: 'taxi-server/admin/comment/driverList', method: 'post',},//司机画像列表
  api_admin_comment_driverDetail: {url: 'taxi-server/admin/comment/driverDetail', method: 'post',},//司机画像详情
  /**投诉履历**/
  api_admin_comment_driverComplaintList: {url: 'taxi-server/admin/comment/driverComplaintList', method: 'post',},//投诉履历列表
  api_admin_comment_driverComplaintDetail: {url: 'taxi-server/admin/comment/driverComplaintDetail', method: 'post',},//投诉履历详情
  /**司机评价记录**/
  api_admin_comment_driverCommentList: {url: 'taxi-server/admin/comment/driverCommentList', method: 'post',},//司机评价列表
  api_admin_comment_commentDetail: {url: 'taxi-server/admin/comment/commentDetail', method: 'post',},//司机评价详情
  api_admin_comment_driverCommentListExport: {url: 'taxi-server/admin/comment/driverCommentListExport', method: 'post',responseType:'blob'},//司机评价记录列表导出
  /**月评报表**/
  api_admin_comment_reportPerMonth: {url: 'taxi-server/admin/comment/reportPerMonth', method: 'post',},//司机月评报表列表
  api_admin_comment_reportPerMonthDetail: {url: 'taxi-server/admin/comment/reportPerMonthDetail', method: 'post',},//司机月评报表列表详情
  api_admin_comment_reportPerMonthExport: {url: 'taxi-server/admin/comment/reportPerMonthExport', method: 'post',responseType:'blob'},//司机月评报表列表导出
  /**企业月报**/
  api_admin_comment_orgReportPerMonth: {url: 'taxi-server/admin/comment/orgReportPerMonth', method: 'post',},//企业月报表列表
  api_admin_comment_orgReportDetail: {url: 'taxi-server/admin/comment/orgReportDetail', method: 'post',},//企业月报表列表详情
  /**风险识别**/
  api_admin_comment_driverRisk: {url: 'taxi-server/admin/comment/driverRisk', method: 'post',},//风险识别列表
  api_admin_comment_riskDetail: {url: 'taxi-server/admin/comment/riskDetail', method: 'post',},//风险识别详情


}
