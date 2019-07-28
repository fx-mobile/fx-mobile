import axios from 'axios'
import config from './config'

const devName = ''
const wechat = 'wechat'
const wechatAuth = 'wechatAuth'
const wxUrl = config.wxUrl
const wxAppId = config.wxAppId
const appId = config.appId
const cmsAppId = '000111'

import localStorageUtil from '@/utils/localStorageUtil'
/*if (process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'test' ||
    process.env.NODE_ENV === 'preproduction' ||
    process.env.NODE_ENV === 'dev' ||
    process.env.NODE_ENV === 'local') {} else {
localStorageUtil.setItem(localStorageUtil.WX_USER_TOKEN, '3a7c4fc047054e808c6470f38784066010002002da26409acbd09f36')    
}*/
var guidGenerator = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
var getUUID = function () {
    return (guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator())
}

// 读取api列表
import api from './modules'

export default {

    getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2]);
        return null
    },
    getQueryStringEx(name) {
        let key, value;
        let str = window.location.href; //取得整个地址栏
        let num = str.indexOf("?");
        str = str.substr(num + 1); //取得所有参数
        let arr = str.split("&"); //各个参数放到数组里
        for (let i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                key = arr[i].substring(0, num);
                if (key == name) {
                    value = arr[i].substr(num + 1);
                    // break; 如果地址里面有多个一样的参数  取最后一个的值lee
                }
            }
        }
        return value;
    },

    getCache(cacheName) {
        let key = cacheName
        if (sessionStorage.getItem(key)) {
            let res = JSON.parse(sessionStorage.getItem(key))
            return res
        }
        return false
    },
    upload(formData) {
        var method = '/v1/user/upload?requestId=' + getUUID() + '&appId=' + appId + '&token=' + localStorageUtil.getItem(localStorageUtil.WX_USER_TOKEN)
        const upload_config = {
            // headers: {
            //   'Content-Type': 'multipart/form-data'
            // }
        };
        return axios.post(method, formData, upload_config);
    },
    //生产对应url参数的axios请求函数
    factoryFunction(item) {
        let _appId = item.appId || appId;
        let develop = item.develop ? 'develop' : 'normal';
        let method = item.method ? item.method : 'post';
        let gateway = item.gateway ? item.gateway : config.gateway;
        let uri;
        let _config = item.config || {};
        if (process.env.NODE_ENV !== 'development') {
            develop = 'normal';
        }
        const urlParam = {
            normal: 'requestId=' + getUUID(),
            develop: 'requestId=' + getUUID() + '&develop=' + item.develop,
        }
        if (item.uri.indexOf('http://') == -1 && item.uri.indexOf('https://') == -1) {
            uri = '/' + gateway + item.uri;
        }
        if (item.uri.indexOf('?') > -1) {
            uri = item.uri + '&' + urlParam[develop];
        } else {
            uri = item.uri + '?' + urlParam[develop];
        }
        // if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
        //     uri = uri + '&FxAppId=890c82c7711347d78985957e8602b706'
        // }
        if (item.instance) {
            let instance = axios.create({
                ...item.instance
            })
            return payload => instance[method](uri, config.paramsSerializer(payload));
        } else {

            let asConfig = JSON.parse(JSON.stringify(config));
            Object.assign(asConfig, _config);
            if (method == 'get') {
                return payload => {
                    if (payload) {
                        return axios[method](uri + '&' + config.paramsSerializer(payload), {}, asConfig);
                    } else {
                        return axios[method](uri, {}, asConfig);
                    }
                }
            } else {
                return payload => axios[method](uri, config.paramsSerializer(payload), asConfig);
            }
        }
    },
    commonApiFactory(data, method) {
        let assembledApiList = {};
        let item = api[method];
        if (!item) {
            throw Error(`api列表中未定义[${method}]`);
        }
        let cacheName = item.cacheName || process.env.NODE_ENV + '.' + method;
        if (item.defaultData) {
            Object.assign(data, defaultData);
        }
        if (item.cache) {
            data.__CACHE__ = true;
            data.__CACHENAME__ = cacheName;
            let res = this.getCache(cacheName);
            if (res) return res;
        }
        if (item.notShowLoading) {
            data.__NOTSHOWLOADING__ = true;
        }
        assembledApiList[method] = this.factoryFunction(item);

        return assembledApiList[method](data)
    }



}