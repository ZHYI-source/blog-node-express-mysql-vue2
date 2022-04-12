import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import install from './utils/registeredComponents';
Vue.use(install);
import Http from './libs/http'
import infiniteScroll from 'vue-infinite-scroll'
import scroll from 'vue-seamless-scroll'
import Dialog from 'v-dialogs'
Vue.use(Dialog)
import {toast} from "@/utils/toastUtils"
import {listen} from "@/utils/listen"
import Tools from "@/utils/tool";
import {setSortType} from "@/utils/sortUtil";
Vue.prototype.$tools=Tools;
Vue.prototype.toast=toast;
Vue.prototype.$listen=listen;
Vue.prototype.setSortType = setSortType;

Vue.use(scroll)

// 或者你可以自己设置全局注册的组件名 默认注册的组件名是 vue-seamless-scroll
Vue.use(scroll,{componentName: 'scroll-seamless'})

Vue.use(infiniteScroll)
Vue.use(Http)
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
