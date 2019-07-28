import Vue from 'vue'
import VueRouter from 'vue-router'
import base from './modules/base'
import module1 from './modules/module-1'
import module2 from './modules/module-2'
const system = r => require.ensure([], () => r(require('@/pages/system/index')), '')
const s404 = r => require.ensure([], () => r(require('@/pages/system/404')), '')

const entry = r => require.ensure([], () => r(require('@/pages/entry/')), '')
const login = r => require.ensure([], () => r(require('@/pages/login/')), '')
const pc_login = r => require.ensure([], () => r(require('@/pages/login/pc_login.vue')), '')
Vue.use(VueRouter)

import sessionStorageUtil from "@/utils/sessionStorageUtil";
import { getUserInfo } from "@/assets/js/common"
const router = new VueRouter({
    routes: [
        { path: '*', redirect: '/system/404' },
        { path: '/', redirect: '/entry/home' },
        {
            path: '/system',
            component: system,
            children: [{ path: '404', component: s404, meta: { title: '404' } }],
        },
        {
            path: '/entry',
            component: entry,
            children: [
                ...base,
                ...module1,
                ...module2
            ]
        },
        {
            path: '/login', component: login, meta: {
                title: '登录'
            }
        },
        {
            path: '/pc_login', component: pc_login, meta: {
                title: '登录认证'
            }
        }
    ],

})

// 微信顶部控制栏标题
router.afterEach(route => {
    if (route.meta.title == "") {
        document.title = ""
    } else if (route.meta.title) {
        document.title = route.meta.title
    } else {
        document.title = '标题栏'
    }
})

router.beforeEach((to, from, next) => {
    let nodeEnv = process.env.NODE_ENV
    if (to.matched.some(record => record.meta.requiresAuth)) {
        let toLogin = function () {
            if (!sessionStorageUtil.getItem(sessionStorageUtil.USER_LOGIN_STATUS)) {
                console.log('to', to)
                next({
                    path: '/login',
                    query: { redirect_url: to.fullPath },
                })
                return
            } else {
                next()
                return;
            }
        }
        if (!sessionStorage.getItem('is.first.load')) {
            sessionStorage.setItem('is.first.load', true)
            getUserInfo(to, null, false).then(res => {
                toLogin();
            });
            return;
        } else {
            toLogin();
            return;
        }

    } else {
        if (!sessionStorage.getItem('is.first.load')) {
            sessionStorage.setItem('is.first.load', true)
            getUserInfo(to, null, false).then(res => {
                next();
            });
            return;
        }
        next();
        return;
    }
})

export default router