import setting from '@/setting.js'
import {dirRolesOne} from "@/api/modules/sys.roles.api";
import util from "@/libs/util";

export default {
  namespaced: true,
  state: {
    // 搜索面板激活状态
    active: false,
    // 快捷键
    hotkey: {
      open: setting.hotkey.search.open,
      close: setting.hotkey.search.close
    },
    // 所有可以搜索的页面
    pool: []
  },
  mutations: {
    /**
     * @description 切换激活状态
     * @param {Object} state state
     */
    toggle(state) {
      state.active = !state.active
    },
    /**
     * @description 设置激活模式
     * @param {Object} state state
     * @param {Boolean} active active
     */
    set(state, active) {
      state.active = active
    },
    /**
     * @description 初始化
     * @param {Object} state state
     * @param {Array} menu menu
     */
    init(state, menu) {
      const pool = []
      const fillterPool = []
      const push = function (menu, titlePrefix = []) {
        let roleId = util.cookies.get('roleId')
        dirRolesOne({params: {id: roleId}}).then(roleData => {
          let perMenu = roleData.menus
          menu[0].children.forEach(m => {
            if (m.children) {
              push(m.children, [...titlePrefix, m.meta && m.meta.title || m.name])
            } else {
              pool.push({
                ...m,
                fullTitle: [...titlePrefix, m.meta && m.meta.title || m.name].join(' / ')
              })
            }
          })
          for (const perMenu1 of perMenu) {
            for (const poolElement of pool) {
              if (perMenu1.path === poolElement.path) {
                fillterPool.push(poolElement)
              }
            }
          }
        })
      }
      push(menu)
      state.pool = fillterPool

    }
  }
}

