<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import VConsole from "vconsole";
import FXAPP from "@/assets/js/FXAPP_1.0";
import getPlatformType from "@/utils/getPlatformType";

export default {
    name: "app",
    data() {
        return {};
    },
    created() {
        if (getPlatformType() == "01" || getPlatformType() == "02") {
            FXAPP();
            if (getPlatformType() == "02") {
                window.FXAPP.initIosContext();
            }
        }

        try {
            if (process.env.NODE_ENV != "production") {
                new VConsole();
            }
        } catch (error) {}
    },

    mounted() {},

    methods: {},
    beforeDestroy() {},
    watch: {}
};
</script>

<style>
* {
    outline: none;
    -webkit-tap-highlight-color: transparent;
     touch-action: pan-y;
}

html,
body {
    height: 100%;
}

#app {
    /* 腾讯移动端字体方案 https://github.com/AlloyTeam/Mars/blob/master/solutions/font-family.md */
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
        "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    
}
@import url("//at.alicdn.com/t/font_1128862_6n9odh8i83l.css");
</style>
