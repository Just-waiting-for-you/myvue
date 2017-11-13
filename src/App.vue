<template>
  <div id="app">
    <!--头部-->
    <my-header :seller="seller"></my-header>
    <div class="clear"></div>
    <div class="tabs">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/rating" :seller="seller">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import header from "./components/header/Header.vue"; //引入头部
  import axios from "axios";//引入异步请求

  export default{
    name:"app",
    //组件
    components:{
      myHeader:header
    },
    //组件内部数据挂载时，返回对象放在data函数里，return 对象出来；
    data(){
      return{
        seller:null //初始化数据
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
        })
    }
  }
</script>

<style>

  .clear{clear:both;}
  .tabs{display: flex;height: 0.8rem;text-align: center;line-height: 0.8rem;border-bottom: 1px solid rgba(7,17,27,0.1)}
  .tabs .tab-item{flex: 1;font-size: 0.28rem;color:rgb(77,85,93)}
  .tabs .tab-item .router-link-active{color:rgb(240,20,20);}
</style>
