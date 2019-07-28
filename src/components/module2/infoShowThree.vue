<template>
  <div class="info-list">
    <div class="info-img">
      <img :src="zjInfo.infoImg">
    </div>
    <div class="info-content">
      <p>{{zjInfo.mainTitle}}</p>
      <p>{{zjInfo.subheading}}</p>
    </div>
    <div class="info-btn">
      <i class="iconfont iconnext"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    zjInfo:Object
  },
  data() {
    return {};
  },

  mounted() {},
  computed: {},
  watch: {},

  methods: {}
};
</script>
<style lang="scss" scoped>
.info-list {
  background: #fff;
  display: flex;
  align-items: center;
  //@include after-scale-border-bottom($color: #e5e5e5);
  border-bottom: $px1 solid #e5e5e5;
  margin: 0 0 0 .27rem;
  padding: 0.4rem .2rem .4rem 0;
  .info-img {
    flex: .69rem 0 0;
    img {
      width: .77rem;
      height: .77rem;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .info-content {
    padding-left: .27rem;
    text-align: left;
    flex: 1;
    p {
      color: #999999;
      margin-top: .04rem;
      font-size: 0.35rem;
      &:nth-of-type(1) {
        color: #333333;
        font-size: 0.43rem;
      }
    }
  }
  .info-btn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    i{
      font-size: .5rem;
      color: #999999;
      font-weight: bold
    }
  }
}

</style>

