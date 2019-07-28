<template>
    <div class="pc-login-main">
        <v-wx-header show showLeft></v-wx-header>
        <div class="login-head-img">
            <img src="@/assets/img/common/default-logo.png" alt />
        </div>
        <div v-show="!isSl">
            <v-input-cell placeholder="请输入11位手机号码" valuetype="number" v-model="phoneNum"></v-input-cell>
            <v-check-code-cell codeType="001" :phoneNum="phoneNum" v-model="phoneCaptcha"></v-check-code-cell>
            <v-button @click.native="login" title="登录"></v-button>
        </div>
        <div v-show="isSl">
            <v-input-cell placeholder="请输入身份证号码" v-model="certNo"></v-input-cell>
            <v-input-cell placeholder="请输入姓名" v-model="certName"></v-input-cell>
            <v-button @click.native="smLogin" title="扫脸登录"></v-button>
        </div>
        <div class="login-type-change">
            <span @click="changeType">切换{{typeName}}登录方式</span>
        </div>
    </div>
</template>

<script>
import { customAsync } from "@/api/async";
import rlsbInit from "@/utils/rlsbInit";
import sessionStorageUtil from "@/utils/sessionStorageUtil";
import { getUserInfo } from "@/assets/js/common";
import { MessageBox, Toast } from "fx-mui";
import localStorageUtil from "@/utils/localStorageUtil";
import routerBack from "@/router/routerBack";
import { validation } from "@/utils/validation";
export default {
    data() {
        return {
            certNo: "",
            certName: "",
            state: "",
            info: {},
            keyInfo: {},
            phoneNum: "",
            phoneCaptcha: "",
            isSl: true,
            typeName: '手机'
        };
    },
    created() {
        this.info = sessionStorageUtil.getItem(
            sessionStorageUtil.USER_LOGIN_INFO
        );
        this.getLoginKeyInfo();
        if (!this.info) {
//          if (localStorageUtil.getItem(localStorageUtil.USER_LOGIN_INFO)) {
//              let userInfo = localStorageUtil.getItem(
//                  localStorageUtil.USER_LOGIN_INFO
//              );
//              console.log("userInfo", userInfo);
//              this.phoneNum = userInfo.zrr.sjhm;
//              this.certNo = userInfo.zrr.zjhm;
//              this.certName = userInfo.zrr.xm;
//          }
            return;
        }
        this.phoneNum = this.info.zrr.sjhm;
        this.certNo = this.info.zrr.zjhm;
        this.certName = this.info.zrr.xm;
    },
    methods: {
        login() {
            let formCheck = validation([
                {
                    required: true,
                    nullMsg: "请输入手机号码",
                    type: "mobilePhone",
                    value: this.phoneNum
                },
                {
                    required: true,
                    nullMsg: "请输入验证码",
                    value: this.phoneCaptcha
                }
            ]);
            if (!formCheck) {
                return;
            }
            let params = {
                phoneNum: this.phoneNum,
                phoneCaptcha: this.phoneCaptcha
            };
            customAsync({
                that: this,
                method: "login",
                paramObj: params,
                callback: res => {
                    sessionStorageUtil.setItem(
                        sessionStorageUtil.USER_LOGIN_STATUS,
                        true
                    );
                    getUserInfo(this, null, false).then(res => {
                        this.state = "p";
                        this.setLoginKeyInfo();
                    });
                },
                errorCallback: res => {
                    if (res.errorcode == 1024) {
                        MessageBox.confirm(
                            "用户未注册，是否立即通过实名验证进行注册?"
                        )
                            .then(action => {
                                if (action == "confirm") {
                                    this.$router.push(
                                        "/entry/user/form?phoneNum=" +
                                            this.phoneNum
                                    );
                                }
                            })
                            .catch(() => {});
                    } else {
                        Toast(res.errormsg);
                    }
                },
                errorMsg: ""
            });
        },
        smLogin() {
            if (!this.certNo) {
                Toast("请输入身份证");
                return;
            }
            if (!this.certName) {
                Toast("请输入姓名");
                return;
            }
            this.state = "p";
            rlsbInit(
                {
                    certNo: this.certNo,
                    certName: this.certName,
                    action: "smrz",
                    pcLoginCallback: this.setLoginKeyInfo
                },
                this
            );
        },
        back() {
            this.state = "r";
            this.setLoginKeyInfo();
        },
        getLoginKeyInfo() {
            let params = {
                key: this.$route.query.key
            };
            customAsync({
                that: this,
                method: "getLoginKeyInfo",
                paramObj: params,
                callback: res => {
                    this.keyInfo = res.data;
                    if (res.data.state == "c") {
                        this.state = "s";
                        this.setLoginKeyInfo();
                    }
                }
            });
        },
        setLoginKeyInfo() {
            let params = {
                key: this.$route.query.key,
                state: this.state
            };
            customAsync({
                that: this,
                method: "setLoginKeyInfo",
                paramObj: params,
                callback: res => {
                    if (this.state == "p") {
                        if (
                            (this.keyInfo.nsrsbh || this.keyInfo.shxydm) &&
                            !this.info
                        ) {
                            getUserInfo(this, null, false).then(res => {
                                this.info = sessionStorageUtil.getItem(
                                    sessionStorageUtil.USER_LOGIN_INFO
                                );
                                if (
                                    !this.checkNsr(
                                        this.keyInfo.nsrsbh,
                                        this.keyInfo.shxydm
                                    )
                                ) {
                                    this.getUserNsrdjxx();
                                } else {
                                    routerBack(this);
                                }
                            });
                        } else if (
                            !this.checkNsr(
                                this.keyInfo.nsrsbh,
                                this.keyInfo.shxydm
                            )
                        ) {
                            this.getUserNsrdjxx();
                        } else {
                            routerBack(this);
                        }
                    } else if (this.state == "r") {
                        routerBack(this);
                    }
                }
            });
        },
        checkNsr(n, s) {
            let nsrs = this.info ? this.info.nsrs : [];
            if (n && s) {
                for (let item of nsrs) {
                    if (
                        n == (item.gsnsrsbh || item.dsnsrsbh) &&
                        s == item.shxydm
                    ) {
                        return true;
                    }
                }
            } else if (n) {
                for (let item of nsrs) {
                    if (n == (item.gsnsrsbh || item.dsnsrsbh)) {
                        return true;
                    }
                }
            } else if (s) {
                for (let item of nsrs) {
                    if (s == item.shxydm) {
                        return true;
                    }
                }
            } else {
                return true;
            }
            return false;
        },
        //登记信息
        getUserNsrdjxx() {
            let self = this;
            let params = {};
            customAsync({
                that: self,
                method: "getUserNsrdjxx",
                paramObj: {},
                callback: function(res) {
                    if (res.data.nsrs.length > 0) {
                        MessageBox({
                            message: "您有可绑定的企业，是否立即进行绑定?",
                            closeOnClickModal: false,
                            showCancelButton: true
                        })
                            .then(action => {
                                console.log("action", action);
                                if (action == "confirm") {
                                    this.$router.push({
                                        path: "/entry/user/bindinfo",
                                        query: {
                                            nsrs: JSON.stringify(res.data.nsrs)
                                        }
                                    });
                                }
                            })
                            .catch(() => {
                                routerBack(this);
                            });
                    }
                }
            });
        },
        changeType() {
        	if(this.isSl) {
            this.typeName = '刷脸'      	
            } else {
            this.typeName = '手机'      	
            }
            this.isSl = !this.isSl;
        }
    }
};
</script>

<style lang="scss" socped>
.pc-login-main {
    height: 100%;
    background-color: #fff;
    padding-top: $px77;
    .login-head-img {
        width: $px180;
        height: $px180;
        border-radius: 50%;
        margin: 0 auto $px50;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .login-type-change {
        margin-top: $px12;
        text-align: center;
        span {
            color: #108bf7;
            font-size: $px32;
        }
    }
}
</style>
