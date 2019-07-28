<template>
  <div>
    <div class="my-main" v-if="loginStatus">
      <div class="my-header">
        <div class="my-head-img" @click="uploadHp">
          <img :src="imgUrl" alt />
        </div>
        <div class="my-intro">
          <div class="name">{{form.xm}}</div>
          <div class="mobile">{{form.sjh}}</div>
        </div>
      </div>
      <div class="my-info-wrapper">
        <div>
          <v-input-cell-readonly
            titlestyle="width:2.8rem"
            cellstyle="font-size:0.43rem;"
            :imgUrl="require('@/assets/img/my/01.png')"
            title="姓名"
            :value="form.xm || '无'"
          ></v-input-cell-readonly>
          <v-input-cell-readonly
            titlestyle="width:2.8rem "
            cellstyle="font-size:0.43rem;"
            :imgUrl="require('@/assets/img/my/02.png')"
            title="证件类型"
            :value="form.zjlx || '无'"
          ></v-input-cell-readonly>
          <v-input-cell-readonly
            titlestyle="width:2.8rem "
            cellstyle="font-size:0.43rem;"
            :imgUrl="require('@/assets/img/my/03.png')"
            title="证件号码"
            :value="form.zjhm || '无'"
          ></v-input-cell-readonly>
          <v-input-cell-readonly
            titlestyle="width:2.8rem "
            cellstyle="font-size:0.43rem;"
            :imgUrl="require('@/assets/img/my/06.png')"
            title="证件有效期止"
            :value="form.zjyxqz || '无'"
          ></v-input-cell-readonly>
          <v-input-cell-readonly
            titlestyle="width:2.8rem "
            cellstyle="font-size:0.43rem;"
            :imgUrl="require('@/assets/img/my/04.png')"
            title="国籍"
            :value="form.gj || '无'"
          ></v-input-cell-readonly>
          <v-input-cell-readonly
            titlestyle="width:2.8rem "
            cellstyle="font-size:0.43rem;"
            :imgUrl="require('@/assets/img/my/05.png')"
            title="手机号码"
            showEdit
            @editClick="editClick('phone',form.sjh)"
            :value="form.sjh || '无'"
          ></v-input-cell-readonly>
          <v-input-cell-readonly
            titlestyle="width:2.8rem "
            cellstyle="font-size:0.43rem;"
            :imgUrl="require('@/assets/img/my/07.png')"
            title="证件地址"
            :value="form.zjdz || '无'"
          ></v-input-cell-readonly>
          <v-input-cell-readonly
            titlestyle="width:2.8rem "
            cellstyle="font-size:0.43rem;"
            :imgUrl="require('@/assets/img/my/5.png')"
            showEdit
            title="住址"
            :value="form.zz || '无'"
            @editClick="editClick('addr',form.zz)"
          ></v-input-cell-readonly>
        </div>
      </div>
      <div class="my-login-out">
        <a @click="logout" href="javascript:void(0);">退出登录</a>
      </div>
      <input type="file" name="file" accept="image/*" @change="upload" hidden ref="uploadImg" />
    </div>
    <div class="logout-main" v-else>
      <img :src="require('@/assets/img/common/default-logo.png')" alt />
      <span>
        <a href="javascript:;">
          <span @click="toLogin" class="loginSpan">登录</span>
        </a>
        <span class="n-line">/</span>
        <a href="javascript:;">
          <span @click="$router.push('/entry/user/form')" class="registerSpan">注册</span>
        </a>查看个人信息
      </span>
    </div>
  </div>
</template>

<script>
import country from "@/assets/js/country";
import sessionStorageUtil from "@/utils/sessionStorageUtil";
import config from "@/api/config";
import { customAsync } from "@/api/async";
import { getFullImgUrl, getdata } from "@/utils/handler";
import { MessageBox, Toast } from "fx-mui";
import { getUserInfo } from "@/assets/js/common";

