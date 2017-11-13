<template>
    <div class="shopcart" v-if="seller">
      <div class="content" @click="toggleList">
        <!--左边购物车内容及价格-->
        <div class="content-left" >
          <!--购物车图片版块-->
          <div class="logo-wrapper">
            <div class="logo"  :class="{highlight:totalCount>0}">
              <i class="icon-shopping_cart" :class="{highlight:totalCount>0}"></i>
            </div>
            <!--购物车图片版块  end-->
            <!--把添加购物车的数量显示在logo头部位置-->
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight:totalCount>0}">￥{{totalPrice}}元</div>
          <div class="deliveryPrice">另需配送费￥{{seller.deliveryPrice}} 元</div>
        </div>
        <!--左边购物车内容及价格  end-->
        <!--右边派送内容-->
        <div class="content-right" @click.stop.prevent="payMoney">  <!--.stop.prevent 阻止冒泡-->
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>

        </div>
      </div>
      <!--右边派送内容  end-->
      <!--动画小球的效果  需要两层-->
      <!--<div class="ball-container">
        <transition name="fade" v-for="ball in balls"  @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div v-show="ball.show" class="ball">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>-->

      <!--购物车详情-->
      <div class="shopcart-list" v-show="listShow" transition="fold">
        <!--头部-->
        <div class="list-header">
          <div class="title">购物车</div>
          <span class="empty" @click="emptyAll">清空</span>
        </div>
        <!--头部 end-->
        <!--内容-->
        <div class="list-content"  ref="listContent">
          <ul>
            <li class="food clearfix" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="cartopp-wrapper">
                <cartopp :food="food"></cartopp>
              </div>
            </li>
          </ul>
        </div>
        <!--内容  end-->
      </div>
      <!--购物车详情  end-->
      <div class="shop-mask" v-show="listShow"></div>
    </div>

</template>

