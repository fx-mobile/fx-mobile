<template>
    <div class="login-main">
        <v-wx-header show showLeft></v-wx-header>
        <div class="login-head-img">
            <img src="@/assets/img/common/default-logo.png" alt />
        </div>
        <div v-show="!isSl">
            <v-input-cell placeholder="请输入11位手机号码" valuetype="number" v-model="form.phoneNum"></v-input-cell>
            <v-check-code-cell codeType="001" :phoneNum="form.phoneNum" v-model="form.phoneCaptcha"></v-check-code-cell>
            <v-button @click.native="login" title="登录"></v-button>
        </div>
        <div v-show="isSl">
            <v-input-cell placeholder="请输入身份证号码" v-model="form.certNo"></v-input-cell>
            <v-input-cell placeholder="请输入姓名" v-model="form.certName"></v-input-cell>
            <v-button @click.native="smLogin" title="扫脸登录"></v-button>
        </div>
        <div class="login-type-change">
            <span @click="changeType">切换{{typeName}}登录方式</span>
        </div>
        <!--<div class="login-type-change">
            <span @click="toRegister">注册</span>
        </div>-->
    </div>
</template>

<script>
import { customAsync } from "@/api/async";
import { getUserInfo } from "@/assets/js/common";
import sessionStorageUtil from "@/utils/sessionStorageUtil";
import rlsbInit from "@/utils/rlsbInit";
import localStorageUtil from "@/utils/localStorageUtil";
import { MessageBox, Indicator, Toast } from "fx-mui";
import { validation } from "@/utils/validation";

export default {
    data() {
        return {
            form: {
                phoneNum: "",
                phoneCaptcha: "",
                certNo: "",
                certName: ""
            },
            isSl: false,
            typeName: '刷脸'
        };
    },
    created() {
        if (process.env.NODE_ENV == "development") {
            this.form.phoneNum = "13800138000";
            this.form.phoneCaptcha = "1234";
        }
        //自动带出手机号，身份证信息
//      if (localStorageUtil.getItem(localStorageUtil.USER_LOGIN_INFO)) {
//          let userInfo = localStorageUtil.getItem(
//              localStorageUtil.USER_LOGIN_INFO
//          );
//          this.form.certNo = userInfo.zrr.zjhm;
//          this.form.certName = userInfo.zrr.xm;
//          this.form.phoneNum = userInfo.zrr.sjhm;
//      }
    },
    methods: {
        login() {
            let formCheck = validation([
                {
                    required: true,
                    nullMsg: "请输入手机号码",
                    type: "mobilePhone",
                    value: this.form.phoneNum
                },
                {
                    required: true,
                    nullMsg: "请输入验证码",
                    value: this.form.phoneCaptcha
                }
            ]);
            if (!formCheck) {
                return;
            }
            let params = {
                phoneNum: this.form.phoneNum,
                phoneCaptcha: this.form.phoneCaptcha
            };
            let redirect_url = this.$route.query.redirect_url;
            console.log("redirect_url", redirect_url);
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
                        if (!res.data.zrr || !res.data.zrr.xm) {
                            MessageBox.confirm("您还未实名验证，是否立即验证?")
                                .then(action => {
                                    if (action == "confirm") {
                                        this.$router.push(
                                            "/entry/user/form?phoneNum=" +
                                                this.form.phoneNum
                                        );
                                    }
                                })
                                .catch(() => {
                                    this.$router.push("/entry/home");
                                });
                            return;
                        }
                        if (redirect_url) {
                            this.$router.replace(redirect_url);
                        } else {
                            this.$router.replace("/entry/home");
                        }
                    });
                },
                errorCallback: res => {
                    if (res.errorcode == 1024) {
                        MessageBox.confirm(
                            "用户未注册，是否立即注册?"
                        )
                            .then(action => {
                                if (action == "confirm") {
                                    this.$router.push(
                                        "/entry/user/form?phoneNum=" +
                                            this.form.phoneNum
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
            let formCheck = validation([
                {
                    required: true,
                    nullMsg: "请输入身份证号码",
                    value: this.form.certNo
                },
                {
                    required: true,
                    nullMsg: "请输入姓名",
                    value: this.form.certName
                }
            ]);
            if (!formCheck) {
                return;
            }

            rlsbInit(
                {
                    certNo: this.form.certNo,
                    certName: this.form.certName,
                    action: "login"
                },
                this
            );
        },
        changeType() {
        	if(this.isSl) {
            this.typeName = '刷脸'      	
            } else {
            this.typeName = '手机'      	
            }
            this.isSl = !this.isSl;
        },
        toRegister() {
            this.$router.push('/entry/user/form')
        }
    }
};
</script>

<style scoped lang="scss">
.login-main {
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