export default {
  data() {
    // let loginStatus = sessionStorageUtil.getItem(
    //   sessionStorageUtil.USER_LOGIN_STATUS
    // );
    let loginStatus = true;
    return {
      form: {
        yhid: "",
        xm: "",
        zjlx: "",
        zjhm: "",
        sjh: "",
        zz: "",
        csrq: "",
        gj: "",
        zjyxqz: "",
        zjdz: "",
        xb: ""
      },
      myInfo: {},
      imgUrl: require("@/assets/img/common/default-head.png"),
      loginStatus: loginStatus,
      headImgPath: ""
    };
  },
  created() {
    this.myInfo = sessionStorageUtil.getItem(
      sessionStorageUtil.USER_LOGIN_INFO
    );
    if (this.myInfo) {
      this.init();
    }
  },
  methods: {
    init() {
      this.form.yhid = this.myInfo.user.yhid;
      this.form.xb = this.myInfo.zrr && this.myInfo.zrr.xb;
      this.form.xm = this.myInfo.user.xm;
      if (this.form.xb) {
        this.form.xm = this.myInfo.user.xm + "(" + this.form.xb + ")";
      }
      this.form.sjh = this.myInfo.user.sjh.replace(
        /(\d{3})\d{4}(\d{4})/,
        "$1****$2"
      );
      this.form.zz = this.myInfo.zrr && this.myInfo.zrr.zz;
      this.form.zjlx = this.myInfo.zrr;
      this.form.zjdz = this.myInfo.zrr && this.myInfo.zrr.zjdz;
      this.form.zjyxqz = this.myInfo.zrr && this.myInfo.zrr.zjyxqz;
      this.form.zjhm =
        this.myInfo.zrr &&
        this.myInfo.zrr.zjhm.replace(
          /(\d{3})\d{12}(\d{2}[0-9Xx]{1})/,
          "$1************$2"
        );
      if (this.myInfo.smzInfo) {
        if (this.myInfo.smzInfo.gj == "156") {
          this.form.gj = "中国";
        } else if (this.myInfo.smzInfo.gj == "158") {
          this.form.gj = "中国台湾";
        } else if (this.myInfo.smzInfo.gj == "344") {
          this.form.gj = "中国香港";
        } else if (this.myInfo.smzInfo.gj == "446") {
          this.form.gj = "中国澳门";
        } else {
          this.form.gj = getdata(country, "code", this.myInfo.smzInfo.gj);
        }
      }

      // this.imgUrl = getFullImgUrl(this.myInfo.user.yhtxdz);
    },
    editClick(type, val) {
      if (type == "phone") {
        this.$router.push("/entry/editMobile?sjh=" + this.myInfo.user.sjh);
      } else if (type == "addr") {
        this.$router.push("/entry/editAddress?zz=" + (val ? val : ""));
      }
    },
    logout() {
      MessageBox.confirm("确定要退出登录吗?").then(action => {
        if (action == "confirm") {
          customAsync({
            that: this,
            method: "logout",
            paramObj: {},
            callback: res => {
              sessionStorageUtil.removeItem(
                sessionStorageUtil.USER_LOGIN_STATUS
              );
              sessionStorageUtil.removeItem(sessionStorageUtil.USER_LOGIN_INFO);
              this.$store.dispatch("SetBadgeNum", 0);
              this.$router.push("/login");
            }
          });
        }
      });
    },
    toLogin() {
      this.$router.push({
        path: "/login",
        query: { redirect_url: this.$route.fullPath }
      });
    },
    upload(event) {
      let file = event.target.files[0];
      if (!file) {
        console.log("未选择文件");
        return;
      }
      let formData = new FormData();
      formData.append("file", file);
      customAsync({
        that: this,
        method: "upload",
        paramObj: formData,
        callback: res => {
          this.headImgPath = res.data.path;
          this.setHeadImg();
        }
      });
    },
    uploadHp() {
      return;
      this.$refs.uploadImg.click();
    },
    setHeadImg() {
      customAsync({
        that: this,
        method: "setHeadImg",
        paramObj: {
          path: this.headImgPath
        },
        callback: res => {
          getUserInfo(this, null, false).then(res => {
            Toast("修改头像成功");
            let myInfo = sessionStorageUtil.getItem(
              sessionStorageUtil.USER_LOGIN_INFO
            );
            this.imgUrl = getFullImgUrl(myInfo.user.yhtxdz);
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.my-main {
  .my-header {
    display: flex;
    height: $px270;
    background-color: $mainColor;
    align-items: center;
    .my-head-img {
      width: $px146;
      height: $px146;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 $px30 0 $px20;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .my-intro {
      color: #fff;
      .name {
        font-size: $px36;
      }
      .mobile {
        font-size: $px28;
      }
    }
  }
  .my-info-wrapper {
    position: relative;
    top: -$px8;
    background-color: #fff;
    border-top-left-radius: $px16;
    border-top-right-radius: $px16;
    overflow: hidden;
  }
  .my-login-out {
    text-align: center;
    padding: $px30 0;
    a {
      color: #108bf7;
      font-size: $px34;
    }
  }
}
.logout-main {
  display: flex;
  padding: $px40 $px20;
  background-color: #fff;
  align-items: center;
  img {
    width: $px146;
    height: $px146;
    margin-right: $px20;
  }
  span {
    flex: 1;
    font-size: $px32;
  }
}

.n-line {
  color: #666;
}
</style>
