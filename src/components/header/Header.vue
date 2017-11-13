<template>
    <div class="header" v-if="seller!=null">
        <!-- 背景-->
        <div class="bg">
          <img :src="seller.avatar" alt="">
          <div class="header-mark">
          </div>
        </div>
        <!-- 背景end-->
        <!--头部内容-->
        <div class="content-wrapper">
            <div class="content-left">
              <img :src="seller.avatar" alt="" class="content-left-pic">
            </div>
            <div class="content-right">
                <div class="content-right-name">
                  <span class="brand"></span>
                  <span>{{seller.name}}</span>
                </div>
                <div class="clear"></div>
                <div class="content-right-description">
                  <i>{{seller.description}}</i>
                  <span> / {{seller.deliveryTime}}分钟送达</span></div>
                <div class="content-right-support">
                    <span class="icon" :class="picMap[seller.supports[0].type]"></span>
                    <span v-if="seller.supports[0]" class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="content-right-circle" @click="detailShow=true">
              <div class="num">{{seller.supports.length}}个</div>
              <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <!--头部内容end-->
        <!--商家公告-->
        <div class="bulletin-wrapper" @click="detailShow=true">

              <div class="bulletin-pic"></div>
              <p class="bulletin-text">{{seller.bulletin}}</p>
              <i class="icon-keyboard_arrow_right bulletin-i"></i>

        </div>
        <!--商家公告end-->
        <!--弹出商家信息-->
        <div class="detail" v-show="detailShow">
            <div class="detail-wrapper clearfix">
               <div class="detail-main">
                  <h1 class="name">{{seller.name}}</h1>
                 <!--星星版块-->
                  <div class="star-wrapper">
                    <!--<star :score="seller.score" :size="star-48"></star>-->
                  </div>
                 <!--星星版块 end-->
                  <div class="title">
                    <div class="line"></div>
                    <div class="text">商家信息</div>
                    <div class="line"></div>
                  </div>
                  <ul class="supports">
                    <li class="support-item" v-for="support in seller.supports">
                      <span class="icon" :class="picMap[support.type]"></span>
                      <span class="text" v-if="seller">{{support.description}}</span>
                    </li>
                  </ul>
                  <div class="title">
                    <div class="line"></div>
                    <div class="text">商家公告</div>
                    <div class="line"></div>
                  </div>
                 <!--css sticky footer-->
                  <div class="bulletin">
                    <div class="content">{{seller.bulletin}}</div>
                  </div>
                 <div class="bulletin">
                   <div class="content">{{seller.bulletin}}</div>
                 </div>
                 <div class="bulletin">
                   <div class="content">{{seller.bulletin}}</div>
                 </div>

               </div>
            </div>
            <div class="detail-close" @click="detailShow=false">
              <i class="icon-close"></i>
            </div>
        </div>
        <!--弹出商家信息end-->
    </div>
</template>

<script>
  //引入星星组件
