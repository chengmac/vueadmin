import Vue from 'vue'
import Router from 'vue-router';
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import VueQuillEditor from 'vue-quill-editor'
import Echarts from 'echarts'
import moment from 'moment'
import filters from './filters'
import fullscreen from 'vue-fullscreen'
import echarts from 'echarts'

// styles
import 'iview/dist/styles/iview.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// use
Vue.use(Router)
.use(VueQuillEditor)
.use(iView)
.use(Echarts)
.use(fullscreen);

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

Vue.config.productionTip = false
moment.locale('zh-cn');
// 创建事件总线
Vue.prototype.$vue = new Vue();
Vue.prototype.$echarts = echarts;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
