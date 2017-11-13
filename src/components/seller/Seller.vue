<template>
    <div class="seller" v-if="seller" ref="seller"><!--滑动的外容器要找到高度-->
      <div><!--滑动的内容器 不用设置宽高-->
        <!--商品详情-->
        <div class="seller-xq">
          <div class="xq-wrapper">
            <div class="xq-up">
              <div class="up-l">
                <div class="name">{{seller.name}}</div>
                <div class="star-wrapper">
                  <div class="star"></div>
                  <span class="num">(661)</span>
                  <span class="Mon">月售690单</span>
                </div>
              </div>
              <div class="up-r">
                <i class="icon-favorite"></i>
                <div class="collect">已收藏</div>
              </div>
              <div></div>
            </div>
            <div class="xq-down">
              <div class="minPrice">
                <div class="text">起送价</div>
                <div class="min">{{seller.minPrice}}<span>元</span></div>
              </div>
              <div class="deliveryPrice">
                <div class="text">商家配送</div>
                <div class="del">{{seller.deliveryPrice}}<span>元</span></div>
              </div>
              <div class="time">
                <div class="text">平均配送时间</div>
                <div class="t">{{seller.deliveryTime}}<span>分钟</span></div>
              </div>
            </div>
          </div>

        </div>
        <!--商品详情 end-->
        <!--公告与活动版块-->
        <div class="seller-bulletin">
          <h2>公告与活动</h2>
          <div class="bulletin">{{seller.bulletin}}
            <ul class="supports">
              <li class="support" v-for="support in seller.supports">
                <i class="icon" :class="picMap[support.type]"></i>
                <span class="text">{{support.description}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="clear"></div>
        <!--公告与活动版块 end-->
        <!--商家实景版块-->
        <div class="seller-avatar">
          <h2>商家实景</h2>
          <div class="ava" ref="aa">
            <ul class="pics" >
              <li class="pic" v-for="pic in seller.pics">
                  <img :src="pic" alt="">
              </li>
            </ul>
          </div>
        </div>
        <div class="clear"></div>
        <!--商家实景版块 end-->
        <!--商家信息-->
        <div class="seller-info">
          <h2>商家信息</h2>
          <ul class="infos">
            <li class="info" v-for="info in seller.infos">{{info}}</li>
          </ul>
        </div>
        <!--商家信息 end-->
      </div>
    </div>
</template>

<script>
  import axios from "axios";
  //引入滚动插件
  import BetterScroll from 'better-scroll';
  export default{
    data(){
        return{
          seller:null,
          picMap : ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
          sellerScroll:null
        }
    },
    created(){
        let that=this;
        axios.get("http://localhost:8080/api/seller")
          .then((res)=>{
            //console.log(res);
            that.seller=res.data.data;
            that.$nextTick(()=>{
              that.sellerScroll=new BetterScroll(that.$refs.seller, {
                click: true
              });
              that.sellerScroll=new BetterScroll(that.$refs.aa, {
                scrollX: true

              });
            })
          })
          .catch((error)=>{
            console.log(error)
          })
    }

  };

</script>

<style>
  .seller{width: 100%;position: absolute;top:3.48rem;bottom:0.92rem;overflow: hidden;}/*滑动的外容器，*/
  .seller  h2{font-size: 0.28rem;color:rgb(7,17,27);line-height: 0.28rem;height: 0.28rem;font-weight: 700;margin: 0.36rem 0.36rem 0.24rem;}
  /*商品详情css*/
  .seller .seller-xq{height:3rem;border-bottom:1px solid rgba(7,17,27,0.2);box-sizing:border-box; }
  .seller .seller-xq .xq-wrapper{margin:0.36rem;height: 100%;}
  .seller .seller-xq .xq-wrapper .xq-up{height: 1.16rem;border-bottom:1px solid rgba(7,17,27,0.1);box-sizing: border-box;}
  .seller .seller-xq .xq-wrapper .xq-up .up-l{float: left;}
  .seller .seller-xq .xq-wrapper .xq-up .up-l .name{font-size: 0.28rem;color:rgb(7,17,27);line-height: 0.28rem;height: 0.28rem;font-weight: 700;}
  .seller .seller-xq .xq-wrapper .xq-up .up-l .star-wrapper{margin-top: 0.16rem;height: 0.36rem;}
  .seller .seller-xq .xq-wrapper .xq-up .up-l .star-wrapper .star{}
  .seller .seller-xq .xq-wrapper .xq-up .up-l .star-wrapper .num{margin-left: 0.16rem;font-size: 0.2rem;color:rgb(77,85,93);line-height: 0.36rem;}
  .seller .seller-xq .xq-wrapper .xq-up .up-l .star-wrapper .Mon{margin-left: 0.24rem;font-size: 0.2rem;color:rgb(77,85,93);line-height: 0.36rem;}
  .seller .seller-xq .xq-wrapper .xq-up .up-r{float: right;}
  .seller .seller-xq .xq-wrapper .xq-up .up-r .icon-favorite{font-size: 0.48rem;color:rgb(240,20,20);line-height: 0.48rem;height: 0.48rem;}
  .seller .seller-xq .xq-wrapper .xq-up .up-r .collect{margin-top: 0.08rem;font-size: 0.2rem;color: rgb(77,85,93);line-height: 0.2rem;height: 0.2rem;}
  .seller .seller-xq .xq-wrapper .xq-up .up-r .collect.coll{color: rgb(77,85,93);}
  /*配送详情css*/
  .seller .seller-xq .xq-wrapper .xq-down{height: 1.12rem;margin-top: 0.36rem;display: flex;}
  .seller .seller-xq .xq-wrapper .xq-down .minPrice,.deliveryPrice,.time{flex:1;border-right:1px solid rgba(7,17,27,0.1);text-align: center }
  .seller .seller-xq .xq-wrapper .xq-down .text{font-size:0.2rem;color:rgb(147,153,159);line-height: 0.2rem;height: 0.2rem;}
  .seller .seller-xq .xq-wrapper .xq-down .min,.del,.t{font-size: 0.48rem;font-weight: 200;color:rgb(7,17,27);line-height: 0.48rem;height: 0.48rem;margin-top: 0.08rem;}
  .seller .seller-xq .xq-wrapper .xq-down  span{font-size: 0.2rem;}
  .seller .seller-xq .xq-wrapper .xq-down .time{border-right: none;}


  /*公告与活动版块 css*/
  .seller .seller-bulletin{height:auto;border:1px solid rgba(7,17,27,0.2);border-left: none;border-right: none;box-sizing:border-box;margin-top: 0.4rem;}
  .seller .seller-bulletin .bulletin{font-size:0.24rem;font-weight: 200;color:rgb(240,20,20);line-height: 0.48rem;margin: 0.16rem 0.6rem 0.32rem;}
  .seller .seller-bulletin .supports{}
  .seller .seller-bulletin .supports .support{margin: 0.36rem 0;height:0.5rem;border-top:1px solid rgba(7,17,27,0.1);position: relative}
  .seller .seller-bulletin .supports .support .icon{width: 0.32rem;height: 0.32rem;background: red;position: absolute;left: 0.24rem;top:0.32rem;bottom: 0.32rem;}
  .seller .seller-bulletin .supports .support .icon.decrease{background: url(./images/decrease_4@2x.png);background-size:0.32rem 0.32rem;}
  .seller .seller-bulletin .supports .support .icon.discount{background: url(./images/discount_4@2x.png);background-size:0.32rem 0.32rem;}
  .seller .seller-bulletin .supports .support .icon.guarantee{background: url(./images/special_4@2x.png);background-size:0.32rem 0.32rem;}
  .seller .seller-bulletin .supports .support .icon.invoice{background: url(./images/invoice_4@2x.png);background-size:0.32rem 0.32rem;}
  .seller .seller-bulletin .supports .support .icon.special{background: url(./images/guarantee_4@2x.png);background-size:0.32rem 0.32rem;}

  .seller .seller-bulletin .supports .support .text{margin-left: 0.12rem;font-size: 0.24rem;font-weight: 200;color:rgb(7,17,27);line-height: 0.32rem;position: absolute;left:0.68rem;top:0.32rem; }
  .clear{clear: both;}
  /*商家实景版块 css*/
  .seller .seller-avatar{height:auto;border-top:1px solid rgba(7,17,27,0.1);box-sizing:border-box;margin-top: 0.4rem;}
  .seller .seller-avatar .ava{margin: 0.24rem 0 0.36rem 0.36rem;/*border-bottom:1px solid rgba(7,17,27,1);*/}
  .seller .seller-avatar .ava .pics{width: 100%;height: 1.8rem;overflow: hidden;}
  .seller .seller-avatar .ava .pic{width: 1.8rem;height: 2.4rem;margin-left: 0.12rem;float: left;margin-top: 0.24rem;}
  .seller .seller-avatar .ava .pic img{width:100%;height: 100%;overflow: hidden;white-space:nowrap;}
  .seller .seller-avatar .ava .pic:first-child{margin-left: 0;}
  .clear{clear: both;}
  /*商家信息 css*/
  .seller .seller-info{height:auto;border:1px solid rgba(7,17,27,0.2);border-left: none;border-right: none;box-sizing:border-box;margin-top: 0.4rem;}
  .seller .seller-info .infos{margin: 0.36rem;border-top:1px solid rgba(7,17,27,0.1);}
  .seller .seller-info .infos .info{margin: 0.32rem 0.24rem;font-size: 0.24rem;font-weight: 200;color:rgb(7,17,27);height: 0.96rem;line-height: 0.96rem;}
</style>
