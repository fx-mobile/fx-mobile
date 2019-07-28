<template>
  <div>
    <v-wx-header show showLeft></v-wx-header>
    <div style="background:#fff;padding-top:.48rem; min-height:100%">
      <v-form-title title="列表"></v-form-title>
      <info-show-three
        v-for="(item,index) in zjInfo"
        :key="index"
        :zjInfo="item"
        @click.native="blockInfo(index)"
      ></info-show-three>
    </div>
  </div>
</template>

<script>
import infoShowThree from "@/components/module2/infoShowThree";
import { customAsync } from "@/api/async";
import sessionStorageUtil from "@/utils/sessionStorageUtil";
import { getUserInfo } from "@/assets/js/common";
import { Toast } from "fx-mui";
export default {
  data() {
    return {
      sqztFlag: false,
      userInfo: "",
      zjInfo: [
        {
          mainTitle:
            "我是列表一我是列表一我是列表一我是列表一我是列表一我是列表一我是列表一",
          subheading: "1111111111"
        },
        {

          mainTitle: "列表二列表二列表二列表二",
          subheading: "列表二"
        },
        {

          mainTitle: "列表三列表三列表三列表三列表三",
          subheading: "列表三"
        },
        {

          mainTitle: "列表三列表三列表三列表三列表三",
          subheading: "列表三"
        },
        {

          mainTitle: "列表三列表三列表三列表三列表三",
          subheading: "列表三"
        },
        {
          mainTitle: "列表三列表三列表三列表三列表三",
          subheading: "列表三"
        },
        {
          mainTitle: "列表三列表三列表三列表三列表三",
          subheading: "列表三"
        },
        {
          mainTitle: "列表三列表三列表三列表三列表三",
          subheading: "列表三"
        }
      ],
      swdljgsq: ""
    };
  },
  components: {
    infoShowThree
  },
  created() {
    if (!!sessionStorageUtil.getItem("user.login.info")) {
      this.userInfo = sessionStorageUtil.getItem("user.login.info");
    } else {
      getUserInfo(this);
    }
    if (this.userInfo.nsr) {
      this.getSwdljgsqInfo();
    }
    //getUserInfo(this);
  },

  mounted() {},

  watch: {},

  methods: {
    toUrl(url) {
      this.$router.push(url);
    },
    getSwdljgsqInfo() {
      customAsync({
        that: this,
        filterFlag: true,
        method: "getSwdljgsqInfo",
        paramObj: {},
        callback: res => {
          if (res.errorcode == "0") {
            this.swdljgsq = res.data.swdljgsq;
            if (this.swdljgsq.sqzt) {
              if (this.swdljgsq.sqzt != 2) {
                this.sqztFlag = true;
              }
            }
          }
        }
      });
    },
    blockInfo(index) {
      if (
        !(
          sessionStorage.getItem("user.login.status") &&
          sessionStorage.getItem("user.login.status") == "true"
        )
      ) {
        Toast("请先登陆");
        return;
      }

      if (index == 0) {
        if (this.userInfo.nsr.yhsfdm != "01") {
          Toast("不是法人不能申请税务代理机构资格");
          return;
        }
        if (this.swdljgsq.sqzt == "1") {
          this.$router.push("/entry/ddsp");
        } else if (this.swdljgsq.sqzt == "2") {
          this.$router.push({
            path: "/entry/cgba",
            query: { sprq: this.swdljgsq.sprq }
          });
        } else if (this.swdljgsq.sqzt == "3") {
          this.$router.push("/entry/spbtg");
        } else {
          if (this.userInfo.nsr.yhsfdm == "01") {
            if (this.userInfo.nsr) {
              this.$router.push({
                path: "/entry/swdljgsq01"
              });
            } else {
              Toast("未绑定企业");
            }
          } else {
            Toast("不是法人不能申请成为代理资格");
          }
        }
      } else if (index == 1) {
        if (
          this.userInfo.nsr.yhsfdm != "01" &&
          this.userInfo.nsr.yhsfdm != "02"
        ) {
          Toast("您无此权限");
          return;
        }

        if (this.swdljgsq.sqzt == "2") {
          this.$router.push({
            path: "/entry/swdlgxwh"
          });
        } else {
          Toast("请前往税务代理机构申请成为代理资格");
        }
      } else {
        if (
          this.userInfo.nsr.yhsfdm != "01" &&
          this.userInfo.nsr.yhsfdm != "02"
        ) {
          Toast("您无此权限");
          return;
        }
        if (this.swdljgsq.sqzt == "2") {
          this.$router.push({
            path: "/entry/swjgrygl"
          });
        } else {
          Toast("请前往税务代理机构申请成为代理资格");
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