<script>
  import axios from "axios";//导入axios
  //引入加减购物组件
  import Cartopp from '../cartopp/Cartopp.vue';
  //引入滚动插件
  import BetterScroll from 'better-scroll';

  export default{
    data(){
      return {
        seller: null,
        minP: 20,  //初始化minP =20
        balls: [{show: false}, {show: false}, {show: false}, {show: false}, {show: false}],
        dropBalls: [],
        fold: true, //购物车折叠
        scroll:null

      }
    },
    props: ["selectFoods"],//接收父容器（Goods.vue）传来的selectFoods数据 <shopcart :selectFoods="selectFoods"></shopcart>
    //selectFoods传来的是一个foods数组  foods里是goods的数据

    //计算属性方法
    computed: {
      //计算添加购物车的数量
      totalCount(){
        let count = 0; //刚开始数量为0
        this.selectFoods.forEach((food) => {
          //console.log(this.selectFoods)
          count += food.count; //每次添加1food.count的数量（1）或减（1）；font.count在Cartopp里由加减两个click事件控制添加的数量
          //console.log(food.count);
        });
        return count;
      },
      //计算总钱数 = 数量 * 价钱
      totalPrice(){
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;

      },

      //右边结算 三种情况：1.未选中商品时 ，显示：“￥20元起送” 2.选中商品：（1）不够20元派送钱数  显示：“还差xx元起送” （2）达到20元  显示：”去结算“
      payDesc(){
        if (this.totalPrice == 0) {
          return `￥${this.minP}元起送`; // `$` 等同于字符串("+")拼接 ==》 "￥" + this.minP + "元起送" ;
        } else if (this.totalPrice < this.minP) {
          let diff = this.minP - this.totalPrice;  //差值 计算还差多少钱派送=  最低派送的钱数 - 总钱数
          return `还差￥${diff}元起送`;
        } else {
          return "去结算";
        }
      },

      //样式class ：两种情况：1.钱数不够，显示灰色   2.钱数够了 ，显示绿色
      payClass(){
        if (this.totalPrice < this.minP) {
          return "not-enough";
        } else {
          return "enough";
        }
      },

      //购物车展开和折叠   逆向思维，定义的true 为折叠  ，所以 ！fold 为 展开
      listShow(){
        if (!this.totalCount) {  //如果没有选中商品
          this.fold = true; //折叠
          return false;
        } else {
          let show = !this.fold;
          if(show){
            this.$nextTick(()=>{
              if(!this.fold) {   //滑动
                this.scroll = new BetterScroll(this.$refs.listContent, {
                  click: true
                })
              }
            })
          }
          return show;
          }
        },

    },
    //方法
    methods:{
          //小球
      /* //小球  找到隐藏的小球
      drop(el) {
        //触发一次事件就会将所有小球进行遍历
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) { //将false的小球放到dropBalls
            ball.show = true;
            ball.el = el; //设置小球的el属性为一个dom对象
            this.dropBalls.push(ball);
            return;
          }
        }
      },

      beforeEnter(el){ //这个方法的执行是因为这是一个vue的监听事件
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect(); //获取小球的相对于视口的位移(小球高度)
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22); //负数,因为是从左上角往下的的方向
            el.style.display = ''; //清空display
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            //处理内层动画
            let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },

      enter(el, done) { //这个方法的执行是因为这是一个vue的监听事件
        /!* eslint-disable no-unused-vars *!/
        let rf = el.offsetHeight; //触发重绘html
        this.$nextTick(() => { //让动画效果异步执行,提高性能
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          //处理内层动画
          let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done); //Vue为了知道过渡的完成，必须设置相应的事件监听器。
        });
      },

      afterEnter(el) { //这个方法的执行是因为这是一个vue的监听事件
        let ball = this.dropBalls.shift(); //完成一次动画就删除一个dropBalls的小球
        if (ball) {
          ball.show = false;
          el.style.display = 'none'; //隐藏小球
        }
      }*/

     //折叠展开的方法
      toggleList(){
          if(!this.totalCount){
            //如果没有选中商品 就不展开  fold=true
              return;
          }else{
            //否则 就fold=false 展开
            this.fold=!this.fold;
          }
      },
      //清空购物车
      emptyAll(){
          //console.log("run")
          this.selectFoods.forEach((food)=>{
              food.count=0;
          })
      },
      //去结算
      payMoney(){
          if(this.totalPrice<this.minP){
              return;
          }else{
              window.alert(`支付${(this.totalPrice)+(this.seller.deliveryPrice)}元`)
          }
      }
    },
    created(){
          let that=this;
          axios.get("http://localhost:8080/api/seller").then((res)=>{
              //console.log(res);
              that.seller=res.data.data;
              that.minP=that.seller.minPrice;
            //取出seller里面的minPrice 最低价钱的数据20，保存在minP里面。为了方便上面使用

              console.log(that.minP)
          }).catch((error)=>{
              console.log(error);
          })
    },
    components:{
      Cartopp
    }

  }
</script>

