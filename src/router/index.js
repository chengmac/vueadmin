import Vue from 'vue';
import iView from 'iview';
import Router from 'vue-router';
import Cookies from 'js-cookie';
import routers from './router';

Vue.use(Router);

// 定义路由
const router = new Router({
    routes: routers
});
  
// 路由拦截器
router.beforeEach((to, form, next) => {
    iView.LoadingBar.start();
    next();
    // 判断是否在登录状态
    // if(!Cookies.get("user") && !Cookies.get("password")){
    //   console.log(to)
    // }
  
  });
  
router.afterEach(route => {
    iView.LoadingBar.finish();
})
export default router;