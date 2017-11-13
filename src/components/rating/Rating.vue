<template>
    <div class="rating" v-if="seller" ref="rat">
      <div>
        <div class="foodScore">
          <!--左边评分信息-->
          <div class="score">
              <h2>{{seller.score}}</h2>
              <div  class="total">综合评分</div>
              <div  class="aside">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="line"></div>
          <!--右边服务评价及送达时间-->
          <div class="score-msg">
              <div class="server">
                <div class="text">服务态度</div>
                <div class="star-wrapper"></div>
                <div class="fs">{{seller.serviceScore}}</div>
              </div>
              <div class="server server1">
                <div class="text">食物评分</div>
                <div class="star-wrapper"></div>
                <div class="fs">{{seller.foodScore}}</div>
              </div>
              <div class="time">
                <div class="text">送达时间</div>
                <div class="s">{{seller.deliveryTime}}分钟</div>
              </div>
          </div>
        </div>
        <div class="clear"></div>
        <div class="rating-content">
          <div class="sel">
            <div class="all">全部</div>
            <div class="good">满意</div>
            <div class="bad">不满意</div>
            <div class="clear"></div>
            <div class="title">
              <i class="icon-check_circle"></i>
              <span>只看有内容的评价</span>
            </div>
          </div>

          <div class="content" v-if="ratings">
            <div class="con" v-for="rating in ratings">
                <div class="left">
                  <img :src="rating.avatar" alt="">
                </div>
                <div class="right">
                  <div class="username">{{rating.username}}</div>
                  <div class="star-w">
                    <div class="star">星星</div>
                    <span class="sd" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                  </div>
                  <div class="t">{{rating.rateTime | date}}</div>
                  <div class="tex">{{rating.text}}</div>
                  <div class="dianzan">
                    <i class="icon-thumb_down" ><!--:class="{'icon-thumb_down':icon-thumb_up}"--></i>
                    <div class="big">
                      <p>
                        大王香菇卤
                      </p>
                    </div>
                  </div>

                </div>


            </div>

          </div>
        </div>
        <div class="shop-cart">
          <!--<shopcart :selectFoods="selectFoods"></shopcart>-->
        </div>
      </div>
    </div>
</template>

<script>
  import axios from "axios";//引入异步请求
  //引入滚动插件
  import BetterScroll from 'better-scroll';

  export default{

    /*props:["seller"],*/

    //组件内部数据挂载时，返回对象放在data函数里，return 对象出来；
    data(){
      return{
        seller:null, //初始化数据
        ratings:null,
        time:[],
        ratScroll:null



      }
    },
    //钩子函数，当页面创建时加载数据
    created(){
      //console.log("app创建")
      let that=this;//axios里的this不是vue实例，所以不能直接访问，要在这里把this保存一下；
      axios.get("http://localhost:8080/api/seller")
        .then((res)=>{
          that.seller=res.data.data;//获取数据，并保存在seller里。其他页面引入就可以直接访问运用。
        })
        .catch((error)=>{
          console.log(error);
        });
      axios.get("http://localhost:8080/api/ratings")
        .then((res)=>{
          that.ratings=res.data.data;//获取数据，并保存在ratings里。其他页面引入就可以直接访问运用。
          console.log(that.ratings);
          that.time=new Date(res.data.data.rateTime).toLocaleString();

         that.$nextTick(()=>{
              that.ratScroll=new BetterScroll(that.$refs.rat, {
                click: true
              });
          })

        })
        .catch((error)=>{
          console.log(error);
        });
    },
    //过滤器 --将毫秒数转化为字符串，成为正常的时间格式
    filters:{
      date:(time)=>{
        return new Date(time).toLocaleString();
      }
    },
    methods:{


        //点赞
      toggleColor(){

      }/*,
      deliveryTime(){
          if(!this.ratings.deliveryTime){
              return this.time=`30分钟送达`;
          }else {
              return this.time=`${this.ratings.deliveryTime}分钟送达`;
          }
      }*/
    },
    computed:{
     /* that.$nextTick(()=>{
      that.ratScroll = new BetterScroll(that.$refs.rat, {
        click: true
      });
    })*/
    }

  }
</script>

