<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div>
        <div class="food-content">
          <!--图片-->
          <div class="images-title">
            <img :src="food.image" alt="">
            <div class="back">
              <i class="icon-arrow_lift" @click="hide"></i>
            </div>
          </div>
          <!--内容-->
          <div class="con">
            <h1 class="name">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rat">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">￥{{food.price}}</span>
              <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="cartopp-wrapper">
              <cartopp :food="food"></cartopp>
            </div>
            <div class="buy" v-show="!food.count||food.count===0" @click.stop.prevent="addFirst">
              加入购物车
            </div>
          </div>
        </div>
        <lines v-show="food.info"></lines>
        <div class="info" v-show="food.info">
          <h1 class="title">商品介绍</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <lines v-show="food.info"></lines>
        <div class="ratings">
          <h1 class="title">商品评价</h1>
          <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings">
            <!--select-type... 要写成中划线的形式  把数据传一下-->
          </ratingselect>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  //引入滚动插件
  import BetterScroll from 'better-scroll';
  //引入加减组件
  import Cartopp from "../cartopp/Cartopp.vue";

  import Vue from "vue";
  //引入评价内容组件
  import Ratingselect from"../ratingselect/Ratingselect.vue";
  //引入双线
  import Lines from "../lines/Lines.vue";


//因为这个组件可能被多个地方引用，希望每次展示不同的状态,所以要初始化化一些状态
  const POSITIVE=0;
  const NEGATIVE=1;
  const ALL=2;
  export default{
      props:{
          food:{
              type:Object
          }
      },
    data(){
          return{
              showFlag:false,
              scroll:null,
            //挂载一些依赖跟踪
              selectType:ALL,
              onlyContent:true,//默认展示
            //描述
              desc:{
                  all:"全部",
                  positive:"推荐",
                  negative:"吐槽"
              },
            ratings:[]
          }
    },
    methods:{
        //点击food商品时候出现商品详情页面
        show(){
          //因为这个组件可能被多个地方引用，希望每次展示不同的状态,所以要初始化化一些状态
          this.selectType=ALL;
          this.onlyContent=true;

          this.showFlag=true;
          this.$nextTick(()=>{
              if(!this.scroll){
                  this.scroll=new BetterScroll(this.$refs.food,{
                      click:true
                  });
              }else{
                  this.scroll.refresh();
              }
          })
        },
      //点击返回图标的时候隐藏商品详情页面
        hide(){
            this.showFlag=false;
        },
      addFirst(event){ //如果没有传参数，event是默认参数

            if(!event._constructed){
                return;
            }else{
              Vue.set(this.food,"count",1);//第一次可能没有数
            }

      }
    },
    components:{
        Cartopp, //注册加减组件
        Ratingselect, //注册内容组件
        Lines //注册线组件
    }
  }
</script>

<style>
  .food{
    position: fixed;
    left:0;
    top: 0;
    bottom: 0.96rem;
    z-index: 30;
    width: 100%;
    background: #fff;
  }
  .move-enter-active, .move-leave-active{  /*v-enter-active/v-leave-active：定义过渡的状态。在元素整个过渡过程中作用，在元素被插入时生效(/在离开过渡被触发后立即生效，)，在 transition/animation 完成之后移除。这个类可以被用来定义过渡的过程时间，延迟和曲线函数。*/
    transition: all 0.2s linear;
    transform: translate3d(0,0,0);
  }
  .move-enter, .move-leave-to{  /* 动画的开始和结束的状态 v-enter/v-leave:定义进入(/离开)过渡的开始状态。在元素被插入时生效（/在元素整个过渡过程中作用），在下一个帧移除 ; v-leave-to/v-enter-to: 2.1.8版及以上 定义离开(/进入)过渡的结束状态。在离开过渡被触发一帧后生效 (于此同时 v-leave 被删除) /{/在元素被插入一帧后生效 (于此同时 v-enter 被删除)}，在 transition/animation 完成之后移除。*/
    transform: translate3d(100%,0,0);
  }
  .food .food-content{

  }
  .food .food-content .images-title{
    position: relative;
    width: 100%;
    height: 0;  /* 不能设置固定高度，*/
    padding-top: 100%; /*注：这样设置是为了让其与宽等宽，使容器的大小为100%*/

  }
  .food .food-content .images-title img{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .food .food-content .images-title .back{
    position: absolute;
    top: 0.15rem;
    left: 0;
  }
  .food .food-content .images-title .back .icon-arrow_lift{
    display: block;
    padding: 0.2rem; /*增大点击区域*/
    font-size: 0.4rem;
    color: #fff;
  }
  .food .food-content .con{
    padding: 0.36rem;
    position: relative;
  }
  .food .food-content .con .name{
    line-height: 0.28rem;
    margin-bottom: 0.16rem;
    font-size: 0.28rem;
    font-weight: 700;
    color:rgb(7,17,27)
  }
  .food .food-content .con .detail{
    margin-bottom: 0.36rem;
    line-height: 0.2rem;
    font-size: 0;
    height: 0.2rem;
  }
  .food .food-content .con .detail .sell-count,.rat{

    font-size: 0.2rem;
    color:rgb(147,153,159);

  }
  .food .food-content .con .detail .sell-count{
    margin-right: 0.24rem;
  }
  .food .food-content .con .price{
    font-weight: 700;
    line-height: 0.48rem;
    height: 0.48rem;
  }
  .food .food-content .con .price .now{
    font-size: 0.28rem;
    color:rgb(240,20,20);
  }
  .food .food-content .con .price .old{
    font-size: 0.2rem;
    color: rgb(147,153,159);
    text-decoration: line-through;
  }
  .food .food-content .cartopp-wrapper{
    position: absolute;
    right: 0.24rem;
    bottom: 0.24rem;
  }
  .food .food-content .buy{
    position: absolute;
    right: 0.36rem;
    bottom: 0.36rem;
    z-index: 10;
    height: 0.48rem;
    line-height: 0.48rem;
    padding: 0 0.24rem;
    box-sizing: border-box;
    border-radius: 0.24rem;
    font-size: 0.2rem;
    color: #fff;
    background: rgb(0,160,220);
  }
  .food .info{
    padding: 0.36rem;
  }
  .food .info .title{
    line-height: 0.28rem;
    margin-bottom: 0.12rem;
    font-size: 0.28rem;
    color: rgb(7,17,27);
    font-weight: 700;
  }
  .food .info .text{
    font-size: 0.24rem;
    font-weight: 200;
    color:rgb(77,66,93);
    line-height: 0.48rem;
    padding:0 0.16rem;
  }
  .food .ratings{padding: 0.36rem;}
  .food .ratings .title{
    line-height: 0.28rem;
    margin-left: 0.36rem;
    font-size: 0.28rem;
    color: rgb(7,17,27);
    font-weight: 700;
  }

</style>
