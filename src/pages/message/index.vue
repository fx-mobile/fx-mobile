<template>
  <div class="message-main" ref="msgMain">
    <mt-navbar
      ref="mtNavbar"
      v-model="mSelected"
      style="position:fixed;top:0;width:100%;z-index:99;"
    >
      <mt-tab-item id="message">
        消息
        <span class="badge" v-show="messageBadgeNum>0">{{messageBadgeNum}}</span>
      </mt-tab-item>
      <mt-tab-item id="backlog">
        预警
        <span class="badge" v-show="backlogBadgeNum>0">{{backlogBadgeNum}}</span>
      </mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="mSelected">
      <mt-tab-container-item id="message">
        <div
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
        >
          <message-card
            @click.native="toArticle(item)"
            v-for="(item,index) in messageList"
            :data="item"
            :key="index"
          ></message-card>
        </div>
        <div class="no-tip" v-if="messageList.length == 0 && noMessageTip">
          <no-data cutFooter unit="px" :cutHeight="cutHeight" :tip="noMessageTip"></no-data>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="backlog">
        <div>
          <message-card
            @click.native="toApprove(item)"
            todo
            v-for="(item,index) in todoList"
            :data="item"
            :key="index"
          ></message-card>
        </div>
        <div class="no-tip" v-if="messageList.length == 0 && noTodoTip">
          <no-data cutFooter unit="px" :cutHeight="cutHeight" :tip="noTodoTip"></no-data>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import Vue from "vue";
import { Navbar, TabItem, Toast,InfiniteScroll } from "fx-mui";
import { customAsync } from "@/api/async";
import sessionStorageUtil from "@/utils/sessionStorageUtil";
import noData from "@/components/common/noData";
import { getUserInfo } from "@/assets/js/common";
import { isEmpty } from "@/utils/validation";

Vue.use(InfiniteScroll);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
export default {
  components: {
    noData
  },
  data() {
    return {
      mSelected: "message",
      loading: true,
      messageList: [],
      todoList: [],
      messageBadgeNum: 0,
      backlogBadgeNum: 0,
      numList: [],
      sum: 0,
      noMessageTip: "",
      noTodoTip: "",
      pageNum: 1,
      limit: 10,
      isBacklog: false,
      loginStatus: null,
      cutHeight: 0
    };
  },
  watch: {
    mSelected(nv) {
      if (nv == "backlog") {
        this.isBacklog = true;
      } else {
        this.isBacklog = false;
      }
    }
  },
  computed: {},
  mounted() {
    this.msgMainPt();
    window.addEventListener("resize", this.msgMainPt);
  },
  created() {
    this.msign = false;
    this.numList = [];
    this.messageList = [];
    this.pageNum = 1;
    this.sum = 0;
    this.loginStatus = sessionStorageUtil.getItem(
      sessionStorageUtil.USER_LOGIN_STATUS
    );
    console.log("this.loginStatus", this.loginStatus);
    if (!!sessionStorageUtil.getItem("user.login.info")) {
      this.userinfo = sessionStorageUtil.getItem("user.login.info");
    } else {
      getUserInfo(this);
    }
    if (this.loginStatus) {
      this.getMyMsg();
      this.getMyTodo();
    }
    if (this.$route.query.selected) {
      this.mSelected = this.$route.query.selected;
    }
  },
  methods: {
    msgMainPt() {
      this.cutHeight = this.$refs.mtNavbar.$el.clientHeight;
      this.$refs.msgMain.style.paddingTop = this.cutHeight + "px";
      let w = window.innerHeight;
      let f = document.getElementsByClassName("entry-footer")[0].clientHeight;
      let c = w - f - this.cutHeight + "px";
      console.log("c", c);
      document.querySelectorAll(
        ".message-main .mint-tab-container-item"
      )[0].style.cssText = "height:" + c;
      document.querySelectorAll(
        ".message-main .mint-tab-container-item"
      )[1].style.cssText = "height:" + c;
    },
    getMyMsg() {
      customAsync({
        that: this,
        method: "getMyMsg",
        paramObj: { limit: this.limit, pageNum: this.pageNum },
        callback: res => {
          // console.log("res", res);
          if (res.data.total == 0) {
            this.noMessageTip = "暂无消息";
          } else {
            this.loading = false;
            this.messageList = this.messageList.concat(res.data.msgs);
            for (let item of this.messageList) {
              item.status = item.isRead;
            }
          }
          console.log("this.messageList.length", this.messageList.length);
          console.log("res.data.total", res.data.total);
          if (this.messageList.length >= res.data.total) {
            this.loading = true;
          }
          if (!this.msign) {
            this.messageBadgeNum = res.data.unReadNum;
            this.sumBadge(this.messageBadgeNum);
            this.msign = true;
          }
        }
      });
    },
    getMyTodo() {
      console.log(2);
      customAsync({
        that: this,
        method: "getMyTodo",
        paramObj: {},
        callback: res => {
          // console.log("res", res);
          if (res.data.todos.length == 0) {
            this.noTodoTip = "暂无待办任务";
          } else {
            this.todoList = res.data.todos;
            for (let item of this.todoList) {
              item.status = item.isProcess;
            }
          }
          this.backlogBadgeNum = res.data.unProcessNum;
          this.sumBadge(this.backlogBadgeNum);
        }
      });
    },
    sumBadge(num) {
      this.sum += num;
      this.numList.push(num);
      if (this.numList.length > 1) {
        this.$store.dispatch("SetBadgeNum", this.sum);
      }
    },
    loadMore() {
      if (this.isBacklog) {
        return;
      }
      this.pageNum++;
      this.getMyMsg();
    },
    toApprove(item) {
      if (isEmpty(this.userinfo.nsr) == false) {
        var role = this.userinfo.nsr.yhsfdm;
        if (role != "01" && role != "02") {
          Toast("您无此权限");
          return;
        }
      }
      if (item.type == "bssf") {
        this.$router.push("/entry/company/taxerIdApprove");
      } else if (item.type == "dlba") {
        this.$router.push({
          path: "/entry/company/agencyApproveD",
          query: { dlbasqid: item.id }
        });
      }
    },
    toArticle(item) {
      this.$router.push({
        path: "/entry/article",
        query: { data: JSON.stringify(item) }
      });
    },
    toLogin() {
      this.$router.push({
        path: "/login",
        query: { redirect_url: this.$route.fullPath }
      });
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.msgMainPt);
  }
};
</script>

<style scoped lang="scss">
.message-main {
  position: fixed;
  overflow: hidden;
  width: 100%;
  .badge {
    position: relative;
    top: -$px12;
    left: -$px10;
    display: inline-block;
    height: $px28;
    min-width: $px28;
    border-radius: $px14;
    text-align: center;
    line-height: $px28;
    background-color: #ff1616;
    font-size: $px24;
    color: #fff;
    padding: 0 $px6;
  }

  .no-tip {
    text-align: center;
    font-size: $px28;
    background-color: #fff;
  }

  .no-login {
    text-align: center;
    font-size: $px32;
    padding: $px40 0;
    background-color: #fff;
  }

  .mint-tab-container-item {
    height: 15.12rem;
    overflow: auto;
  }

  .n-line {
    color: #666;
  }
}
</style>
