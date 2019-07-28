import config from "../config";
var devName = ''
export default {
    test: {
        uri: config.cdnUrl + devName + '/weChatMall/json/areaJson/queryAllArea.json?token=1',
        method: 'get',
        cache: true
    }, 
    login:{uri:'/v1/user/login'},
    getUserInfo: { uri: '/v1/user/getUserInfo' },
    getNsrInfo: { uri : '/v1/user/getNsrInfo'}
}