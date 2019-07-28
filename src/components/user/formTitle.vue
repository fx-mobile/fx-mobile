<template>
    <div class="cell-container">
        <p>{{title}}</p>
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
    }
</script>
<style lang="scss" scoped>
    .cell-container{
        font-size: 0.453rem;
        color: #333333;
        position: relative;
        padding: 0.453rem 0.267rem 0rem;
        background: #ffffff;
        &::before{
            content:'';
            display:inline-block;
            width: 0.107rem;
	        height: 0.4rem;
            position: absolute;
           
            top: 0.586rem;
            background-color: #088efb;
        }
        p{
            padding-left: .267rem;
        }
    }
  

</style>

