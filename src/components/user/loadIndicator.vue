<template>
 <div class="indicatorself" v-show="ifshow">
    <p><img :src="require('@/assets/img/loadmsg.gif')"></p>
    <p>{{indMsg}}</p>
  </div> 
</template>

<script>
export default {
  props: {
    ifshow:true,
    indMsg:''

  },
  methods: {

  }

};
</script>

<style scoped lang="scss">
.indicatorself{
  position: fixed;
  width: 4rem;
  height: 3rem;
  margin: auto;
  left: 3.2rem;
  background: rgba(#000000, 0.5);
  border-radius: .2rem;
  top:26%; 
  img{
    width: .8rem;
    height: .8rem;
    margin:.4rem auto;
  }
  p{
    text-align: center;
    width: 100%;
    margin: .2rem 0;
    color:#fff;
  }
}




</style>
