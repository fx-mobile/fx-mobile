<template>
  <div class="container-padding">
    <div class="cell-container" :class="borderbottom!='border-bottom'?'':'border-bottom'" @click="openPicker">
        <div class="title" v-html="title"></div>
        <div class="cell-input"><input type="text" readonly :placeholder="placeholder" v-model="inputval"></div>
        <div><i class="icon iconfont icongengduo"></i></div>
    </div>

    <mt-datetime-picker
        ref="picker"
        type="date"
        cancelText="取消"
        confirmText="确定"
        v-model="pickerValue"
        :startDate="new Date()"
        @confirm="handleConfirm">
    </mt-datetime-picker>
  </div>
</template>

<script>
import { DatetimePicker } from 'fx-mui';
    export default {
        props:{
            ifreadonly:{
                required:false,
                default:false,
                type:Boolean,
            },
            ifrequire:{
                required:false,
                default:false,
                type:Boolean,
            },
            title:{
                required:false,
                default:'',
                type:String,
            },
            placeholder:{
                required:false,
                default:'',
                type:String, 
            },
            borderbottom:{
                required:false,
                default:'border-bottom',
                type:String

            },
            value:'',
        },
        data() {
            return {
              inputval:this.value,
              pickerValue:this.value=='' ? new Date() : new Date(this.value),

            }
        },

        mounted(){

        },
        computed:{
           

        },
        watch:{
          
        },

        methods: {
           openPicker(){
               this.$refs.picker.open();
           },

           handleConfirm(val){
               var dateObj = new Date(val);
               var y = dateObj.getFullYear();
               var m = dateObj.getMonth()+1;
               if(m<10){
                   m = '0' + m;
               }
               var d = dateObj.getDate();
               if(d<10){
                   d = '0' + d;
               }
               this.inputval = y+'-' + m +'-' + d;
               this.$emit('input' ,this.inputval);
           }

        


        },
    }
</script>
<style lang="scss" scoped>
   .container-padding{
        background: #ffffff;
        padding: 0 0.267rem;
    }
   .cell-container{
       font-size: 0.453rem;
       display: flex;
       padding: 0.3rem  0;
       align-items: center;
        .title{
           color: #999999;
           width: 34%;
        }

        .cell-input{
            flex: 1;
            input{
                &::placeholder{
                    color: #999999;
                }
            }
        }
   }

   .border-bottom{
        border-bottom:  0.013rem solid #e5e5e5;
    }

     .icongengduo{
        color:#c7c7cc;
    }
</style>

