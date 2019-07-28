<template>
    <div class="container-padding" :class="iffixed==true ? 'fixed fixed-bg':'' ">
        <div
            class="button"
            :class="disable?' disable':''"
            @click="btnclick"
            v-html="title"
            :style="btnstyle"
            v-if="btns.length == 0"
        ></div>
        <div class="btns"  v-else>
            <div
                class="btn"
                v-for="(item, index ) in btns"
                :key="index"
                :class="item.subbtn ? 'subbtn':''"
                @click="emitEvent(item.event)"
            >{{item.title}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            required: false,
            default: "",
            type: String
        },
        btns: {
            required: false,
            default: () => {
                return [];
            },
            type: Array
        },

        iffixed: {
            required: false,
            default: false,
            type: Boolean
        },
        btnstyle: {
            required: false,
            default: "",
            type: String
        },
        disable: Boolean
    },
    data() {
        return {};
    },
    mounted() {},
    computed: {},
    watch: {},

    methods: {
        btnclick() {
            if (this.disable) {
                return;
            }
            this.$emit("btnclick");
        },

        emitEvent(name) {
            this.$emit("btnclick", name);
        }
    }
};
</script>
<style lang="scss" scoped>
.fixed-bg{
    background: #fff;
}
.container-padding {
    padding: 0.2rem 0.267rem;
    margin-top: 0.667rem;
}

.button {
    text-align: center;
    color: #ffffff;
    height: 1.173rem;
    line-height: 1.173rem;
    background-color: #108bf7;
    border-radius: 0.133rem;
}

.btns {
    width: 100%;
    display: flex;
    justify-content: space-around;
    .btn {
        text-align: center;
        height: 1.173rem;
        line-height: 1.173rem;
        color: #ffffff;
        height: 1.173rem;
        line-height: 1.173rem;
        background-color: #108bf7;
        flex: 1;
        &.subbtn {
            color: #108bf7;
            background-color: #dcefff;
        }
        &:first-child {
            border-top-left-radius: 0.133rem;
            border-bottom-left-radius: 0.133rem;
        }
        &:last-child {
            border-top-right-radius: 0.133rem;
            border-bottom-right-radius: 0.133rem;
        }
    }
}

.fixed {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0.1rem;
}

.disable {
    background: #c8c9ca;
}
</style>

