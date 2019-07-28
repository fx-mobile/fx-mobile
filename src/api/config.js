import Qs from 'qs'

//  baseURL 请求后台网关地址  wxUrl 微信http://url   trackUrl 埋点js地址
export default (() => {
    let config
    let nodeEnv = process.env.NODE_ENV
    console.log('nodeEnv', nodeEnv)
    console.log('window.location ', window.location)
    if (nodeEnv === 'test') {
        config = {
            baseURL: window.location.origin,
            mobileUrl: window.location.origin,
            wxUrl: '',
            trackUrl: '',
            cmsImgvUrl: '',
            imgUrl: '',
            cdnUrl: '',
            fileUploadUrl: '',
            showVConsole: true
        }
    } else if (nodeEnv === 'dev') {
        config = {
            baseURL: window.location.origin,
            wxUrl: window.location.origin,
            trackUrl: '',
            cmsImgvUrl: '',
            imgUrl: '',
            cdnUrl: '',
            fileUploadUrl: window.location.origin,
            showVConsole: true
        }
    } else if (nodeEnv === 'preproduction') {
        config = {
            baseURL: window.location.origin,
            wxUrl: '',
            trackUrl: '',
            cmsImgvUrl: '',
            imgUrl: '',
            cdnUrl: '',
            fileUploadUrl: '',
            showVConsole: false
        }
    } else if (nodeEnv === 'production') {
        config = {
            baseURL: window.location.origin,
            mobileUrl: window.location.origin,
            wxUrl: '',
            trackUrl: '',
            cmsImgvUrl: '',
            imgUrl: window.location.origin + '/appres',
            cdnUrl: '',
            fileUploadUrl: '',
            showVConsole: false
        }
    } else {
        // npm run dev模式
        config = {
            baseURL: window.location.origin,
            mobileUrl: '',
            wxUrl: '',
            trackUrl: '',
            cmsImgvUrl: '',
            imgUrl: '',
            cdnUrl: '',
            fileUploadUrl: window.location.origin,
            showVConsole: false,
        }
    }
    config = {
        ...config,
        //添加通用配置
        url: '/route',
        appId: '000111', //微信企业主端调用接口配置
        gateway: '',//定义默认网关名
        method: 'POST',
        transformResponse: function (data) {
            return data
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        params: {},
        paramsSerializer: function (params) {
            return Qs.stringify(params)
        },
        data: {},
        timeout: 30000,
        withCredentials: false, // default
        responseType: 'json', // default
        onUploadProgress: function (progressEvent) {
            // Do whatever you want with the native progress event
        },
        onDownloadProgress: function (progressEvent) {
            // Do whatever you want with the native progress event
        },
        maxContentLength: 3000,
        validateStatus: function (status) {
            return status >= 200 && status < 300 // default
        },
        maxRedirects: 5, // default
    }
    return config
})()