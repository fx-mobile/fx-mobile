import getPlatformType from '@/utils/getPlatformType'
export default self => {
    let type = getPlatformType();
    if (self.$store.state.route.from.fullPath == '/') {
        try {
            console.log('enter close');
            if (type == '03') {
                WeixinJSBridge.call("closeWindow");
            } else if (type == '04') {
                AlipayJSBridge.call('exitApp');
            } else {
                self.$router.go(-1)
            }
        } catch (e) {
            console.log("WeixinJSBridge || AlipayJSBridge    undefined");
            try {
                if (type == '03') {
                    parent.WeixinJSBridge.call("closeWindow");
                } else if (type == '04') {
                    parent.AlipayJSBridge.call('exitApp');
                } else {
                    self.$router.go(-1)
                }
            } catch (e) {
                console.log("parent.WeixinJSBridge || parent.AlipayJSBridge  undefined");
            }
        }
    } else {
        self.$router.go(-1)
    }
}