/**
 * 时间格式化
 *
 * @param {Date} data
 */
/**
 * 时间格式化
 *
 * @param {Date} data
 */
export default data => {
    let now = new Date(data)
    let year = padZero(now.getFullYear())
    let month = padZero(now.getMonth() + 1)
    let date = padZero(now.getDate())
    let hour = padZero(now.getHours())
    let minute = padZero(now.getMinutes())
    let second = padZero(now.getSeconds())
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
}

export const toDate = data => {
    data = data.replace(/\-/g, "/")
    let now = new Date(data)
    let year = padZero(now.getFullYear())
    let month = padZero(now.getMonth() + 1)
    let date = padZero(now.getDate())
    return year + '-' + month + '-' + date
}

const padZero = val => (Number(val) < 10 ? '0' + Number(val) : Number(val))


export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        let str = o[k] + '';
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}