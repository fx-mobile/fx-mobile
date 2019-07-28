import { wxJsSdk } from "@/utils/wxJsSdkHelper";
import { customAsync } from "@/api/async";
import nav from "@/router/nav";
import getPlatformType from "@/utils/getPlatformType"
import { getUserInfo } from "@/assets/js/common";
import { MessageBox, Indicator, Toast } from "fx-mui";
import FXAPP from "@/assets/js/FXAPP_1.0";

import Vue from 'vue'

export default (option, self) => {
    console.log('option', option)

    Indicator.open({
        text: "加载人脸识别中...",
        spinnerType: "triple-bounce"
    });
    setTimeout(() => {
        Indicator.close();
    }, 4000)
    function successCallback(res) {
        if (option.action == 'login' || option.action == 'smrz') {
            if (option.pcLoginCallback) {
                option.pcLoginCallback(res);
            } else {
                getUserInfo(window, null, false).then(() => {
                    self.$router.push('/entry/home')
                })
            }
        } else {
            if (option.callback) {
                option.djCallback(res);
            }
            Toast("实名注册成功！");
            getUserInfo(window, null, false).then(() => {
                self.$router.push('/entry/user/success');
            })
        }
    }
    function errorCallback(res) {
        if (res.errorcode == 1024) {
            MessageBox({
                message: "您还未实名验证，是否立即验证?",
                closeOnClickModal: false,
                showCancelButton: true
            })
                .then(action => {
                    if (action == "confirm") {
                        self.$router.push("/entry/user/form?certNo=" + option.certNo + "&certName=" + option.certName);
                    }
                })
                .catch(() => {
                });
        } else {
            MessageBox.alert(res.errormsg).then(action => {
            });
        }
    }
    function gotoFaceVerify() {
        //根据浏览器类型决定如何调取人脸识别
        if (getPlatformType() == "03") { //微信渠道
            wxJsSdk.initWxConfig(checkFPVI);
        } else if (getPlatformType() == "04") { //支付宝渠道
            zmrzInit();
        } else if (getPlatformType() == "01" || getPlatformType() == "02") {
            checkAppSmrzResult();
        } else {
            Toast("请在微信、支付宝或者app上打开");
            setTimeout(() => {
                Indicator.close();
            },
                0)
        }
    }
    var checkFPVI = function () {
        let that = this;
        console.log('checkFPVI')
        wx.invoke("checkIsSupportFaceDetect", {}, function (res) {
            console.log(res.err_code);
            console.log(res.err_msg);
            if (res.err_code == 0) {
                //发起微信人脸识别
                wx.invoke(
                    "requestWxFacePictureVerify",
                    {
                        check_alive_type: "1",
                        request_verify_pre_info:
                            '{"name": "' +
                            option.certName +
                            '", "id_card_number": "' +
                            option.certNo +
                            '"}'
                    },
                    function (res) {
                        console.log(res.err_code);
                        console.log(res.err_msg);
                        Indicator.close();
                        if (res.err_code == 0) {
                            try {
                                var verify_result = res.verify_result;
                                if (verify_result) {
                                    checkVerifyResult(verify_result);
                                }
                            } catch (e) {
                                Toast("微信实名异常");
                            }
                        } else {
                            // Toast(res.err_msg);
                        }
                    }
                );
            } else {
                Indicator.close();
                Toast("发起人脸识别失败！" + res.err_msg);
            }
        });
    }
    var checkVerifyResult = function (verifyResult) {
        let param = {
            certName: option.certName,
            certNo: option.certNo,
            phoneNum: option.phoneNum,
            verifyResult: verifyResult,
            action: option.action,
            xb: option.xb,
            zjyxqz: option.zjyxqz,
            zjdz: option.zjdz,
            yzm: option.yzm
        };
        if (option.certType) {
            param.certType = option.certType
        }
        if (option.regionCode) {
            param.regionCode = option.regionCode
        }
        customAsync({
            that: window,
            method: "checkWxSmrzResult",
            paramObj: param,
            callback: res => {
                console.log('checkWxSmrzResult', res);
                successCallback(res);
            },
            errorCallback: res => {
                errorCallback(res);
            },
            errorMsg: '',
            loadingMsg: "校验中，请稍候..."
        });
    }
    var zmrzInit = function () {
        var returnUrl = window.location.href.split('#')[0];
        returnUrl = returnUrl + (returnUrl.indexOf("?") == -1 ? "?" : "&");
        var params = {
            certName: option.certName,
            certNo: option.certNo,
            callbackUrl: returnUrl
        };
        customAsync({
            that: window,
            method: "zmrzInit",
            paramObj: params,
            notShowLoading: true,
            callback: res => {
                console.log('res', res);
                nav(res.data.url)
            },
            loadingMsg: "请稍候..."
        });
    }

    var checkZmrzResult = function (verifyResult) {
        let param = {
            phoneNum: option.phoneNum,
            action: option.action,
            yzm: option.yzm
        };
        customAsync({
            that: window,
            method: "checkZmrzResult",
            paramObj: param,
            callback: res => {
                successCallback(res);
            },
            errorCallback: res => {
                errorCallback(res);
            },
            errorMsg: '',
            loadingMsg: "校验中，请稍候..."
        });
    }

    var checkAppSmrzResult = function () {
        function success(d) {
            if (d.flag == 'ok') {

                console.log('rlsb-data', d)
                let params = {
                    phoneNum: option.phoneNum,
                    yzm: option.yzm,
                    certNo: option.certNo,
                    certName: option.certName,
                    xb: option.xb,
                    zjyxqz: option.zjyxqz,
                    zjdz: option.zjdz,
                    key: d.key,
                    faceImgBase64: d.data,
                    action: option.action
                };
                if (option.certType) {
                    params.certType = option.certType
                }
                if (option.regionCode) {
                    params.regionCode = option.regionCode
                }
                customAsync({
                    that: this,
                    method: "checkAppSmrzResult",
                    paramObj: params,
                    callback: res => {
                        successCallback(res);
                    },
                    errorCallback: res => {
                        errorCallback(res);
                    },
                    errorMsg: '',
                    loadingMsg: "校验中，请稍候..."
                })
            } else {
                Toast('扫描姿势不正确，请重新扫描')
            }
        }
        function fail() {
            setTimeout(() => {
                Indicator.close();
            },
                0)
        }
        top.FXAPP.postMessageToApp('startAuth', { xm: option.certName, zjhm: option.certNo }, success, fail);
    }
    gotoFaceVerify();
}