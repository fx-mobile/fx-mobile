<template>
  <div class="info-list">
    <div class="info-img" v-if="infoImg">
      <img :src="infoImg" />
    </div>
    <div class="info-content">
      <p v-for="(item,index) in infoContent" :key="index">
        {{item}}
        <span
          class="state"
          :class="state=='待确认'?'state-bg01':state=='代理中'?'state-bg02':state=='已结束'?'state-bg03':'state-bg03'"
          v-if="state!=''"
        >{{state}}</span>
      </p>
    </div>
    <div class="info-btn">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    infoImg: {
      default: "",
      type: String
    },
    infoContent: {
      type: Array
    },
    state: {
      default: "",
      type: String
    }
  },
  data() {
    return {};
  },

  methods: {}
};
</script>
<style lang="scss" scoped>
.info-list {
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  border-bottom: $px1 solid #e5e5e5;
  margin: 0 0.27rem;
  padding: 0.4rem 0;
  padding-right: 0.1rem;
  .info-img {
    flex: 0.69rem 0 0;
    margin-right: 0.27rem;
    img {
      width: 0.69rem;
      height: 0.69rem;
      border-radius: 50%;
      overflow: hidden;
      margin-top: 0.12rem;
    }
  }
  .info-content {
    text-align: left;
    flex: 1;
    p {
      color: #999999;
      margin-top: 0.04rem;
      font-size: 0.35rem;
      &:nth-of-type(1) {
        color: #333333;
        font-size: 0.43rem;
        .state {
          display: inline-block;
        }
      }
      .state {
        display: inline-block;
        width: 1.2rem;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        font-size: 0.32rem;
        color: #fff;
        margin-left: 0.1rem;
        display: none;
      }
      .state-bg01 {
        background-size: 100% 100%;
      }
      .state-bg02 {
        background-size: 100% 100%;
      }
      .state-bg03 {
        background-size: 100% 100%;
      }
    }
  }
  .info-btn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}

.check {
  width: $px46;
  height: $px46;
  background-color: #ffffff;
  border: solid $px2 #eeeeee;
  border-radius: 50%;
  overflow: hidden;
}
.checked {
  background-size: 100% 100%;
  border: none;
}
</style>

