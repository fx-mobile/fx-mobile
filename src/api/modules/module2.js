import config from "../config";
var devName = ''
export default {
    queryAllArea: {
        uri: config.cdnUrl + devName + '/weChatMall/json/areaJson/queryAllArea.json?token=1',
        method: 'get',
        cache: true
    },
    //2.11.修改消息阅读状态
    getMyMsg: {
        uri: '/v1/user/getMyMsg'
    }
}