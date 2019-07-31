<template>
  <div>
    <v-wx-header show showLeft></v-wx-header>
    <hr style="padding:.48rem 0" />
    <mt-button size="large" type="primary">A产品</mt-button>
    <hr style="padding:.48rem 0" />
    <mt-button size="large" type="default">B产品</mt-button>
    <hr style="padding:.48rem 0" />
    <mt-button size="large" type="danger">C产品</mt-button>
    <hr style="padding:.48rem 0" />
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
          mainTitle: "我是产品一团队",
          subheading: "我是产品一团队"
        },
        {
          mainTitle: "我是产品二团队",
          subheading: "我是产品二团队"
        },
        {
          mainTitle: "我是产品三团队",
          subheading: "我是产品三团队"
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
  created() {},

  mounted() {},

  watch: {},

  methods: {
    toUrl(url) {
      this.$router.push(url);
    },
    test2() {},
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
        this.$router.push({
          path: "/entry/goto",
          query: { title: "百度", url: "https://fx-mobile.github.io/baidu.html" }
        });
      } else if (index == 1) {
        this.$router.push({
          path: "/entry/goto",
          query: {
            title: "知识库",
            url:
              "https://vuejs.org/v2/guide/"
          }
        });
      } else {
        Toast("您无此权限");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

