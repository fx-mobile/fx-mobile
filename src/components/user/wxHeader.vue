
<template>
    <div class="wx-header-wrap" v-if="show && type">
        <div class="wx-header">
            <span
                class="icon iconfont iconprevious_step left"
                v-if="showLeft"
                @click.stop="backClick"
            ></span>
            <span v-else class="left-holder"></span>
            <span class="left" v-if="showareaLeft" @click.stop="backselect"></span>
            <span class="title">{{metatitle}}</span>
            <span class="right" v-if="showRight"></span>
            <span v-else class="right-holder"></span>
            <span class="right-select" v-if="showSelect" @click.stop="filtrate">
                <i class="filtrate iconfont" :class="icon"></i>
                {{name}}
            </span>
            <span class="right-select" v-if="showAddProject" @click.stop="addProject">{{name}}</span>
        </div>
    </div>
</template>
<script>
import getPlatformType from "@/utils/getPlatformType";
export default {
    props: {
        title: {
            type: String,
            required: false,
            default:''
        },
        showLeft: Boolean,
        showRight: Boolean,
        showareaLeft: Boolean,
        showbusLeft: Boolean,
        showSelect: Boolean,
        showAddProject: Boolean,
        show: {
            type: Boolean,
            default: false,
            required: false
        },
        isFireBtnCallBack: {
            type: Boolean,
            required: false,
            default: false
        },
        name: {
            type: String,
            required: false
        },
        icon: {
            type: String,
            required: false
        },
        isFiltrate: {
            type: Boolean,
            required: false
        }
    },
    data() {
        return {
            type:
                getPlatformType() == "01" || getPlatformType() == "02"
                    ? true
                    : false,
            
            metatitle:'',
        };
    },
    
    mounted() {
       if(this.title!=''){
           this.metatitle = this.title;
       } else if(this.$route.meta.title){
           this.metatitle = this.$route.meta.title;
       }else{
           this.metatitle = '实名办税'
       }
    },

    methods: {
        backClick(evt) {
            if (this.isFireBtnCallBack == true) {
                this.$emit("backClick", evt);
            } else {
                console.log(
                    "beforeEnter",
                    this.$store.state.route.from.fullPath
                );
                // if (this.$store.state.route.from.fullPath == "/") {
                //     try {
                //         console.log("enter close");
                //         WeixinJSBridge.call("closeWindow");
                //     } catch (e) {
                //         console.log("WeixinJSBridge    undefined");
                //         try {
                //             parent.WeixinJSBridge.call("closeWindow");
                //         } catch (e) {
                //             console.log("parent.WeixinJSBridge    undefined");
                //         }
                //     }
                // } else {
                    this.$router.go(-1);
              //  }
            }
        },
        backselect: function() {
            this.$emit("backselect");
        },
        filtrate() {
            this.$emit("filtrate");
        },
        addProject() {
            this.$emit("addProject");
        }
    }
};
</script>

<style scoped>
.wx-header-wrap {
    /* height: 1.066667rem; */
    height: 1.333333rem;
    /* 100/75 */
    z-index: 9999;
}

.wx-header {
    height: 1.333333rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    color: #1b1b1b;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background-color: #ff7043; */
    background-color: #fff;
    z-index: 999;
    border-bottom: 0.013rem solid #e5e5e5;
}

.left {
    text-align: center;
    font-size: 0.48rem;
    /* 18/37.5 */
    color: #5e5e5e;
    margin-left:0.27rem;
}

.title {
    flex: 1;
    text-align: center;
    font-size: 0.4826rem;
    font-family: PingFang-SC-Medium;
    color: #333333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.right,
.right-holder,
.left-holder {
    text-align: right;
    width: 1.066667rem /* 40/37.5 */;
    text-align: center;
}

.right::after {
    font-family: "iconfont" !important;
    content: "\e657";
    font-size: 0.48rem;
    /* 18/37.5 */
}

.right-select {
    position: absolute;
    right: 0.45rem;
    font-size: 0.43rem;
    /* 16/37.5 */
    height: 1.333333rem;
    /* 40/37.5 */
    line-height: 1.333333rem;
    /* 40/37.5 */
}

.filtrate {
    position: relative;
    top: 0.08rem;
    /* 6/75 */
    font-size: 0.533333rem;
    /* 40/75 */
    color: #5e5e5e;
}
</style>
