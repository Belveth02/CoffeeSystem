import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/home',
        name: 'home',
        component: () => import('../components/Home.vue'),
        children: [
            {
                path: '/coffeepage',
                name: 'coffeepage',
                component:()=>import('../components/Coffeepage.vue')
            },
            {
                path: '/cartpage',
                name: 'cartpage',
                component:()=>import('../components/Cartpage.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../components/Register.vue')
    },
    {
        path: '/userlist',
        name: 'userlist',
        component: () => import('../components/UserList.vue')
    },
    {
        path: '/personalcenter',
        name: 'personalcenter',
        component: () => import('../components/Personalcenter.vue'),
        children: [
            {
                path: 'user-info',
                name: 'UserInfo',
                component: () => import('../components/UserInfo.vue')
            },
            {
                path: 'myorder',
                name: 'MyOrder',
                component: () => import('../components/MyOrder.vue')
            },
            {
                path: 'change-password',
                name: 'ChangePassword',
                component: () => import('../components/ChangePassword.vue')
            }
        ]
    },
    {
        path: '/clerk',
        name: 'clerk',
        component: () => import('../components/Clerk.vue'),
        children: [
            {
                path: 'orders',
                name: 'Orders',
                component:()=>import('../components/Orders.vue')
            },
            {
                path: 'modifypassword',
                name: 'ModifyPassword',
                component:()=>import('../components/ModifyPassword.vue')
            }
        ]
    },
    {
        path: '/clerklogin',
        name: 'clerklogin',
        component: () => import('../components/Clerklogin.vue')
    },
    {
        path: '/',
        redirect: '/home'
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
