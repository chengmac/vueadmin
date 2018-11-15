// 子路由
const mainRouter = [
    {
        path: '/home',
        name: 'home',
        icon: 'ios-home-outline',
        meta: {
            icon: 'ios-home-outline',
            title: '首页',
            requireAuth: true
        },
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/articleEditor',
        name: 'articleEditor',
        icon: 'ios-create-outline',
        meta: {
            icon: 'ios-create-outline',
            title: '文章编辑',
            requireAuth: true,
        },
        component: () => import('@/views/article/ArticleEditor.vue')
    },
    {
        path: '/articleCategory',
        name: 'articleCategory',
        icon: 'ios-list-box-outline',
        meta: {
            icon: 'ios-list-box-outline',
            title: '文章分类',
            requireAuth: true,
        },
        component: () => import('@/views/article/ArticleCategory.vue')
    },
];

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
        path: '/main',
        name: 'main',
        meta: {
            requireAuth: true,
        },
        component: () => import('@/views/Main.vue'),
        children: mainRouter
    },
    // 重定向
    {
      path: '/',
      redirect: '/login'
    }
];

export { routers, mainRouter }
