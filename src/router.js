import Vue from 'vue';
import iView from 'iview';
import Router from 'vue-router';
import Cookies from 'js-cookie';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('./views/Main.vue')
    },
    // 重定向
    {
      path: '/',
      redirect: '/login'
    }
  ]
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
export default router