import Star from "../star/Star.vue";

  export default{
      props:["seller"],
      //组件内部数据挂载时，返回对象放在data函数里，return 对象出来；

      data(){
        return{
            //优惠图片
            picMap: [],
            //用来判断是否显示店面详细信息,默认不显示
            detailShow: false
        }
      },
      created() {
      this.picMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    components:{
          Star  //星星组件
    }
  }

</script>

<style>
  .header{width:100%;height:2.68rem;}
  /*背景*/
  .header  .bg{width:100%;filter:blur(0.01rem);position: absolute;top:0;left:0;height:2.68rem;}
  .header  .bg img{width: 100%;height: 2.68rem;}
  .header  .bg .header-mark{background:rgba(7,17,27,0.5);position: absolute;top: 0;left: 0;width: 100%;height: 100%;}

  .header   .content-wrapper{padding: 0.48rem 0.24rem 0.26rem 0.48rem;position: relative;}
  /*左边图片样式*/
  .header   .content-wrapper .content-left{width:1.28rem;height: 1.28rem;float: left;position: absolute;}
  .header   .content-wrapper .content-left .content-left-pic{width: 100%;height: 100%;border-radius: 0.04rem;}
  /*右边样式*/
  .header   .content-wrapper .content-right{float: left;margin:0.04rem 0 0 1.6rem;height: 1.2rem;}
  /*商品名字*/
  .header   .content-wrapper .content-right .content-right-name{heigth:0.36rem;}
  .header   .content-wrapper .content-right .content-right-name .brand{width: 0.6rem;height: 0.32rem;float: left;background: url(images/brand@2x.png) no-repeat;background-size: 0.6rem 0.32rem;}
  .header   .content-wrapper .content-right .content-right-name span{font-size: 0.32rem;font-weight: bold;line-height: 0.36rem;color:rgb(255,255,255);float: left;padding-left: 0.12rem;}

  .header   .content-wrapper .content-right .clear{clear:both}
  /*派送信息*/
  .header   .content-wrapper .content-right .content-right-description{color:rgb(255,255,255);font-size: 0.24rem;font-weight: 200;line-height:0.24rem;margin-top: 0.16rem;}
  .header   .content-wrapper .content-right .content-right-description i{font-style: normal;}
  /*优惠信息*/
  .header   .content-wrapper .content-right .content-right-support{width: 100%;height: 0.24rem;margin:0.2rem 0.08rem 0.04rem 0;}
  .header   .content-wrapper .content-right .content-right-support{height: 0.24rem;}
  .header   .content-wrapper .content-right .content-right-support .icon{height: 0.24rem;width: 0.24rem;float: left;}
  .header   .content-wrapper .content-right .content-right-support .icon.decrease{background: url(./images/decrease_1@2x.png);background-size:0.24rem 0.24rem;}
  .header   .content-wrapper .content-right .content-right-support .icon.discount{background: url(./images/discount_1@2x.png);background-size:0.24rem 0.24rem;}
  .header   .content-wrapper .content-right .content-right-support .icon.guarantee{background: url(./images/special_1@2x.png);background-size:0.24rem 0.24rem;}
  .header   .content-wrapper .content-right .content-right-support .icon.invoice{background: url(./images/invoice_1@2x.png);background-size:0.24rem 0.24rem;}
  .header   .content-wrapper .content-right .content-right-support .icon.special{background: url(./images/guarantee_1@2x.png);background-size:0.24rem 0.24rem;}
  .header   .content-wrapper .content-right .content-right-support .text{float:left;line-height: 0.24rem;font-size: 0.2rem;color:rgb(255,255,255);font-weight: 200;margin-left: 0.08rem;}
  /*5个*/
  .header   .content-wrapper .content-right-circle{width: 1rem;height: 0.48rem;background: rgba(0,0,0,0.2);border-radius: 0.16rem;line-height: 0.48rem;float: right;margin-top: 1rem;}
  .header   .content-wrapper .content-right-circle .num{color:rgb(255,255,255);float: left;font-size: 0.2px;font-weight: 200;margin:0 0.16rem;}
  .header   .content-wrapper .content-right-circle i{color:rgb(255,255,255);position: absolute;right:0.32rem;margin-top:0.1rem;}
  /*商家公告css*/
  .header  .bulletin-wrapper{height: 0.56rem;background: rgba(7,17,27,0.2);float: left;width: 100%;position: absolute;top:2.12rem;}
  .header  .bulletin-pic{left: 0.24rem;position: absolute;top:0.16rem;width: 0.44rem;height: 0.24rem;float: left;background: url(./images/bulletin@2x.png);background-size: 0.44rem 0.24rem;}
  .header  .bulletin-text{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin-left: 0.76rem;font-size: 0.2rem;color:rgb(255,255,255);font-weight: 200;line-height: 0.56rem;margin-right:0.45rem;}
  .header  .bulletin-i{color: #fff;position: absolute;right: 0.24rem;top:0.13rem;font-size: 0.3rem;padding-left:0.08rem;}

  /*弹出商家信息css*/
  .header  .detail{width:100%;height: 100%;position: fixed;top:0;left: 0;background:rgba(7,17,27,0.8);overflow: auto;z-index:99;filter:blur(0.01rem);}
  .header  .detail .detail-wrapper{}
  .header  .detail .detail-wrapper .detail-main{margin-top: 1.28rem;margin-bottom: 0.64rem;position: relative}
  .header  .detail .detail-wrapper .detail-main .name{font-size: 0.32rem;font-weight: 700;color:rgb(255,255,255);line-height: 0.32rem;text-align: center;}

  .header  .detail .detail-wrapper .detail-main .star-wrapper{text-align:center;margin-top: 0.32rem;height: 0.48rem;}


  .header  .detail .detail-wrapper .detail-main .title{font-size: 0.28rem;font-weight: 700;color:rgb(255,255,255);line-height: 0.28rem;margin: 0.56rem 0.72rem 0.48rem;display: flex;}
  .header  .detail .detail-wrapper .detail-main .title .line{border-bottom: 1px solid rgba(255,255,255,0.2);flex:1;}
  .header  .detail .detail-wrapper .detail-main .title .text{margin:0 0.24rem;}
  /*弹出优惠信息*/
  .header  .detail .detail-wrapper .detail-main .supports{width:80%;margin:0 auto;}
  .header  .detail .detail-wrapper .detail-main .support-item{margin:0.24rem 0.24rem 0}
  .header  .detail .detail-wrapper .detail-main .support-item:last-child{margin-bottom: 0.56rem;}
  .header  .detail .detail-wrapper .detail-main .supports .support-item .icon{width:0.32rem;height: 0.32rem;display: inline-block;float: left;margin-right: 0.12rem;}
  .header  .detail .detail-wrapper .detail-main .supports .support-item .icon.decrease{background: url(./images/decrease_2@2x.png);background-size:0.32rem 0.32rem;}
  .header  .detail .detail-wrapper .detail-main .supports .support-item .icon.discount{background: url(./images/discount_2@2x.png);background-size:0.32rem 0.32rem;}
  .header  .detail .detail-wrapper .detail-main .supports .support-item .icon.guarantee{background: url(./images/special_2@2x.png);background-size:0.32rem 0.32rem;}
  .header  .detail .detail-wrapper .detail-main .supports .support-item .icon.invoice{background: url(./images/invoice_2@2x.png);background-size:0.32rem 0.32rem;}
  .header  .detail .detail-wrapper .detail-main .supports .support-item .icon.special{background: url(./images/guarantee_2@2x.png);background-size:0.32rem 0.32rem;}

  .header  .detail .detail-wrapper .detail-main .supports .text{font-size: 0.24rem;font-weight: 200;color:rgb(255,255,255);line-height: 0.24rem;}

  .header  .detail .detail-wrapper .detail-main .title{}
  /*弹出商家公告*/
  .header  .detail .detail-wrapper .detail-main .bulletin{width: 80%;margin:0 auto;}
  .header  .detail .detail-wrapper .detail-main .bulletin .content{font-size: 0.24rem;font-weight:200;color:rgb(255,255,255);line-height: 0.48rem;padding:0 0.24rem;}
  /*弹出关闭*/
  .header  .detail .detail-close{width: 0.64rem;height: 0.64rem;position: relative;margin:2rem auto 0 auto;}
  .header  .detail .detail-close .icon-close{font-size:0.64rem;color:rgba(255,255,255,0.5);}

</style>
