import {createRouter, createWebHashHistory} from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect:'goods', //路由重定向
            component: () => import('../pages/home.vue'),
            children: [
                {
                    path: 'goods',
                    name: 'goods',
                    meta: {
                        isShow: true,
                        title: '商品列表',
                        index: 1
                    },
                    component: () => import('../pages/goods.vue')
                },
                {
                    path: 'users',
                    name: 'userList',
                    meta: {
                        isShow: true,
                        title: '用户列表',
                        index: 2
                    },
                    component: () => import('../pages/userList.vue')
                },
                {
                    path: 'role',
                    name: 'role',
                    meta: {
                        isShow: true,
                        title: '角色列表',
                        index: 3
                    },
                    component: () => import('../pages/role.vue')
                },
                {
                    path: 'authority',
                    name: 'authority',
                    meta: {
                        isShow: false,
                        title: '权限列表',
                        index: 4
                    },
                    component: () => import('../pages/authority.vue')
                }
            ]

        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../pages/login.vue')
        }
    ],
})
//全局路由守卫
router.beforeEach((to,from,next)=>{
    const token:string | null = localStorage.getItem("token")
    if (!token && to.path !== '/login'){
        next('/login')
    }else {
        next()
    }
})

//导出
export default router