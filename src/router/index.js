import iView from 'iview'
import Router from 'vue-router'
import { routers } from './routers'
import Cookies from 'js-cookie'

// 定义路由
const router = new Router({
    mode: 'history',
    routes: routers
});
  
// 路由拦截器
router.beforeEach((to, form, next) => {
    iView.LoadingBar.start();
    // 校验需要登录的页面
    if(to.matched.some(r => r.meta.requireAuth)){
        // 判断是否在登录状态
        if(Cookies.get('token')){
            next();
        } else {
            // 重定向回login
            next({path: '/login'}); 
        }
    } else {
        // 存在cookie时7天免登陆，直接进入
        if(Cookies.get('token')){
            next({path: '/home'});
        } 
        else {
           next();
        }
    }
    // 设置title
    document.title = to.meta.title; 
  });
  
router.afterEach(route => {
    iView.LoadingBar.finish();
})
export default router;