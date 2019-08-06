import Vue from 'vue'
import Vuex from 'vuex'
import store from './store/'
import router from './router/'
import { sync } from 'vuex-router-sync'

// import sdkInit from './api/sdkInit'
import App from './App'
import Mint from 'fx-mui'
import flexible from './assets/modifiedLib/lib-flexible/'
import components from './components/user/'
import polyfill from './assets/js/polyfill'
// const FastClick = require('fastclick')
// css
import 'normalize.css/normalize.css'
import './assets/css/reset.css'
import 'fx-mui/lib/style.css'
import './assets/css/fx-mui-cover.scss'
import './assets/css/global.css'
import './assets/scss/global.scss'
import './assets/scss/fx-mui-cover.scss'
// 消除300ms点击延迟
// FastClick.attach(document.body)
Vue.use(Mint)


sync(store, router)
// 生产模式下的提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new polyfill()
Object.keys(components).forEach(key => {
    var name = key.replace(/(\w)/, v => v.toUpperCase()) //首字母大写
    Vue.component(`v${name}`, components[key])
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})