<style>
    .rating{width: 100%;overflow: hidden;position: absolute;top:3.48rem;bottom:0.92rem;}
    .rating .foodScore{width:100%;height:auto;border-bottom:1px solid rgba(7,17,27,0.2);}
    /*左边评分信息css*/
    .rating .foodScore .score{float: left;width:2.75rem; margin:0.36rem 0;text-align: center;}
    .rating .foodScore .score h2{font-size: 0.48rem;color:rgb(255,153,0);line-height: 0.56rem;}
    .rating .foodScore .score .total{font-size: 0.24rem;color:rgb(7,17,27);line-height: 0.24rem;margin-top: 0.12rem;}
    .rating .foodScore .score .aside{font-size: 0.2rem;color:rgb(147,154,159);line-height: 0.2rem;margin:0.16rem 0 0.12rem 0;}
    /*线*/
    .rating .foodScore .line{width: 1px;border-left: 1px solid rgba(7,17,27,0.2);height: 1.4rem;position: absolute;top:3.84rem;left: 2.75rem;}
    /*右边服务评价及送达时间*/
    .rating .foodScore .score-msg{float: left;width: 4.2rem;margin:0.36rem 0rem;font-size: 0.24rem;color:rgb(7,17,27);line-height: 0.36rem;}
    /*服务评分css*/
    .rating .foodScore .score-msg .server{width:100%;height: 0.36rem}
    .rating .foodScore .score-msg .server .text{float: left;margin-left: 0.48rem;}
    .rating .foodScore .score-msg .server .star-wrapper{float: left;margin:0 0.24rem;}
    .rating .foodScore .score-msg .server .fs{float: right;color:rgb(255,153,0);margin-right: 0.48rem}
    .rating .foodScore .score-msg .server1{margin:0.16rem 0;}
    /*送达时间css*/
    .rating .foodScore .score-msg .time{height: 0.36rem;width:100%;margin:0 0.48rem;}
    .rating .foodScore .score-msg .time .text{float: left;}
    .rating .foodScore .score-msg .time .s{margin-left:0.24rem;float: left;color:rgb(147,153,159);}

    .clear{clear:both;}
    /*用户评价内容css*/
    .rating .rating-content{border-top:1px solid rgba(7,17,27,0.2);margin-top:0.4rem;width: 100%;}
    /*满意 不满意*/
    .rating .rating-content .sel{height:1.7rem;margin: 0 0.36rem; }
    .rating .rating-content .sel .all,.good,.bad{margin: 0.3rem 0.1rem;width: 0.9rem;height: 0.48rem;background:rgb(0,160,220);color:#fff;float: left;text-align: center;line-height: 0.48rem;font-size: 0.24rem;border-radius: 0.05rem;}
    .rating .rating-content .sel .good{float: left;background:rgba(0,160,220,0.5);}
    .rating .rating-content .sel .bad{float: left;background:rgba(7,17,27,0.3); }
    .clear{clear:both;}
    .rating .rating-content .sel .title{border-top:1px solid rgba(7,17,27,0.2);height: 0.7rem;font-size: 0.24rem;color:rgb(147,153,159)}
    .rating .rating-content .sel .title .icon-check_circle{font-size: 0.32rem;float: left;height: 0.7rem;line-height: 0.7rem;}
    .rating .rating-content .sel .title span{display: inline-block;height: 0.7rem;line-height: 0.7rem;float: left;margin-left: 0.2rem;}
    /*用户评价css*/
    .rating .rating-content .content{border-top:1px solid rgba(7,17,27,0.2);width: 100%;}
    .rating .rating-content .content .con{height: 2rem;border-bottom: 1px solid rgba(7,17,27,0.1);margin: 0.36rem;display: flex;}
    .rating .rating-content .content .con:last-child{border-bottom: none;}
    .rating .rating-content .content .con .left{width: 0.56rem;height: 0.56rem;flex: 0.56rem;float: left;}
    .rating .rating-content .content .con .left img{width: 100%;height: 100%;border-radius: 50%;}
    .rating .rating-content .content .con .right {flex:6.22rem;margin-left: 0.24rem;float: left;position: relative;}
    .rating .rating-content .content .con .right .username{font-size: 0.2rem;color:rgb(7,17,27);line-height: 0.24rem;height: 0.24rem;}
    .rating .rating-content .content .con .right .star-w{margin-top: 0.08rem;}
    .rating .rating-content .content .con .right .star-w .star{display: inline-block;}
    .rating .rating-content .content .con .right .star-w .sd{margin-right: 0.12rem;font-size: 0.2rem;font-weight: 200;color:rgb(147,153,159);line-height: 0.24rem;height: 0.24rem;}

    .rating .rating-content .content .con .right .t{position: absolute;top: 0;right: 0;font-size: 0.2rem;font-weight: 200;color:rgb(147,153,159);line-height: 0.24rem;}
    .rating .rating-content .content .con .right .tex{margin-top: 0.12rem;font-size: 0.24rem;color:rgb(7,17,27);line-height: 0.36rem;height: auto;}
    .rating .rating-content .content .con .right .dianzan{position: absolute;bottom:0.1rem;}
    .rating .rating-content .content .con .right .dianzan .icon-thumb_down{font-size: 0.24rem;color:rgb(183,187,191);line-height: 0.32rem;height: 0.32rem;margin-right: 0.16rem;}
    .rating .rating-content .content .con .right .dianzan .icon-thumb_down.icon-thumb_up{color:rgb(0,160,220);}
    .rating .rating-content .content .con .right .dianzan .big{border: 1px solid rgba(7,17,27,0.1);text-align: center;padding:0 0.12rem;display: inline-block;height: 0.32rem;line-height: 0.32rem;}
    .rating .rating-content .content .con .right .dianzan .big p{font-size: 0.18rem;display: block;color: rgb(147,153,159);}

    .rating .shop-cart{position: fixed;bottom: 0;left: 0;height: 1.16rem;}
</style>
