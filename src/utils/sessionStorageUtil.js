export default {
    USER_LOGIN_STATUS: 'user.login.status', //登录状态
    USER_LOGIN_INFO: 'user.login.info', //用户信息    
    setItem(name, content) {
        if (!name) return
        // content undefined是节点缺失，所以禁止保存
        if (typeof content === 'undefined') throw TypeError('sessionStorage.setItem的值为undefined')
        window.sessionStorage.setItem(name, JSON.stringify(content))
    },
    getItem(name) {
        if (!name) return
        return JSON.parse(window.sessionStorage.getItem(name))
    },
    removeItem(name) {
        if (!name) return
        window.sessionStorage.removeItem(name)
    },
    getUserInfo() {
        return this.getItem(this.USER_LOGIN_INFO);
    }
}