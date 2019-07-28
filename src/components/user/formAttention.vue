<template>
  <div class="container-padding">
    <div class="cell-container" v-html="title">
    </div>
  </div>
</template>

<script>
    export default {
        props:{
            title:{
                required:false,
                default:'',
                type:String,
            },
        },
        data() {
            return {
            }
        },
        mounted(){
        },
        computed:{
        },
        watch:{
        },

        methods: {
        },
    }
</script>
<style lang="scss" scoped>
   .container-padding{
        background: #ffffff;
        padding: 0 0.267rem;
    }
   .cell-container{
        padding: 0.453rem  0;
        font-size: 0.347rem;
        color: #999999;
   }

</style>

