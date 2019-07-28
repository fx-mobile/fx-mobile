<template>
  <div class="notice-wrap" :id="compId">
    <ul class="notice-list">
      <li @click="clickEvent(item)" v-for="(item,index) in dataList" :key="index">
        <a href="javascript:;">{{item.content}}</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  /** 
   *消息垂直轮播组件 
   @param {Array} dataList 消息JSON数组 
   @param {String} itemHeight 组件高度 
   @param {String} unit 高度单位 
   @param {String} time 轮播间隔时间 
  */
  props: ["dataList", "itemHeight", "unit", "time"],
  data() {
    return {
      compId: "" //组件id，用于样式覆盖
    };
  },
  watch: {
    dataList: function(newVal, oldVal) {
      this.dataChange(newVal);
    }
  },
  methods: {
    clickEvent: function(item) {
      //抛出每项点击事件
      this.$emit("getItem", item);
    },
    dataChange: function(data) {
      if (data && data.length && data.length > 0) {
        this.compId = "compId_" + this.time + data.length;
        this.init(
          "#" + this.compId,
          this.dataList.length,
          Number(this.time),
          0.1
        );
      } else {
        this.compId = "";
      }
    },
    init: function(selector, length, gapTime, time) {
      var unit = this.unit || "px";
      var nod = document.createElement("style"),
        str = this.generateStyle(
          selector + " ul",
          this.itemHeight,
          unit,
          length,
          gapTime,
          time
        );
      str += this.initHeight(selector, this.itemHeight + this.unit);
      nod.type = "text/css";
      nod.innerHTML = str;
      document.getElementsByTagName("head")[0].appendChild(nod);
    },
    //初始化高度
    initHeight: function(selector, height) {
      var style =
        selector +
        "{height:" +
        height +
        ";}" +
        selector +
        " ul {line-height:" +
        height +
        ";}" +
        selector +
        " ul li {height:" +
        height +
        ";}";
      return style;
    },
    /**
    function generateStyle   生成动画所需的样式
    @params {String}
        selector  动画作用的dom的选择器
        height    每次滚动高度，数值
        unit      滚动高度的单位：px、rem、em
        length    数据的长度
        gapTime   轮播间隔时间，单位s
        time      切换时间，单位s
*/
    generateStyle: function(selector, height, unit, length, gapTime, time) {
      if (length < 1) return;
      var gapTime = gapTime || 3;
      var time = time || 0.1;
      //css3动画总时长
      var durationTime = length * (gapTime + time);
      var curGap = (time / (gapTime + time)) * 100;
      var eachTime = 100 / length;
      var animationName = "name_" + length + "_" + gapTime + "_" + time;
      //animation-name不能带小数点
      animationName = animationName.replace(".", "");
      var style =
        "keyframes " +
        animationName +
        " {" +
        this.genTransform(0, 0, "-webkit-");
      var step;
      for (var i = 1; i <= length; i++) {
        step = eachTime * i;
        style =
          style +
          this.genTransform(
            step - curGap,
            -(i - 1) * height + unit,
            "-webkit-"
          ) +
          this.genTransform(step, -i * height + unit, "-webkit-");
      }
      style += "}";
      //当数组长度为1时，只返回样式，不绑定动画
      if (length < 2) return style;
      style = "@-webkit-" + style + "@" + style;
      //将animation动画绑定到选择器上
      style +=
        selector +
        " {-webkit-animation: " +
        animationName +
        " " +
        durationTime +
        "s linear 0s infinite;" +
        "animation: " +
        animationName +
        " " +
        durationTime +
        "s linear 0s infinite;}";
      return style;
    },
    genTransform: function(percent, translateY, prefix) {
      var transformStyle =
        percent +
        "% {" +
        prefix +
        "transform:translate(0," +
        translateY +
        ");" +
        "transform:translate(0," +
        translateY +
        ");}";
      return transformStyle;
    }
  },
  created: function() {
    this.dataChange(this.dataList);
  }
};
</script>
<style scoped>
.notice-list {
  padding: 0 0.15rem;
  line-height: 0.2rem;
  text-align: left;
  overflow: hidden;
}

li {
  list-style: none;
  height: 0.2rem;
}

.notice-list a {
  color: #333;
  display: block;
  font-size: 0.426667rem /* 32/75 */;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.notice-wrap {
  height: 0.2rem;
  text-align: center;
  overflow: hidden;
  /* padding: 0.025rem 0; */
}
</style>