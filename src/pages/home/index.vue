<template>
  <div class="main-home">
    <mt-swipe :auto="3000" class="home-swipe">
      <mt-swipe-item>
        <img src="@/assets/img/home/banner_01.jpg" alt srcset />
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="@/assets/img/home/banner_02.jpg" alt srcset />
      </mt-swipe-item>
    </mt-swipe>
    <div class="main-home-grid">
      <div class="grid-cell" @click="toScanCode">
        <img src="@/assets/img/home/home_02.jpg" alt srcset />
        <span>扫一扫</span>
      </div>
      <div class="grid-cell" @click="goLogin()">
        <img src="@/assets/img/home/home_03.jpg" alt srcset />
        <span>实名验证</span>
      </div>
    </div>

    <div>
      <iframe
        src="a.html"
        name="frame1"
        id="frame1"
        scrolling="no"
        frameborder="0"
        style="overflow: hidden;width: 100%;background-color:green; max-height:40rem;"
      ></iframe>
    </div>
    <div>
      <iframe
        src="b.html"
        name="frame2"
        id="frame2"
        scrolling="no"
        frameborder="0"
        style="overflow: hidden; background-color:blue; width: 100%;max-height:40rem;"
      ></iframe>
    </div>
    <div>
      <iframe
        src="c.html"
        name="frame3"
        id="frame3"
        scrolling="no"
        frameborder="0"
        style="overflow: hidden;background-color:#c00000; width: 100%;max-height:40rem;"
      ></iframe>
    </div>
    <div>
      <iframe
        src="d.html"
        name="frame4"
        id="frame4"
        scrolling="no"
        frameborder="0"
        style="overflow: hidden; width: 100%;background-color:gray; max-height:40rem;"
      ></iframe>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import infoShowTwo from "@/components/module2/infoShowTwo";
import scrollText from "@/components/home/scrollText.vue";
import { Swipe, SwipeItem, Toast } from "fx-mui";
import scanCode from "@/utils/scanCode";
import { customAsync } from "@/api/async";
import sessionStorageUtil from "@/utils/sessionStorageUtil";
import { getUserInfo } from "@/assets/js/common";

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  components: {
    scrollText,
    infoShowTwo
  },
  data() {
    return {
      dataList: [{}, {}],
      infoImg: require("@/assets/img/home/home_05.png"),
      messageList: [{}],
      loginStatus: sessionStorageUtil.getItem(
        sessionStorageUtil.USER_LOGIN_STATUS
      ),
      noMsgTip: "",
      noTodoTip: ""
    };
  },
  created() {
    this.loginStatus = sessionStorageUtil.getItem(
      sessionStorageUtil.USER_LOGIN_STATUS
    );
    if (this.loginStatus) {
      this.init();
    }
    if (!!sessionStorageUtil.getItem("user.login.info")) {
      this.userinfo = sessionStorageUtil.getItem("user.login.info");
    } else {
      getUserInfo(this);
    }
  },
  methods: {
    toScanCode() {
      scanCode();
    },
    init() {
      this.getMyMsg();
      this.getMyTodo();
    },
    getMyMsg() {
      customAsync({
        that: this,
        method: "getMyMsg",
        filterFlag: true,
        paramObj: { limit: 1, pageNum: 1 },
        callback: res => {
          // console.log("res", res);
          this.loginStatus = true;
          if (res.errorcode == 0) {
            if (res.data.msgs.length == 0) {
              this.noMsgTip = "暂无推送消息";
            }
            this.messageList = res.data.msgs;
          } else if (res.errorcode == 1001) {
          } else {
            Toast(res.errormsg);
          }
        }
      });
    },
    getMyTodo() {
      customAsync({
        that: this,
        method: "getMyTodo",
        filterFlag: true,
        paramObj: {},
        callback: res => {
          // console.log("res", res);
          this.loginStatus = true;
          if (res.errorcode == 0) {
            for (let item of res.data.todos) {
              if (item.isProcess == "N" && this.dataList.length < 4) {
                this.dataList.push(item);
                return;
              }
            }
            this.noTodoTip = "暂无待办任务";
          } else if (res.errorcode == 1001) {
            this.loginStatus = false;
            sessionStorageUtil.removeItem(sessionStorageUtil.USER_LOGIN_INFO);
            sessionStorageUtil.removeItem(sessionStorageUtil.USER_LOGIN_STATUS);
          } else if (res.errorcode == 1027) {
            this.noTodoTip = "请先选择企业";
          }
        }
      });
    },
    getItem(item) {},
    toArticle(item) {
      this.$router.push({
        path: "/entry/article",
        query: { data: JSON.stringify(item) }
      });
    },
    goLogin() {
      let myInfo = sessionStorageUtil.getItem(
        sessionStorageUtil.USER_LOGIN_INFO
      );
      if (!this.loginStatus) {
        this.$router.push({
          path: "/login",
          query: { redirect_url: this.$route.fullPath }
        });
        return;
      }
      if (myInfo && myInfo.zrr && myInfo.zrr.zjhm) {
        this.$router.push("/entry/success");
      } else {
        this.$router.push("/entry/user/form");
      }
    },
    toMessage() {
      let myInfo = sessionStorageUtil.getItem(
        sessionStorageUtil.USER_LOGIN_INFO
      );
      if (myInfo.nsr && myInfo.nsr.yhid) {
        this.$router.push("/entry/message?selected=message");
      } else {
        Toast("to message");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.main-home {
  .home-swipe {
    height: $px418;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .home-backlog {
    background-color: #fff;
    position: relative;
    display: flex;
    padding: 0 $px24 0 $px20;
    margin-top: $px20;
    .home-backlog-name {
      width: $px67;
      height: 1.466667rem;
      display: flex;
      align-items: center;
      img {
        width: 100%;
        height: $px35;
      }
    }
    .one-backlog {
      line-height: 1.466667rem;
      align-items: center;
      white-space: nowrap;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 0.15rem;
      font-size: 0.42667rem;
      color: #333;
    }
    .home-backlog-title {
      flex: 1;
    }
    i {
      position: absolute;
      right: $px10;
      height: 100%;
      display: flex;
      align-items: center;
      font-size: $px40;
      font-weight: bold;
      color: #999999;
    }
  }
  .main-home-grid {
    display: flex;
    background-color: #fff;
    justify-content: space-around;
    padding: $px36 0;
    .grid-cell {
      display: flex;
      min-width: 1.25333rem;
      flex-direction: column;
      align-items: center;
      img {
        display: block;
        width: $px94;
        height: auto;
        pointer-events: none;
      }
      span {
        font-size: $px28;
      }
    }
  }
  .no-content {
    display: block;
    color: #666;
    text-align: center;
  }
  .n-line {
    color: #666;
  }
}
</style>
