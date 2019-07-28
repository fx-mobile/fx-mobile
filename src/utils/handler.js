import config from "@/api/config"
export const areaDataHandler = (res) => {
    let options = res.map(item => {
        let option = {
            value: item.areaCode,
            label: item.areaName,
            children: [],
        }
        if (item.subArea.length > 0) {
            option.children = item.subArea.map(_item => {
                if (_item.subArea.length > 0) {
                    let _o = {
                        value: _item.areaCode,
                        label: _item.areaName,
                        children: [],
                    }
                    _o.children = _item.subArea.map(_s => {
                        return {
                            value: _s.areaCode,
                            label: _s.areaName,
                        }
                    })
                    return _o
                } else {
                    return {
                        value: _item.areaCode,
                        label: _item.areaName,
                    }
                }
            })
        } else {
            option.children.push({
                value: '',
                label: '全部',
            })
        }
        return option
    })
    return options
}

/**
 * 获取字符串实际长度（一个汉字等于两个字符长度）
 *
 * import util from "@/utils/realLength"
 *
 *
 * let str = "我是test"
 * let length = realLength(str)
 * console.log(length) // 8
 *
 *
 * @param {String} str
 */
export const realLength = str => {
    if (str) {
        return str.replace(/[^\x00-\xff]/g, "xx").length;
    } else {
        return 0;
    }
}

export const deepCopy = obj => {
    //对象深复制
    var newObj = obj.constructor === Array ? [] : {};
    newObj.constructor = obj.constructor;
    if (typeof obj !== "object") {
        return obj;
    } else if (window.JSON) {
        //若需要考虑特殊的数据类型，如正则，函数等，需把这个else if去掉即可
        newObj = JSON.parse(JSON.stringify(obj));
    } else {
        for (var prop in obj) {
            if (obj[prop].constructor === RegExp || obj[prop].constructor === Date) {
                newObj[prop] = obj[prop];
            } else if (typeof obj[prop] === 'object') {
                //递归
                newObj[prop] = deepCopy(obj[prop]);
            } else {
                newObj[prop] = obj[prop];
            }
        }
    }
    return newObj;
}

/**
 * 删除URL上的指定参数
 * @param {*} url
 * @param {*} paramName
 */
export const deleteUrlParam = function (url, paramName) {
    //处理url 兼容 http://XXX/***.html#page1模式的url的处理
    let url_prefix = "";
    let uArr = url.split('#');
    if (uArr.length > 1 && uArr[1].length > 1) {
        url_prefix = uArr[0] + "#";
        url = url.substr(url.indexOf('#') + 1);
    }
    let str = "";
    if (url.indexOf('?') != -1)
        str = url.substr(url.indexOf('?') + 1);
    else
        return url_prefix + url;
    let arr = "";
    let returnurl = "";
    if (str.indexOf('&') != -1) {
        arr = str.split('&');
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].split('=')[0] != paramName) {
                returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
            }
        }
        return url_prefix + url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
    } else {
        arr = str.split('=');
        if (arr[0] == paramName)
            return url_prefix + url.substr(0, url.indexOf('?'));
        else
            return url_prefix + url;
    }
};


/**
 * 生成uuid
 * @param len 长度
 * @param radix 基数
 * @returns {string}
 */
export const geneUUID = function (len, radix) {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let uuid = [],
        i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        let r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data. At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
};

export const getFullImgUrl = function (uri) {
    if (uri.indexOf('http://') > -1 || uri.indexOf('https://') > -1) {
        return uri;
    } else if (uri.indexOf('static/') > -1) {
        return config.mobileUrl + uri;
    } else {
        return config.imgUrl + uri;
    }
}

/**
 * 
 * @param { 遍历的对象 } list 
 * @param { 传入的code索引名称，是name或者是code } key 
 * @param { 返回传入的参数，根据这个参数返回key的值 } code 
 * @return getData('zw','code','02')  return '财务负责人'
 * 
 */
export const getdata = function (list, key, code) {
    if (list) {
        var tempobj = list;
        if (key == 'name') {
            for (var i = 0; i < tempobj.length; i++) {
                if (tempobj[i].name == code) {
                    return tempobj[i].code
                }
            }
        } else if (key == 'code') {
            for (var i = 0; i < tempobj.length; i++) {
                if (tempobj[i].code == code) {
                    return tempobj[i].name
                }
            }

        } else {
            return ""
        }

    } else {
        return ""
    }
}

export const blurAdjust = function () {
    setTimeout(() => {
        // alert("1231321233")
        if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
            return
        }
        let result = 'pc';
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
            result = 'ios'
        } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
            result = 'android'
        }

        if (result = 'ios') {
            document.activeElement.scrollIntoViewIfNeeded(true);
        }
    }, 100)
}
