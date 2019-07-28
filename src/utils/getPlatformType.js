/**
 * 获取平台类型(01android，02ios，03微信,04支付宝)
 */
export default () => {
    let browser = navigator.userAgent.toLowerCase()
    let deviceIsWx = browser.match(/MicroMessenger/i) == "micromessenger";
    let deviceIsAlipay = browser.match(/Alipay/i) == "alipay";
    let deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
    let deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
    let deviceIsIOS = /iPhone/.test(navigator.userAgent) && !deviceIsWindowsPhone;
    if (deviceIsWx) {
        return "03"
    } else if (deviceIsAlipay) {
        return "04"
    } else if (deviceIsAndroid) {
        return "01"
    } else if (deviceIsIOS) {
        return "02"
    }
}
