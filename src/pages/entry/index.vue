<template>
  <div class="entry-wrapper">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div v-show="showTab" class="entry-footer">
      <mt-tabbar class="app-entry-tabbar" v-model="selected">
        <mt-tab-item id="home" @click.native="tabbarNav(selected)">
          <img v-show="selected=='home'" slot="icon" src="@/assets/img/entry/entry_01.jpg" />
          <img v-show="selected!=='home'" slot="icon" src="@/assets/img/entry/entry_06.jpg" />
          首页
        </mt-tab-item>
        <mt-tab-item id="module1" @click.native="tabbarNav(selected)">
          <img v-show="selected=='module1'" slot="icon" src="@/assets/img/entry/entry_02.jpg" />
          <img v-show="selected!=='module1'" slot="icon" src="@/assets/img/entry/entry_07.jpg" />
          栏目一
        </mt-tab-item>
        <mt-tab-item id="module2" @click.native="tabbarNav(selected)">
          <img v-show="selected=='module2'" slot="icon" src="@/assets/img/entry/entry_03.jpg" />
          <img v-show="selected!=='module2'" slot="icon" src="@/assets/img/entry/entry_08.jpg" />
          栏目二
        </mt-tab-item>
        <mt-tab-item id="message" @click.native="tabbarNav(selected)">
          <img v-show="selected=='message'" slot="icon" src="@/assets/img/entry/entry_04.jpg" />
          <img v-show="selected!=='message'" slot="icon" src="@/assets/img/entry/entry_09.jpg" />
          消息
          <span v-show="badgeNum <= 0" class="badge">{{badgeNum}}</span>
        </mt-tab-item>
        <mt-tab-item id="my" @click.native="tabbarNav(selected)">
          <img v-show="selected=='my'" slot="icon" src="@/assets/img/entry/entry_05.jpg" />
          <img v-show="selected!=='my'" slot="icon" src="@/assets/img/entry/entry_10.jpg" />
          我的
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Tabbar, TabItem } from "fx-mui";
import { customAsync } from "@/api/async";
import { mapGetters } from "vuex";
import sessionStorageUtil from "@/utils/sessionStorageUtil";

Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
export default {
  data() {
    return {
      selected: "home",
      showTab: false
    };
  },
  watch: {
    $route(to, from) {
      if (to.meta.showTab) {
        this.getBadge();
        this.showTab = true;
      } else {
        this.showTab = false;
      }
      this.setSelected(to.path);
    }
  },
  computed: {
    badgeNum() {
      return this.$store.state.module1.badgeNum;
    }
  },
  created() {
    this.loginStatus = sessionStorageUtil.getItem(
      sessionStorageUtil.USER_LOGIN_STATUS
    );
    if (this.$route.meta.showTab) {
      if (this.loginStatus) {
        this.getBadge();
      } else {
        this.$store.dispatch("SetBadgeNum", 0);
      }
      this.showTab = true;
    } else {
      this.showTab = false;
    }
    this.setSelected(this.$route.path);
  },
  methods: {
    tabbarNav(id) {
      switch (id) {
        case "home":
          this.$router.push("/entry/home");
          break;
        case "module1":
          this.$router.push("/entry/company/module1");
          break;
        case "module2":
          this.$router.push("/entry/module2");
          break;
        case "message":
          this.$router.push("/entry/message");
          break;
        case "my":
          this.$router.push("/entry/my");
          break;
      }
    },
    setSelected(path) {
      switch (path.toLowerCase()) {
        case "/entry/home":
          this.selected = "home";
          break;
        case "/entry/company/module1":
          this.selected = "module1";
          break;
        case "/entry/module2":
          this.selected = "module2";
          break;
        case "/entry/message":
          this.selected = "message";
          break;
        case "/entry/my":
          this.selected = "my";
          break;
      }
    },
    getBadge() {
      this.getMyMsgEntry();
    },
    getMyMsgEntry() {
      customAsync({
        that: this,
        method: "getMyMsg",
        filterFlag: true,
        notShowLoading: true,
        paramObj: { limit: 1, pageNum: 1 },
        callback: res => {
          // console.log("res", res);
          if (res.errorcode == 0) {
            this.getMyTodoEntry(res.data.unReadNum);
          }
        }
      });
    },
    getMyTodoEntry(num) {
      customAsync({
        that: this,
        method: "getMyTodo",
        filterFlag: true,
        notShowLoading: true,
        paramObj: {},
        callback: res => {
          if (res.errorcode == 0) {
            this.$store.dispatch("SetBadgeNum", res.data.unProcessNum + num);
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.app-entry-tabbar {
  position: fixed !important;
  z-index: 9999;
  background-color: #fff;
  border-top: $px2 solid $pjBgColor;
}

.entry-wrapper {
  height: 100%;
}

.entry-footer {
  height: $px98;
}

.badge {
  position: absolute;
  top: -$px6;
  right: $px42;
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

img {
  pointer-events: none;
}
</style>
