
// 所有路由
const routers = [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: 'Login - 登录'
        },
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/home',
        name: 'home',
        meta: {
            title: 'Home - 首页'
        },
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('@/views/Main.vue'),
        children: [
            {
                path: '/articleEditor',
                name: 'articleEditor',
                component: () => import('@/views/article/ArticleEditor.vue')
            },
            {
                path: '/articleAdministration',
                name: 'articleAdministration',
                component: () => import('@/views/article/ArticleAdministration.vue')
            },
        ]
    },
    // 重定向
    {
      path: '/',
      redirect: '/login'
    }
];

export default routers;
