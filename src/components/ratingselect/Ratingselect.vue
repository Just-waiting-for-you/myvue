<template>
    <div class="ratingselect">
      <div class="rating-type">
        <span class="block positive">{{desc.all}}<span class="count">47</span></span>
        <span class="block positive">{{desc.positive}}<span class="count">40</span></span>
        <span class="block negative">{{desc.negative}}<span class="count">47</span></span>
      </div>
      <div class="switch">
        <span class="icon-check_circle"></span>
        <span class="text">只看有内容的评价</span>
      </div>
    </div>
</template>

<script>
  const POSITIVE=0;
  const NEGATIVE=1;
  const ALL=2;
  export default{
      //变量
      props:{
          ratings:{
              type:Array,
              default(){ //默认
                  return [];
              }
          },
        selectType:{
              type:Number,
              default:ALL //默认选择的是所有全部
        },
        onlyContent:{
              type:Boolean,
              default:false //默认
        },
        desc:{
              type:Object,
              default(){ //默认
                  return{
                      all:"全部",
                      positive:"满意",
                      negative:"不满意"
                  }
              }
        }
      }
  }
</script>

<style>
  .ratingselect{

  }
  .ratingselect .rating-type{
    padding: 0.36rem 0;
    margin:0 0.36rem;
    border-bottom:1px solid rgba(7,17,27,0.1);
    font-size: 0;/*因为block有一些间隙问题，所以要写font-size:0*/
  }
  .ratingselect .rating-type .block{
    display: inline-block;
    padding: 0.16rem 0.24rem;
    margin-right: 0.16rem;
    border-radius: 0.1rem;
    font-size: 0.24rem;

  }
  .ratingselect .rating-type .count{
    margin-left: 0.4rem;
    font-size: 0.16rem;
  }
  .ratingselect .rating-type .block.positive{
    background: rgba(0,160,220,0.2);
  }
  .ratingselect .rating-type .block.negative{
     background: rgba(7,85,93,0.2);
   }
  .ratingselect .switch{}
  .ratingselect{}
  .ratingselect{}
</style>
