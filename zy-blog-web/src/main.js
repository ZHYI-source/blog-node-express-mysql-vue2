import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/style.less'
import './assets/font/iconfont.css'
import './assets/font/iconfont2.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//https://github.com/SevenOutman/vue-aplayer/blob/develop/docs/README.zh-CN.md
import APlayer from '@moefe/vue-aplayer'
Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true,
});
Vue.use(ElementUI);

require('./Mock')
import {parseTime} from './utils'

Vue.config.productionTip = false
Vue.filter('parseTime', (v) => parseTime(v,'{y}-{m}-{d}'))
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
