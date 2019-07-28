import Vue from 'vue'
import Vuex from 'vuex'
import module1 from './modules/module1'
Vue.use(Vuex)

export default new Vuex.Store({
    // 模板化的套件 大仓库中的小仓库
    modules: {
        module1
    },
})