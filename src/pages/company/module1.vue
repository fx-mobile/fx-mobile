<template>
  <div>
    <v-wx-header title="登录" show showLeft></v-wx-header>
    <v-input-cell
      title="手机号"
      placeholder="请输入"
      celltype="textarea"
      v-model="nsrsbh"
    ></v-input-cell>
    <v-check-code-cell title="验证码" placeholder="请输入验证码" checkType="img" v-model="code"></v-check-code-cell>
    <v-form-attention title="温馨提示:*******"></v-form-attention>
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
        Toast("请输入");
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

