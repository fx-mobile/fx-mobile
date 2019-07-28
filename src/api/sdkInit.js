import getPlatformType from '@/utils/getPlatformType'
(function () { // (function(){})是一个闭包的用法，闭包必定会被调用。
  let type = getPlatformType();
  console.log('type', type)
  let src;
  // 获取平台类型(01android，02ios，03微信,04支付宝)
  if (type == '03') {
    src = "http://res.wx.qq.com/open/js/jweixin-1.2.0.js"
  } else if (type == '04') {
    src = "https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.inc.min.js"
  } else { };
  if (process.env.NODE_ENV == 'development') {
    src = "http://res.wx.qq.com/open/js/jweixin-1.2.0.js"
  }
  console.log('SDK地址：', src)
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.charset = 'utf-8';
  ga.async = true // ga.async = true 异步调用外部js文件，即不阻塞浏览器的解析
  ga.src = src
  var s = document.getElementsByTagName('script')[0];// 取得第一个tag名为script的元素
  s.parentNode.insertBefore(ga, s);// 在s前添加元素ga
})()
