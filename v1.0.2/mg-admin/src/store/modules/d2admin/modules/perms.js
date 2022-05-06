
export default {
  namespaced: true,
  state: {
    // 页面的操作权限
    permsArr: [],

  },
  mutations: {
    /**
     * @description 切换激活状态
     * @param {Object} state state
     * @param permsArrs 操作权限
     */
    setPermsArr(state,permsArrs) {
      state.permsArr = permsArrs
    },
  }
}

