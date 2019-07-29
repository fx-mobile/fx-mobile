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
        uri: 'https://www.easy-mock.com/mock/58ff650c739ac1685205a1a7/foresee/v1/user/getMyMsg'
    }
}