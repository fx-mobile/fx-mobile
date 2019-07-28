<template>
    <div class="container-padding">
        <div
            class="cell-container"
            :class="borderbottom!='border-bottom'?'':'border-bottom'"
            @click="event"
        >
            <span v-if="isRequired" class="star">*</span>
            <div class="title" v-html="title" :style="titleStyle"></div>
            <div class="cell-input">
                <input
                    type="text"
                    @blur="setBlur"
                    v-model="pickval"
                    readonly
                    :placeholder="placeholder"
                />
            </div>
            <div>
                <i class="icon iconfont icongengduo"></i>
            </div>
        </div>
        <mt-datetime-picker
            v-if="pickerType"
            :type="pickerType"
            ref="picker"
            @confirm="handleConfirm"
            v-model="popupValue"
        ></mt-datetime-picker>
        <mt-popup v-else class="mtpop" v-model="popupVisible" position="bottom">
            <mt-picker :slots="slots" valueKey="name" :showToolbar="true" @change="onValuesChange">
                <slot>
                    <div class="toolbar">
                        <div class="left" @click="cancel">取消</div>
                        <div class="right" @click="commit">确定</div>
                    </div>
                </slot>
            </mt-picker>
        </mt-popup>
    </div>
</template>

<script>
import { Popup, Picker } from "fx-mui";
import { blurAdjust } from "@/utils/handler";
import { toDate } from "@/utils/toDatetime.js";

export default {
    props: {
        value: "",
        title: {
            required: false,
            default: "",
            type: String
        },
        titleStyle: {
            required: false,
            default: "",
            type: String
        },

        borderbottom: {
            required: false,
            default: "border-bottom",
            type: String
        },

        pickArr: {
            required: false,
            default: () => {
                return [];
            },
            type: Array
        },
        placeholder: {
            required: false,
            default: "",
            type: String
        },
        returnType: {
            required: false,
            default: "code",
            type: String
        },
        popupHide: Boolean,
        pickerType: String,
        isRequired: Boolean
    },
    data() {
        return {
            toggle: true,
            popupVisible: false,
            slots: [
                {
                    defaultIndex: this.setdefault(),
                    values: this.pickArr || []
                }
            ],

            pickval: "",
            pickItem: {},
            popupValue: ""
        };
    },

    created() {},

    mounted() {},

    methods: {
        setdefault() {
            if (this.pickArr.length > 0 && this.value != "") {
                if (typeof this.pickArr[0] == "string") {
                    for (var i in this.pickArr) {
                        if (this.pickArr[i] == this.value) {
                            return Number(i);
                        }
                    }
                } else if (this.pickArr[0] instanceof Object) {
                    for (var i in this.pickArr) {
                        if (this.pickArr[i].code == this.value) {
                            return Number(i);
                        }
                    }
                }
            } else {
                return Number(-1);
            }
        },

        cancel() {
            this.popupVisible = false;
        },

        commit() {
            this.popupVisible = false;
            this.$emit("confirm", this.pickItem);
        },

        onValuesChange(picker, values) {
            if (values[0]) {
                var backval = "";
                if (typeof this.pickArr[0] == "string") {
                    this.pickval = values[0];

                    backval = values[0];
                } else {
                    this.pickval = values[0].name;
                    backval = values[0].code;
                    this.pickItem = values[0];
                }

                if (this.returnType == "obj") {
                    this.$emit("setzw", values[0]);
                } else {
                    this.$emit("input", backval);
                }
            }
        },
        event() {
            if (this.popupHide) {
                this.popupVisible = false;
            } else {
                this.popupVisible = true;
            }
            if (this.pickerType) {
                this.open("picker");
            }
            this.$emit("click");
        },
        setBlur() {
            console.log("blur");
            blurAdjust();
        },
        open(picker) {
            this.$refs[picker].open();
        },
        handleConfirm(val) {
            this.pickval = toDate(val.toLocaleString().split(" ")[0]);
            this.$emit("getValue", this.pickval);
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
        color: #999999;
        width: 34%;
    }

    .cell-input {
        flex: 1;
        text-align: left;
        input[type="text"] {
            font-size: 0.453rem;
            color: #333333;
            &::placeholder {
                color: #cccccc;
            }
        }
    }
}

.border-bottom {
    border-bottom: 0.013rem solid #e5e5e5;
}

.icongengduo {
    color: #c7c7cc;
}
.mtpop {
    width: 100%;
}

.toolbar {
    display: flex;
    padding: 0.4rem;
    font-size: 0.453rem;
    justify-content: space-between;

    .left {
        color: #999999;
    }
    .right {
        color: #108bf7;
    }
}

.star {
    position: absolute;
    left: -$px16;
    top: $px18;
    color: red;
}
</style>

