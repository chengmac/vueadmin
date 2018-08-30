import Vue from 'vue'
import iView from 'iview'
import Router from 'vue-router'

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
});

router.afterEach(route => {
    iView.LoadingBar.finish();
})
export default router
