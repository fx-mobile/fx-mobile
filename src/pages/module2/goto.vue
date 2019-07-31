<template>
  <div>
    <v-wx-header show showLeft :title="title"></v-wx-header>
    <title></title>
    <iframe
      :src="src"
      name="frame1"
      id="frame1"
      scrolling="no"
      frameborder="0"
      style="overflow: auto; margin: auto;width: 100%;"
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: this.$route.query.url,
      title: this.$route.query.title
    };
  },
  mounted() {
    // let oIframe = document.getElementById("frame1");
    // const deviceHeight = document.documentElement.clientHeight;
    // oIframe.style.height = Number(deviceHeight) - 200 + "px"; //数字是页面布局高度差

  }
}
</script>

<style lang="scss" scoped>
</style>

