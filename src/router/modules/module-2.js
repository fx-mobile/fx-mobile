const module2 = r => require.ensure([], () => r(require('@/pages/module2/module2.vue')), '')
export default [
    { path: 'module2', component: module2, meta: { showTab: true, title: '栏目二' } }
]