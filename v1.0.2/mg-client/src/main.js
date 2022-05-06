import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/style.less'
import './assets/font/iconfont.css'
require('./Mock')
import {parseTime} from './utils'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'
Vue.use(VueHighlightJS)
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.filter('parseTime', (v) => parseTime(v,'{y}-{m}-{d}'))
Vue.filter('parseTimeFull', (v) => parseTime(v,'{y}-{m}-{d} {h}:{m}:{s}'))


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
