<template>
  <div class="container-padding">
    <div
      class="cell-container"
      :style="cellstyle"
      :class="borderbottom!='border-bottom'?'':'border-bottom'"
    >
      <div v-if="imgUrl" class="icon">
        <img :src="imgUrl" alt />
      </div>
      <div class="title" v-html="title" :style="titlestyle"></div>
      <div @click="editClick" class="cell-input" :style="contstyle">
        {{value}}
        <slot></slot>
      </div>
      <div @click="editClick" v-if="showEdit" class="toEdit">
        <i class="iconfont iconnext"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: false,
      default: "",
      type: String
    },

    title: {
      required: false,
      default: "",
      type: String
    },
    titlestyle: {
      required: false,
      default: "",
      type: String
    },
    contstyle: {
      required: false,
      default: "",
      type: String
    },

    borderbottom: {
      required: false,
      default: "border-bottom",
      type: String
    },

    imgUrl: String,
    showEdit: Boolean,
    cellstyle: String
  },
  data() {
    return {};
  },

  mounted() {},
  computed: {},
  watch: {},

  methods: {
    editClick() {
      if (this.showEdit) {
        this.$emit("editClick");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.container-padding {
  background: #ffffff;
  padding: 0 0.267rem;
}
.cell-container {
  font-size: 0.453rem;
  display: flex;
  padding: 0.3rem 0;
  align-items: center;

  .title {
    color: #999999;
    width: 34%;
  }

  .cell-input {
    text-align: left;
    color: #333333;
    flex: 1;
  }
}

.border-bottom {
  border-bottom: 0.013rem solid #e5e5e5;
}

.toEdit {
  display: flex;
  align-items: center;
  color: #108bf7;
  font-size: $px30;
  span {
    color: #c7c7cc;
    font-size: $px24;
  }
}

.icon {
  width: $px40;
  margin-right: $px22;
  img {
    width: 100%;
  }
}
</style>

