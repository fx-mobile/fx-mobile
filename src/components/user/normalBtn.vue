
<template>
  <button
    @click="buttonClick"
    :class="(size=='small'?'normal-btn':size=='large'?'large-btn':'')+' '+(type == 'primary'?'normal-bg':type == 'main'?'main-bg':type == 'disable'?'disable-bg':type == 'warn'?'warn-bg':'')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "main"
    },
    size: {
      type: String,
      default: "small"
    }
  },
  data() {
    return {};
  },

  mounted() {},
  computed: {},
  watch: {},

  methods: {
    buttonClick(e) {
      this.$emit("click", e);
    }
  }
};
</script>
<style lang="scss" scoped>
.normal-btn {
  border: 0;
  color: #fff;
  width: 1.73rem;
  font-size: 0.37rem;
  border-radius: 0.4rem;
  text-align: center;
  padding: 0.16rem 0;
}
.large-btn {
  border: 0;
  color: #fff;
  width: 100%;
  font-size: 0.48rem;
  border-radius: 0.13rem;
  text-align: center;
  height: 1.17rem;
  line-height: 1.17rem;
}
.main-bg {
  background-color: $mainColor;
}
.normal-bg {
  background-color: $secColor;
}
.disable-bg {
  background-color: $disableColor;
}
.warn-bg {
  background-color: #f76260;
}
</style>

