const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  userId: state => state.user.userId,
  userNickName: state => state.user.userNickName,
  orgId: state => state.user.orgId,
  orgName: state => state.user.orgName,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  perms: state => state.user.perms,
  addRouters: state => state.permission.addRouters
}
export default getters
