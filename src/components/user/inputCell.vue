<template>
    <div class="container-padding">
        <div class="cell-container" :class="borderbottom!='border-bottom'?'':'border-bottom'">
            <span v-if="isRequired" class="star">*</span>
            <div v-if="title" class="title" v-html="title" :style="titlestyle"></div>
            <div class="cell-input">
                <textarea
                    ref="cellRef"
                    v-if="celltype=='textarea'"
                    style="width:90%"
                    :placeholder="placeholder"
                    rows="1"
                    v-model="inputval"
                    @focus="setFocus"
                    @blur="setBlur"
                ></textarea>
                <input
                    ref="cellRef"
                    :type="valueType!='' ? valueType: 'text'"
                    v-if="celltype!='textarea'"
                    style="width:90%"
                    :style="(ifreadonly?'color:#999;':'') + inputStyle"
                    :readonly="ifreadonly"
                    :placeholder="placeholder"
                    v-model="inputval"
                    @focus="setFocus"
                    @blur="setBlur"
                />
                <div v-show="showdel && !ifreadonly" @click="del">
                    <i class="icon iconfont icondelete"></i>
                </div>
                <div v-if="showGenduo">
                    <i style="color:#c7c7cc" class="icon iconfont icongengduo"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from "fx-mui";
import { blurAdjust } from "@/utils/handler";
export default {
    props: {
        ifreadonly: {
            required: false,
            default: false,
            type: Boolean
        },
        ifrequire: {
            required: false,
            default: false,
            type: Boolean
        },
        isRequired: Boolean,
        title: {
            required: false,
            default: "",
            type: String
        },
        placeholder: {
            required: false,
            default: "",
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
        titlestyle: {
            required: false,
            default: "",
            type: String
        },
        celltype: {
            required: false,
            default: "",
            type: String
        },
        valueType: {
            required: false,
            default: "",
            type: String
        },
        valify: {
            required: false,
            default: "",
            type: String
        },
        autoFoucs: Boolean,
        inputStyle: String,
        showGenduo: Boolean
    },
    data() {
        return {
            inputval: this.value,
            showdel: false
        };
    },

    mounted() {
        if (this.autoFoucs) {
            this.$refs.cellRef.focus();
        }
        let el = document.getElementsByTagName("textarea")[0];
        if (el) {
            this.autoTextarea(el);
        }
    },
    computed: {},
    watch: {
        inputval(val) {
            if (val != "") {
                this.showdel = true;
            }
            if (val == "") {
                this.showdel = false;
            }

            this.$emit("input", val);
        }
    },

    methods: {
        del() {
            this.inputval = "";
            this.showdel = false;
        },

        setBlur() {
            console.log("blur");
            blurAdjust();
            this.showdel = false;
            if (this.valify != "") {
                //验证手机号码
                if (this.valify == "phone") {
                    if (!/^1[3456789]\d{9}$/.test(this.inputval)) {
                        Toast("手机号码格式不正确");
                    }
                }
            }
        },

        setFocus() {
            this.showdel = true;
        },
        /**
         * 文本框根据输入内容自适应高度
         * @param                {HTMLElement}        输入框元素
         * @param                {Number}                设置光标与输入框保持的距离(默认0)
         * @param                {Number}                设置最大高度(可选)
         */
        autoTextarea(elem, extra, maxHeight) {
            extra = extra || 0;
            var addEvent = function(type, callback) {
                    elem.addEventListener
                        ? elem.addEventListener(type, callback, false)
                        : elem.attachEvent("on" + type, callback);
                },
                getStyle = elem.currentStyle
                    ? function(name) {
                          var val = elem.currentStyle[name];

                          if (name === "height" && val.search(/px/i) !== 1) {
                              var rect = elem.getBoundingClientRect();
                              return (
                                  rect.bottom -
                                  rect.top -
                                  parseFloat(getStyle("paddingTop")) -
                                  parseFloat(getStyle("paddingBottom")) +
                                  "px"
                              );
                          }

                          return val;
                      }
                    : function(name) {
                          return getComputedStyle(elem, null)[name];
                      },
                minHeight = parseFloat(getStyle("height"));

            elem.style.resize = "none";

            var change = function() {
                var scrollTop,
                    height,
                    padding = 0,
                    style = elem.style;

                if (elem._length === elem.value.length) return;
                elem._length = elem.value.length;
                padding =
                    parseInt(getStyle("paddingTop")) +
                    parseInt(getStyle("paddingBottom"));
                scrollTop =
                    document.body.scrollTop ||
                    document.documentElement.scrollTop;

                elem.style.height = minHeight + "px";
                if (elem.scrollHeight > minHeight) {
                    if (maxHeight && elem.scrollHeight > maxHeight) {
                        height = maxHeight - padding;
                        style.overflowY = "auto";
                    } else {
                        height = elem.scrollHeight - padding;
                        style.overflowY = "hidden";
                    }
                    style.height = height + extra + "px";
                    scrollTop += parseInt(style.height) - elem.currHeight;
                    document.body.scrollTop = scrollTop;
                    document.documentElement.scrollTop = scrollTop;
                    elem.currHeight = parseInt(style.height);
                }
            };

            addEvent("propertychange", change);
            addEvent("input", change);
            addEvent("focus", change);
            change();
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
    font-size: 0.453rem;
    display: flex;
    padding: 0.3rem 0;
    align-items: center;

    .title {
        width: 34%;
        color: #333333;
    }

    .cell-input {
        display: flex;
        justify-content: space-between;
        flex: 1;
        input {
            &::placeholder {
                color: #cccccc;
            }
        }
    }
}

.border-bottom {
    border-bottom: 0.013rem solid #e5e5e5;
}

textarea {
    border: none;
    &::placeholder {
        color: #cccccc;
    }
}

.star {
    position: absolute;
    left: -$px16;
    top: $px18;
    color: red;
}
</style>

