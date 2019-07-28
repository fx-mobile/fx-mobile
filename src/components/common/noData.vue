<template>
  <div ref="noDataCard" class="no-data-main">
    <img src="@/assets/img/common/none_data.jpg" alt />
    {{tip}}
  </div>
</template>

<script>
import getPlatformType from "@/utils/getPlatformType";
export default {
  props: {
    tip: String,
    cutHeight: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: "rem"
    },
    cutFooter: Boolean,
    cutHeader: Boolean
  },
  watch: {
    cutHeight() {
      this.setHeight();
    }
  },
  data() {
    return {
      type:
        getPlatformType() == "01" || getPlatformType() == "02" ? true : false
    };
  },
  mounted() {
    this.setHeight();
  },
  methods: {
    setHeight() {
      let footerHeight = 0;
      let headerHeight = 0;
      if (this.cutFooter) {
        footerHeight =
          this.unit == "rem"
            ? 1.30667
            : document.getElementsByClassName("entry-footer")[0].clientHeight;
      }
      if (this.cutHeader) {
        headerHeight =
          this.unit == "rem"
            ? 1.333333
            : document.getElementsByClassName("wx-header")[0].clientHeight;
      }
      if (this.unit == "px") {
        this.$refs.noDataCard.style.height =
          window.innerHeight - this.cutHeight - footerHeight + "px";
      } else if (this.unit == "rem") {
        this.$refs.noDataCard.style.height =
          ((window.innerHeight * 2) / 750) * 10 -
          this.cutHeight -
          footerHeight -
          headerHeight +
          "rem";
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.no-data-main {
  text-align: center;
  font-size: $px28;
  padding-top: 4rem;
  img {
    width: 50%;
    margin: 0 auto;
  }
}
</style>