<style>
  .shopcart{position: fixed;bottom: 0;left: 0;background:#141d27;width: 100%;z-index:50;height: 0.96rem;}
  .shopcart .content{display: flex;background: #141d27;color: rgba(255,255,255,0.4);font-size:0}
  /*左边购物车内容及价格 css*/
  .shopcart .content .content-left{flex:5.4rem;}
  /* 购物车图片版块*/
  .shopcart .content .content-left .logo-wrapper{width: 0.88rem;height: 0.88rem;margin:0 0.3rem;position: relative;top: -0.2rem;padding: 0.12rem;border-radius: 50%;background: #141d27;display: inline-block;}
  .shopcart .content .content-left .logo-wrapper .logo{width: 100%;height:100%;border-radius: 50%;background: #2b343c;text-align: center;}
  .shopcart .content .content-left .logo-wrapper .logo.highlight{background:rgb(0,160,220);} /* 高亮效果*/
  .shopcart .content .content-left .logo-wrapper .logo .icon-shopping_cart{font-size: 0.48rem;line-height: 0.88rem;height: 0.72rem;color: #80858a;}
  .shopcart .content .content-left .logo-wrapper .logo .icon-shopping_cart.highlight{color: #fff;}/* 高亮效果*/
  .shopcart .content .content-left .logo-wrapper .num{position: absolute;top: 0;right: 0;width: 0.48rem;height: 0.36rem;line-height: 0.36rem;text-align: center;border-radius: 0.36rem;font-size: 0.18rem;font-weight: 700;color: #fff;background: rgb(240,20,20);box-shadow: 0 0.8rem 0.16rem rgba(0,0,0,0.4);}

  .shopcart .content .content-left .price{vertical-align:top;display: inline-block;margin-top:0.24rem;font-size: 0.2rem;font-weight: 700;border-right: 1px solid rgba(255,255,255,0.1);padding-right: 0.2rem;line-height: 0.48rem;height: 0.48rem;}
  .shopcart .content .content-left .price.highlight{color:#fff;}/* 高亮效果*/
  .shopcart .content .content-left .deliveryPrice{display: inline-block; margin: 0.24rem 0 0 0.2rem;font-size: 0.2rem;font-weight:700;line-height: 0.48rem;height: 0.48rem;vertical-align: top;}

  /*右边派送内容css*/
  .shopcart .content .content-right{flex: 2.1rem;font-weight:700;background: #2b333b; }
  .shopcart .content .content-right .pay{text-align: center;line-height: 0.96rem;font-size: 0.24rem;}
  .shopcart .content .content-right .pay.not-enough{background: #2b333b;}
  .shopcart .content .content-right .pay.enough{background: #00b43c;color:#fff;}

  /*小球*/
 /* .shopcart .ball-container{}
  .shopcart .ball-container .ball{position:fixed;left: 0.32rem;bottom:0.22rem;z-index:200;}
  .shopcart .ball-container .ball.drop-transition{transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)}
  .shopcart .ball-container .ball .inner{width: 0.16rem;height: 0.16rem;border-radius:50%;background:rgb(0,160,220);transition: all 0.4s linear; }*/

  /*购物车详情版块css*/
  .shopcart .shopcart-list{position: absolute;left:0;top:-6.11rem;width:100%;z-index:-1;background: #fff;height: 6.11rem;}
  .shopcart .shopcart-list.fold-transition{transition: all 0.5s;transform: translate3d(0,-100%,0);}
  .shopcart .shopcart-list.fold-enter,.fold-leave{transform: translate3d(0,0,0);}
  /* 头部信息css*/
  .shopcart .shopcart-list .list-header{height:0.8rem;padding: 0 0.36rem;line-height: 0.8rem;border-bottom: 1px solid rgba(7,17,27,0.1);background: #f3f5f7;}
  .shopcart .shopcart-list .list-header .title{font-size:0.28rem;font-weight: 200;color:rgb(7,17,27);float: left;}
  .shopcart .shopcart-list .list-header .empty{font-size: 0.24rem;color:rgb(0,160,220);float: right;}
  /* 内容详情*/
  .shopcart .shopcart-list .list-content{max-height:5.15rem;padding: 0 0.36rem;background: #fff;overflow: hidden;}
  .shopcart .shopcart-list .list-content .food{border-bottom: 1px solid rgba(7,17,27,0.2);height: 0.96rem;position: relative;padding: 0.24rem 0;}
  .shopcart .shopcart-list .list-content .food .name{font-size: 0.28rem;color:rgb(7,17,27);line-height: 0.96rem;}
  .shopcart .shopcart-list .list-content .food .price{font-size: 0.2rem;font-weight: 700;color:rgb(240,20,20);position: absolute;right:1.8rem;bottom: 0.24rem;line-height: 0.96rem;}
  .shopcart .shopcart-list .list-content .food .cartopp-wrapper{position: absolute;right: 0;bottom: 0.4rem;line-height: 0.96rem;}


  .shopcart .shop-mask{position: fixed;top:0;left: 0;width: 100%;height: 100%;z-index: -2;background: rgba(7,17,27,0.6);filter:blur(0.1rem);}


</style>
