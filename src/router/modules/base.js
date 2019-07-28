
const home = r => require.ensure([], () => r(require('@/pages/home/')), '')
const message = r => require.ensure([], () => r(require('@/pages/message/')), '')
const user = r => require.ensure([], () => r(require('@/pages/user/')), '')
const my = r => require.ensure([], () => r(require('@/pages/my/')), '')
const userForm = r => require.ensure([], () => r(require('@/pages/user/form')), '')


export default [
    { path: 'home', name: 'home', component: home, meta: { showTab: true, title: '首页' } },
    { path: 'message', name: 'message', component: message, meta: { showTab: true, keepAlive: false, title: '消息' } },
    {
        path: 'user',
        component: user,
        meta: { title: '用户' },
        children: [{
            path: 'form',
            component: userForm,
            meta: {
                keepAlive: true,
                title: '注册'
            }
        }
        ]
    },
    {
        path: 'my',
        component: my,
        meta: { showTab: true, title: '我的' },
    }
]