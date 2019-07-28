<template>
    <div>
        <keep-alive v-if="$route.meta.keepAlive">
            <router-view></router-view>
        </keep-alive>
        <router-view v-else></router-view>  
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
