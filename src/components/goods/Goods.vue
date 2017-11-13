<template>
    <div class="goods" v-if="goods!=null">
        <!--左边-->
        <div class="menu-wrapper" ref="menuWrapper">
          <ul>
            <!--当currentIndex与index相等的时候，设置高亮-->
            <li class="menu-item" v-for="(good,index) in goods" :class="{current:menuCurrIndex === index}">
              <span class="text">
                <span v-show="good.type>=0" class="icon" :class="picMap[good.type]"></span>
                {{good.name}}
              </span>
            </li>
          </ul>
        </div>
        <!--右边-->
        <div class="goods-wrapper" ref="goodsWrapper">
          <ul>
            <li class="food-list" v-for="good in goods"  >
              <h1 class="title">{{good.name}}</h1>
              <ul>
                <li class="food-item" v-for="food in good.foods" @click="selectFood(food,$event)"><!--点击每个food出现商品详情页-->
                  <div class="pic">
                    <img :src="food.icon" alt="">
                  </div>
                  <div class="content">
                    <h2 class="name">{{food.name}}</h2>
                    <p class="desc" v-if="food.description"><span>{{food.description}}</span></p>
                    <div class="income">
                      <span class="count">月售{{food.sellCount}}</span>
                      <span >好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                      <span class="now">￥{{food.price}}</span>
                      <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <!-- + 或 - 数量的容器-->
                    <div class="cartopp-wrapper">
                      <!--组件-->
                      <cartopp :food="food"><!--：food=food 第二个food是这里的数据 绑定子容器的Cartopp里的food， 父组件调用子组件，通过绑定food（第一个food）属性，将方法传给子组件--></cartopp>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      <div class="clear"></div>
      <!--购物车组件-->
      <shopcart  :selectFoods="selectFoods"></shopcart> <!--//v-ref接口ref="shopcart"-->

      <!--商品详情页组件-->
      <food :food="selectedFood" ref="food"></food><!--属性：food （要和子组件的props的名字一致）；变量：selectedFood ；ref="food" 调用子组件的方法接口-->
    </div>
</template>

<script>

  import axios from "axios";
  //引入滚动插件
  import BetterScroll from 'better-scroll';
  //引入加减购物组件
  import Cartopp from '../cartopp/Cartopp.vue';
  //引入底部加入购物车组件
  import Shopcart from "../shopcart/Shopcart.vue";
  //引入商品详情页组件
  import Food from "../food/Food.vue";

  export default{
      //变量
    data(){
        //初始化化一些数据
      return{
          goods:null,
          //小图片
          picMap:["decrease", "discount", "guarantee", "invoice", "special"],
          menuScroll: null, //Goods右边内容滚动
          goodsScroll: null, //Goods左边内容滚动
          scrollY:0,
          foodsHeight:[],
          selectedFood:{} //商品详情页
      }
    },
    //组件
    components:{
      Cartopp,  //加减
      Shopcart ,  //购物车
      Food       //商品详情页
    },
    created(){
        let that=this;
        axios.get("http://localhost:8080/api/goods")
          .then((res)=>{
            console.log(res);
            that.goods=res.data.data;//dom结构加载结束
            //滚动
            that.$nextTick(()=>{//保证数据更新后引起的DOM更新之后会调用
                //Goods右边内容滚动
                that.menuScroll = new BetterScroll(that.$refs.menuWrapper, {
                  click: true
                });
                //Goods左边内容滚动
                that.goodsScroll = new BetterScroll(that.$refs.goodsWrapper, {
                  click: true,
                  probeType:3
                });

                that.goodsScroll.on("scroll",(pos)=>{
                    that.scrollY=Math.abs(Math.round(pos.y));
                });
                //计算高度 调用方法
                that.calcHeight();
            });

          }).catch((error)=>{
            console.log(error);
        });
    },
    //方法
    methods:{
        //计算高度
        calcHeight(){
            let foodList=this.$refs.goodsWrapper.getElementsByClassName("food-list");
            let height=0;
            //console.log(foodList.length);
            this.foodsHeight.push(height);
            for(let i=0;i<foodList.length;i++){
                let obj=foodList[i];
                height+=obj.clientHeight;
                this.foodsHeight.push(height);
                //console.log(this.foodsHeight);
            }
        },
        //商品详情页的点击事件
        selectFood(food,event) {
            if(!event._constructed){
                return;
            }
            this.selectedFood=food; //点击调用selectFood方法时，将点击的每个food信息传给selectedFood变量，在传给组件food里

            this.$refs.food.show();//调用子组件的show 方法；
        }

        /*//drop方法 小球
        _drop(target){
          this.$refs.shopcart.drop(target);
        }*/
    },
  //计算属性
    computed:{
        menuCurrIndex(){
            for(let i=0;i<this.foodsHeight.length;i++){
                let h1=this.foodsHeight[i];
                let h2=this.foodsHeight[i+1];
                if(this.scrollY>h1&&this.scrollY<h2){
                    return i;
                }
            }
            return 0;
        },
        //购物车属性  和右边的food-list 和 food-item 有关
        selectFoods(){
            let myfoods=[];
            //遍历goods  goods 是所有数据
            this.goods.forEach((good)=>{
                //遍历good.foods
                good.foods.forEach((food)=>{
                    if(food.count){//加减数量的数值 如果有值或大于0，就push到
                        myfoods.push(food);
                    }
                });
            });
            return myfoods;

      }
    }
   /* //小球事件，传cartopp组件里
    events:{
        "cart-add"(target) {
          this._drop(target);
        }
    }*/
  }
