// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import "./assets/css/reset.css";
import "./assets/css/style.css";




import Goods from "./components/goods/Goods.vue";
import Rating from "./components/rating/Rating.vue";
import Seller from "./components/seller/Seller.vue";

//路由
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router=new VueRouter({
  routes:[
    {path:"/goods",component:Goods},
    {path:"/rating",component:Rating},
    {path:"/seller",component:Seller},
    {path:"/",redirect:"/goods"}
  ]
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
