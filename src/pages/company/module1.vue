<template>
  <div>
    <v-wx-header title="企业" show showLeft></v-wx-header>
    <v-form-title title="企业信息"></v-form-title>
    <v-input-cell
      title="纳税人识别号 /<br>社会信用代码"
      placeholder="请输入纳税人识别号或社会信用代码"
      celltype="textarea"
      v-model="nsrsbh"
    ></v-input-cell>
    <v-check-code-cell title="验证码" placeholder="请输入验证码" checkType="img" v-model="code"></v-check-code-cell>
    <v-form-attention title="温馨提示:请输入企业的纳税人识别号或者统一社会信用代码进行验证。"></v-form-attention>
    <v-button title="下一步" @btnclick="getNsrInfo"></v-button>
  </div>
</template>

<script>
import sessionStorageUtil from "@/utils/sessionStorageUtil";
import { getUserInfo } from "@/assets/js/common";
import { customAsync } from "@/api/async";
import { Toast } from "fx-mui";
export default {
  data() {
    return {
      nsrsbh: "", //91621125MA747BPR1T
      code: ""
    };
  },

  created() {},

  mounted() {},

  watch: {},

  methods: {
    //查询
    getNsrInfo() {
      if (this.nsrsbh == "") {
        Toast("请输入纳税人识别号或社会信用代码");
        return;
      }
      if (this.code == "") {
        Toast("请输入验证码");
        return;
      }
      let self = this;
      let params = {
        shxydm: self.nsrsbh,
        yzm: self.code
      };
      customAsync({
        that: self,
        method: "getNsrInfo",
        paramObj: params,
        callback: function(res) {
          self.$router.push(
            "/entry/company/binding2?nsrinfo=" +
              JSON.stringify(res.data.nsrinfo)
          );
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