</script>

<style>
  .goods{display: flex;flex-flow: row nowrap;justify-content: space-between;overflow: hidden;height: 9.5rem}
  /*左边菜单选项css*/
  .goods .menu-wrapper{flex: 1.6rem;flex-flow: column nowrap;}
  .goods .menu-wrapper {width: 100%;height:100%;}
  .goods .menu-wrapper .menu-item{background: #f3f5f7;height:1.08rem;padding: 0 0.12rem;display: table;}
  .goods .menu-wrapper .menu-item.current{background:#fff;z-index: 10;}
  .goods .menu-wrapper .menu-item .text{position: relative;font-size: 0.24rem;font-weight: 200;display: table-cell;vertical-align: middle;border-bottom: 1px solid rgba(7,17,27,0.1);}
  .goods .menu-wrapper .menu-item.current .text{border-bottom: none;}
  .goods .menu-wrapper .menu-item .text .icon{vertical-align: top;width:0.24rem;height:0.24rem;display: inline-block;margin-right: 0.06rem;}
  .goods .menu-wrapper .menu-item .text .icon.decrease{background: url(images/decrease_3@2x.png) no-repeat;background-size: 0.24rem 0.24rem;}
  .goods .menu-wrapper .menu-item .text .icon.discount{background: url(images/discount_3@2x.png) no-repeat;background-size: 0.24rem 0.24rem;}
  .goods .menu-wrapper .menu-item .text .icon.guarantee{background: url(images/guarantee_3@2x.png) no-repeat;background-size: 0.24rem 0.24rem;}
  .goods .menu-wrapper .menu-item .text .icon.invoice{background: url(images/invoice_3@2x.png) no-repeat;background-size: 0.24rem 0.24rem;}
  .goods .menu-wrapper .menu-item .text .icon.special{background: url(images/special_3@2x.png) no-repeat;background-size: 0.24rem 0.24rem;}

  /*右边食物列表css*/
  .goods .goods-wrapper{flex: 5.9rem;}
  .goods .goods-wrapper .food-list{width:100%;height: 100%;}
  .goods .goods-wrapper .food-list .title{font-size: 0.24rem;color:rgb(147,153,159);line-height: 0.52rem;padding-left:0.24rem;height: 0.52rem;border-left: 2px solid #d9dde1;background: #f3f5f7;}
  .goods .goods-wrapper .food-list .food-item{margin:0.36rem; display: flex;flex-flow: row nowrap;border-bottom: 1px solid rgba(7,17,27,0.2);position: relative;}
  .goods .goods-wrapper .food-list .food-item:last-child{border-bottom: none;}
  /*图片*/
  .goods .goods-wrapper .food-list .food-item .pic{background:#ddd;width:1.14rem; height:1.14rem;float: left;margin-right: 0.2rem;}
  .goods .goods-wrapper .food-list .food-item .pic img{width: 100%;height: 100%;}
  /*内容*/
  .goods .goods-wrapper .food-list .food-item .content{float: left; }
  .goods .goods-wrapper .food-list .food-item .content .name{margin-top:0.04rem;font-size: 0.28rem;color:rgb(7,17,27);line-height:0.28rem;height: 0.28rem; }
  .goods .goods-wrapper .food-list .food-item .content .desc{font-size: 0.2rem;color: rgb(147,153,159);line-height: 0.2rem;margin-top: 0.16rem;}
  .goods .goods-wrapper .food-list .food-item .content .income{font-size: 0.2rem;color: rgb(147,153,159);line-height: 0.2rem;height: 0.2rem;margin: 0.16rem 0;}
  .goods .goods-wrapper .food-list .food-item .content .income .count{margin-right: 0.24rem;display: inline-block}
  .goods .goods-wrapper .food-list .food-item .content .price{height: 0.48rem;font-weight:700;font-style: normal;margin-top:0.16rem;}
  .goods .goods-wrapper .food-list .food-item .content .price .now{font-size: 0.28rem;color:rgb(240, 20, 20);}
  .goods .goods-wrapper .food-list .food-item .content .price .old{font-size: 0.2rem;color:rgb(147,153,159);text-decoration: line-through;}
    /*加减版块css*/
  .goods .goods-wrapper .food-list .food-item .content .cartopp-wrapper{position: absolute;bottom: 0;right: 0;}

  .clear{clear:both}
</style>
