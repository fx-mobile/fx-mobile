<template>
    <div class="smrz-form-wrapper">
        <v-wx-header show showLeft></v-wx-header>
        <v-form-title title="身份信息"></v-form-title>
        <v-input-cell isRequired title="姓名" placeholder="请输入真实姓名" v-model="form.certName"></v-input-cell>
        <v-input-cell-pick
            title="证件类型"
            isRequired
            placeholder="请选择对应证件类型"
            returnType="obj"
            @setzw="setzjlx"
            titleStyle="color: #333333;"
            :pickArr="pickArr"
            v-model="form.certType"
        ></v-input-cell-pick>
        <v-input-cell
            title="国籍"
            isRequired
            v-if="showRegion"
            ifreadonly
            :showGenduo="canSelect"
            placeholder="请选择国籍"
            :inputStyle="canSelect?'color:#333!important;':''"
            @click.native="toRegionSelector"
            v-model="regionName"
        ></v-input-cell>
        <v-input-cell title="证件号码" isRequired placeholder="请输入有效证件号码" v-model="form.certNo"></v-input-cell>
        <v-form-title title="补充信息"></v-form-title>
        <v-input-cell-pick
            title="性别"
            placeholder="请选择性别"
            returnType="obj"
            @setzw="setXb"
            titleStyle="color: #333333;"
            :pickArr="xbPickArr"
            v-model="form.xb"
        ></v-input-cell-pick>
        <v-input-cell-pick
            title="证件有效期止"
            titleStyle="color: #333333;"
            pickerType="date"
            @getValue="getDateValue"
            placeholder="请选择证件有效期止"
            v-model="form.zjyxqz"
        ></v-input-cell-pick>
        <v-input-cell title="证件地址" placeholder="请输入证件地址" v-model="form.zjdz"></v-input-cell>
        <v-form-title title="联系方式"></v-form-title>
        <v-input-cell
            title="手机号码"
            isRequired
            placeholder="请输入11位手机号码"
            valuetype="number"
            v-model="form.phoneNum"
        ></v-input-cell>
        <v-check-code-cell
            isRequired
            codetype="002"
            title="验证码"
            :phoneNum="form.phoneNum"
            v-model="form.yzm"
        ></v-check-code-cell>
        <v-normalBtn class="smrz-form-button" @click="smdjWithSwzjSjhm">下一步</v-normalBtn>
    </div>
</template>

<script>
import { validation } from "@/utils/validation";
import { sfz } from "@/assets/json/ndmb.json";
import { customAsync } from "@/api/async";
import { getUserInfo } from "@/assets/js/common";
import { Toast } from "fx-mui";
import Vue from "vue";

export default {
    data() {
        return {
            form: {
                certName: "",
                certNo: "",
                phoneNum: "",
                yzm: "",
                certType: "",
                regionCode: "",
                zjdz: "",
                zjyxqz: "",
                xb: ""
            },
            pickArr: sfz,
            xbPickArr: [{ name: "男", code: "0" }, { name: "女", code: "1" }],
            regionName: "",
            showRegion: true,
            canSelect: true,
            popupVisible: ""
        };
    },
    created() {
        if (this.$route.query.phoneNum) {
            this.form.phoneNum = this.$route.query.phoneNum;
        }
        if (this.$route.query.certNo) {
            this.form.certNo = this.$route.query.certNo;
            this.form.certType = "201";
            this.regionName = "中国";
            this.form.regionCode = "156";
            this.canSelect = false;
        }
        if (this.$route.query.certName) {
            this.form.certName = this.$route.query.certName;
        }
    },
    activated() {
        let region = sessionStorage.getItem("current_select_gj");
        if (region) {
            region = JSON.parse(region);
            this.regionName = region.name;
            this.form.regionCode = region.code;
            this.showRegion = false;
            this.$nextTick(() => {
                this.showRegion = true;
            });
        }
    },
    methods: {
        toVerify() {
            this.$router.push({
                path: "/entry/smrz/verify",
                query: this.form
            });
        },
        setzjlx(e) {
            console.log("e13", e);
            this.form.certType = e.code;
            if (e.code == "201" || e.code == "299") {
                //居民身份证&临时身份证
                this.regionName = "中国";
                this.form.regionCode = "156";
                this.canSelect = false;
            } else if (e.code == "210") {
                //港澳居民来往内地通行证
                this.regionName = "";
                this.form.regionCode = "";
                this.canSelect = true;
            } else if (e.code == "213") {
                //台湾居民来往大陆通行证
                this.canSelect = false;
                this.regionName = "中国台湾";
                this.form.regionCode = "158";
            } else if (e.code == "208" || e.code == "233") {
                //外国公民护照&外国人长久居留证
                this.regionName = "";
                this.form.regionCode = "";
                this.canSelect = true;
            }
            sessionStorage.removeItem("current_select_gj");
            this.showRegion = false;
            this.$nextTick(() => {
                this.showRegion = true;
            });
        },
        toRegionSelector() {
            if (this.form.certType == "210") {
                this.$router.push("/entry/regionSelector?type=ga");
            } else if (
                this.form.certType == "208" ||
                this.form.certType == "233"
            ) {
                this.$router.push("/entry/regionSelector");
            } else if (!this.form.certType) {
                Toast("请先选择证件类型");
            }
        },
        smdjWithSwzjSjhm() {
            let formCheck = validation([
                {
                    required: true,
                    nullMsg: "请输入真实姓名",
                    value: this.form.certName
                },
                {
                    required: true,
                    nullMsg: "请输入证件类型",
                    value: this.form.certType
                },
                {
                    required: true,
                    nullMsg: "请输入国籍",
                    value: this.form.regionCode
                },
                {
                    required: true,
                    nullMsg: "请输入有效证件号码",
                    value: this.form.certNo
                },
                {
                    required: true,
                    nullMsg: "请输入手机号码",
                    type: "mobilePhone",
                    value: this.form.phoneNum
                },
                {
                    required: true,
                    nullMsg: "请输入验证码",
                    value: this.form.yzm
                }
            ]);
            if (!formCheck) {
                return;
            }
            if (this.form.certType == "201" || this.form.certType == "299") {
                this.toVerify();
                return;
            }
            this.form.phoneCaptcha = this.form.yzm;
            let that = this;
            customAsync({
                that: this,
                method: "smdjWithSwzjSjhm",
                paramObj: this.form,
                callback: function(res) {
                    getUserInfo(that, null, false).then(res => {
                        that.$router.push("/entry/smrz/success");
                    });
                }
            });
        },
        setXb(val) {
            this.form.xb = val.code;
        },
        getDateValue(val) {
            this.form.zjyxqz = val;
            console.log("valss1123", this.form);
        }
    }
};
</script>

<style scoped lang="scss">
.smrz-form-button {
    width: $px710;
    display: block;
    height: $px88;
    border-radius: $px10;
    margin: $px40 auto;
}
</style>
