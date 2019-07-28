/**
 * 跳转至 http地址 || https地址 || vue-router配置的地址
 *
 * @export
 * @param {any} url
 */
export default function(url) {
    if (url && url.length > 0) {
        if (url.indexOf('//') > -1 || /[\w\d]+\.[\w\d]+\./.test(url)) {
            window.location.href = !~url.indexOf('//') ? '//' + url : url
        } else {
            this.$router.push({ path: url })
        }
    }
}