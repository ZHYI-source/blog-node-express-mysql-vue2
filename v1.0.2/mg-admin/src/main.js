// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'

// 菜单和路由设置
import router from './router'
import {menuHeader, menuAside, setAsideMenu} from '@/menu'
import {frameInRoutes} from '@/router/routes'
import install from './libs/utils.registeredComponents';
import {toast} from "@/libs/utils.toast"
import {listen} from "@/libs/utils.listen"
import Dialog from 'v-dialogs'
import SelectPage from 'v-selectpage'
import pluginExport from '@d2-projects/vue-table-export'
import Directives from './libs/directives/index';
import {dirRolesList} from "@/api/modules/sys.roles.api";
import util from "@/libs/util";

Vue.use(Directives);
Vue.use(pluginExport)
Vue.prototype.$listen = listen;
Vue.prototype.$toast = toast;
Vue.use(SelectPage)
// 核心插件
Vue.use(d2Admin)
Vue.use(Dialog)
Vue.use(install);
Vue.use(SelectPage)
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    // this.$store.commit('d2admin/menu/headerSet', this.$router.options.routes)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', this.$router.options.routes)
  },
  mounted() {
    //设置侧边栏
    let roleId = util.cookies.get('roleId')
    if (roleId) {
      setAsideMenu(this)
    }
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}).$mount('#app')
