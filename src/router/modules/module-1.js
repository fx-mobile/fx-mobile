
/**
 * 模块一路由信息
 */
const company = r => require.ensure([], () => r(require('@/pages/company/')))
const module1 = r => require.ensure([], () => r(require('@/pages/company/module1.vue')))

//keepAlive: true, requiresAuth: true
export default [
    {
        path: 'company', component: company, children: [
            { path: 'module1', component: module1, meta: { title: '栏目一', showTab: true, keepAlive: false, requiresAuth: true, }, desc: '栏目一' },


        ]
    },
]