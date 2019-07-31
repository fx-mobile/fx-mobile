<template>
  <div>
    <v-wx-header show showLeft></v-wx-header>
    <div class="nav">
      <mt-button size="small" @click.native.prevent="active = 'tab-container1'">tab 1</mt-button>
      <mt-button size="small" @click.native.prevent="active = 'tab-container2'">tab 2</mt-button>
      <mt-button size="small" @click.native.prevent="active = 'tab-container3'">tab 3</mt-button>
    </div>

    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
        <mt-tab-container-item id="tab-container1">
          <!-- cell组件 -->
          <mt-cell v-for="n in 10" :key="n" title="tab-container 1"></mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container2">
          <!-- cell组件 -->
          <iframe
            src="https://news.cnblogs.com/m"
            ref="c2"
            id="frame1"
            scrolling="no"
            frameborder="0"
            style="overflow: 100%; margin: auto;height:auto; width: 100%;"
          ></iframe>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container3">
          <!-- cell组件 -->
          <iframe
            src="https://m.cnblogs.com/blog/"
            ref="c2"
            id="frame2"
            scrolling="no"
            frameborder="0"
            style="overflow: 100%; height:600px; margin: auto;width: 100%;"
          ></iframe>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "page-tab-container",
  data() {
    return {
      active: "tab-container1"
    };
  },

  mounted() {
    let oIframe = document.getElementById("frame1");
    const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.height = Number(deviceHeight) - 120 + "px"; //数字是页面布局高度差
  }
};
</script>
 
<style lang="css" scoped>
.item {
  display: inline-block;
}

.nav {
  padding: 10px;
}

.link {
  color: inherit;
  padding: 20px;
  display: block;
}
</style>