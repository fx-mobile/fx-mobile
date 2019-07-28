<template>
  <div class="check-cred-main">
    <i
      class="iconfont check-icon"
      @click="changeCheck"
      :class="check?'checkin icongouxuan':'checkout'"
    ></i>
    我已阅读并同意
    <span>{{name}}</span>，并输出上述信息
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    checkValue: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      check: this.checkValue
    };
  },
  methods: {
    changeCheck() {
      this.check = !this.check;
      this.$emit("getCheckValue", this.check);
    }
  }
};
</script>

<style scoped lang="scss">
.check-cred-main {
  font-size: $px24;
  display: flex;
  align-items: center;
  padding: $px30 0;
  .check-icon {
    position: relative;
    display: inline-block;
    width: $px24;
    height: $px24;
    border-radius: $px4;
    font-size: $px20;
    color: #108bf7;
    margin-right: $px8;
    &.checkin {
      border: solid $px2 #108bf7;
    }
    &.checkout {
      border: solid $px2 #999999;
    }
    &::before {
      position: absolute;
      top: -$px4;
    }
  }
  span {
    color: $mainColor;
  }
}
</style>
