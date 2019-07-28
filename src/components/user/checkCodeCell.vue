<template>
  <div class="container-padding">
    <div
      class="cell-container"
      @click="$refs.input.focus()"
      :class="borderbottom!='border-bottom'?'':'border-bottom'"
    >
      <span v-if="isRequired" class="star">*</span>
      <div class="title" v-if="title!=''" v-html="title"></div>
      <div class="cell-input">
        <input
          ref="input"
          :type="checkType=='msg' ? 'number':'text'"
          v-model="codeval"
          :placeholder="placeholder"
        />
      </div>
      <div class="emphsis-color" v-if="checkType=='msg'" @click.stop="getMsgCode">{{desc}}</div>
      <div v-else class="img-code" @click.stop="refreshImgCode">
        <img class="refresh" :src="refreshImgsrc" />
      </div>
    </div>
  </div>
</template>

<script>
import { validation } from "@/utils/validation";
import sessionStorageUtil from "@/utils/sessionStorageUtil";
import { getUserInfo } from "@/assets/js/common";
import { customAsync } from "@/api/async";

export default {
  props: {
    checkType: {
      required: false,
      default: "msg", //code
      type: String
    },

    title: {
      required: false,
      default: "",
      type: String
    },

    placeholder: {
      required: false,
      default: "请输入验证码",
      type: String
    },

    borderbottom: {
      required: false,
      default: "border-bottom",
      type: String
    },
    value: {
      required: false,
      default: "",
      type: String
    },
    phoneNum: String,
    codeType: String,
    isRequired: Boolean
  },
  data() {
    return {
      codeval: this.value,
      desc: "获取验证码",
      imgcodesrc: "/app/base/captcha.do",
      refreshImgsrc: require("@/assets/img/refresh.png")
    };
  },

  mounted() {},
  computed: {},
  watch: {
    codeval(val) {
      console.log("val", val);
      this.$emit("input", val);
    }
  },

  methods: {
    getMsgCode() {
      let formCheck = validation([
        {
          required: true,
          nullMsg: "请输入手机号码",
          type: "mobilePhone",
          value: this.phoneNum
        }
      ]);
      if (!formCheck) {
        return;
      }
      if (this.desc == "获取验证码" || this.desc == "重新获取验证码") {
        this.getcode();
      } else {
        return;
      }
    },

    getcode() {
      let params = {
        phoneNum: this.phoneNum,
        bizCode: this.codeType
      };
      customAsync({
        that: this,
        method: "sendPhoneCaptcha",
        paramObj: params,
        callback: res => {
          // console.log("res", res);
          this.resetDesc();
        }
      });
    },

    resetDesc() {
      let self = this;
      self.desc = "60s";
      let count = 59;
      let timeInter = setInterval(function() {
        if (count > 0) {
          self.desc = count + "s";
          count--;
        } else {
          self.desc = "重新获取验证码";
          clearInterval(timeInter);
        }
      }, 1000);
    },

    refreshImgCode() {
      this.imgcodesrc =
        "/app/base/captcha.do" + "?refresh=" + Math.random(0, 1);
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
  position: relative;
  width: 100%;
  font-size: 0.453rem;
  display: flex;
  padding: 0.453rem 0;
  align-items: center;
  .title {
    color: #333333;
    width: 34%;
  }

  .cell-input {
    input {
      width: 2.8rem;
      &::placeholder {
        color: #cccccc;
      }
    }
  }
}

.emphsis-color {
  white-space: nowrap;
  color: #108bf7;
  flex: 1;
  text-align: right;
  margin-left: auto;
  max-width: 3.4rem;
}

.border-bottom {
  border-bottom: 0.013rem solid #e5e5e5;
}

.img-code {
  display: flex;
  img {
    margin-left: 0.167rem;
  }
  .code {
    width: 2rem;
    height: 0.72rem;
  }

  .refresh {
    width: 0.507rem;
    height: 0.533rem;
    margin-top: 0.093rem;
  }
}

img {
  pointer-events: none;
}

.star {
  position: absolute;
  left: -$px16;
  top: $px28;
  color: red;
}
</style>

