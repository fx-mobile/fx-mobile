import config from "../config";
var devName = ''
export default {
    test: {
        uri: config.cdnUrl + devName + '/weChatMall/json/areaJson/queryAllArea.json?token=1',
        method: 'get',
        cache: true
    }, 
    login:{uri:'/v1/user/login'},
    getUserInfo: { uri: 'https://www.easy-mock.com/mock/58ff650c739ac1685205a1a7/foresee/v1/user/getUserInfo' },
    getNsrInfo: { uri : '/v1/user/getNsrInfo'},
    getMyTodo: { uri: 'https://www.easy-mock.com/mock/58ff650c739ac1685205a1a7/foresee/v1/user/getMyTodo'}
}