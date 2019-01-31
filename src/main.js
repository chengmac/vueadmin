import Vue from 'vue'
import Router from 'vue-router';
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Echarts from 'echarts'
import moment from 'moment'
import filters from './filters'
import fullscreen from 'vue-fullscreen'

// use
Vue.use(Router)
.use(mavonEditor)
.use(iView)
.use(Echarts)
.use(fullscreen);

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

Vue.config.productionTip = false
moment.locale('zh-cn');
// 创建事件总线
Vue.prototype.$vue = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
