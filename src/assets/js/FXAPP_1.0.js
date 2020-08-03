/**
 * @author Tim 提供js接口供html界面调用app原生功能
 */
import { Toast } from "fx-mui";
export default function () {
	'use strict';
	var FXAPP = function (opts) {
		//预留可配置能力
	};
	FXAPP.prototype = {
		// 以下参数用于回调页面使用
		Queue: [],
		onSuccess: function (id, d) {
			try {
				top.FXAPP.Queue[id].callback(d);
			} catch (e) {
			}
		},
		onError: function (id, d) {
			try {
				top.FXAPP.Queue[id].errorCallback(d);
			} catch (e) {
			}
		},
		/**
		 * 增加任务以便回调使用
		 * @param success
		 * @param fail
		 * @returns 任务序号
		 */
		addTask: function (success, fail) {
			var task = {
				id: this.Queue.length,
				callback: success,
				errorCallback: fail
			};
			top.FXAPP.Queue.push(task);
			return task.id;
		},
		// 以下方法为调用原生功能的统一入口
		postMessageToApp: function (method, params, success, fail) {
			params = params == undefined ? {} : params;
			params["method"] = method;
			params["taskId"] = this.addTask(success, fail);
			if (window.app && window.app.postMessage) {
				window.app.postMessage(JSON.stringify(params));
			} else {
				Toast("请在APP上使用该功能！");
				fail && fail();
			}
		},
		//ios环境下调用
		initIosContext: function () {
			window.app = {};
			app.params = {};
			app.method = {};
			app.postMessage = function (params) {
				var paramsJson = eval("(" + params + ")");
				var key = "key" + paramsJson.taskId;
				app.params[key] = params;
				app.method[key] = paramsJson.method;
				var iframe = document.createElement("IFRAME");
				iframe.setAttribute("src", "fx-mobile://callNative?key=" + key);
				document.documentElement.appendChild(iframe);
				iframe.parentNode.removeChild(iframe);
				iframe = null;
			};
		},
		//判断当前浏览器是否是app定制浏览器
		isApp: function () {
			return typeof (window.app) != "undefined";
		},
		//原生提供的功能声明开始
		//post请求，发请求之前应注意浏览器cookie的同步
		//post : function(params, success, fail){
		//	this.postMessageToApp("post", params, success, fail);
		//},
		//get请求，发请求之前应注意浏览器cookie的同步
		//get : function(params, success, fail){
		//	this.postMessageToApp("get", params, success, fail);
		//},
		/**
		 * 原生接口：返回
		 */
		back: function () {
			this.postMessageToApp("back");
		},
		/**
		 * 原生接口：退出APP
		 */
		quit: function () {
			this.postMessageToApp("quit");
		},
		/**
		 * 原生接口：进入首页
		 */
		enter: function () {
			this.postMessageToApp("enter");
		},
		/**
		 * 原生接口：语音识别
		 * @param obj 对象或id
		 */
		voiceRecognition: function (params, success, fail) {
			this.postMessageToApp("voiceRecognition", params, success, fail);
		},
		/**
		 * 原生接口：扫描二维码
		 * @param callback 扫描成功后回调
		 */
		scanQRCode: function (params, success, fail) {
			this.postMessageToApp("scanQRCode", params, success, fail);
		},
		/**
		 * 原生接口：检查相机权限
		 * 
		 */
		CameraAuthority: function (params, success, fail) {
			this.postMessageToApp("CameraAuthority", params, success, fail);
		},
		/**
		 * 原生接口：下载，调用手机系统系统
		 * @param url
		 */
		downloadFile: function (params, success, fail) {
			this.postMessageToApp("downloadFile", params, success, fail);
		},
		/**
		 * 原生接口：下载，下载文件到指定目录，
		 * @param url
		 */
		downloadFileToLocal: function (params, success, fail) {
			this.postMessageToApp("downloadFileToLocal", params, success, fail);
		},
		/**
		 * 原生接口
		 * 查看文件是否存在 
		 * @param localPath 文件路径含文件名
		 */
		fileIsExists: function (params, success, fail) {
			this.postMessageToApp("fileIsExists", params, success, fail);
		},
		/**
		 * 原生接口
		 * 调用系统工具打开文件
		 * @param localPath 文件路径含文件名
		 */
		openFile: function (params, success, fail) {
			this.postMessageToApp("openFile", params, success, fail);
		},
		/**
		 * 原生接口 
		 * 修改屏幕方向 (横屏<->竖屏)
		 * 
		 */
		ConvertScreenDirection: function (params, success, fail) {
			this.postMessageToApp("ConvertScreenDirection", params, success, fail);
		},
		/**
		 * 原生接口 
		 * 竖屏显示
		 * 
		 */
		setScreenPortrait: function (params, success, fail) {
			this.postMessageToApp("setScreenPortrait", { url: window.location.href }, success, fail);
		},
		/**
		 * 原生接口 
		 * 横屏显示
		 * 
		 */
		setScreenLandscape: function (params, success, fail) {
			this.postMessageToApp("setScreenLandscape", { url: window.location.href }, success, fail);
		},
		/**
		 * 原生接口 
		 * 获取当前屏幕方向
		 * 返回结果 {Direction:'Landscape/Portrait'} Portrait:竖屏; Landscape:横屏
		 */
		getScreenDirection: function (params, success, fail) {
			this.postMessageToApp("getScreenDirection", {}, success, fail);
		},
		/**
		 * 获取位置信息
		 * 返回结果{}
		 */
		getLocation: function (success, fail) {
			this.postMessageToApp("getLocation", {}, success, fail);
		},
		getCacheSize: function (success, fail) {
			this.postMessageToApp("getCacheSize", {}, success, fail);
		},
		clearCache: function (success, fail) {
			this.postMessageToApp("clearCache", {}, success, fail);
		},
		getVersion: function (success, fail) {
			this.postMessageToApp("getVersion", {}, success, fail);
		},
		checkUpdate: function (success, fail) {
			this.postMessageToApp("checkUpdate", {}, success, fail);
		},
		startBaiduMap: function (params) {
			this.postMessageToApp("startBaiduMap", params);
		},
		startAMap: function (params) {
			this.postMessageToApp("startAMap", params);
		},
		/**
		 * 查看PDF
		 */
		viewPdf: function (params, success, fail) {
			this.postMessageToApp("viewPdf", params, success, fail);
		},		
		setAccountToApp: function (params, success, fail) {
			this.postMessageToApp("setAccountToApp", params, success, fail);
		},
		removeAccountToApp: function (params, success, fail) {
			this.postMessageToApp("removeAccountToApp", params, success, fail);
		},
		isSupportApplePay: function (params, success, fail) {
			this.postMessageToApp("isSupportApplePay", params, success, fail);
		},
		startApplePay: function (params, success, fail) {
			this.postMessageToApp("startApplePay", params, success, fail);
		},
		startPay: function (params, success, fail) {
			this.postMessageToApp("startPay", params, success, fail);
		},
		startWeChat: function (params, success, fail) {
			this.postMessageToApp("startWeChat", params, success, fail);
		}
		//原生提供的功能声明结束
	};
	window.FXAPP = new FXAPP();
}
