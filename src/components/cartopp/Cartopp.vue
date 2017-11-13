<template>
    <div class="cartopp">
     <!-- 大于0 的时候显示(v-show)，进行加减(调用subcart和addcart函数)-->
      <div class="cart-decrease icon-remove_circle_outline" @click.stop.prevent="subcart" v-show="food.count>0"></div><!--阻止冒泡 这样点击加减时候商品详情页就不会跳出来了-->
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click.stop.prevent="addcart"></div>

      <div class="clear"></div>
    </div>
</template>

<script>
  import Vue from "vue";
  export default{
      props:["food"], //接收父容器(Goods.vue )传来的food属性    “prop” 是组件数据的一个字段，期望从父组件传下来。子组件需要显式地用 props 选项
    // 声明 props： props: ['food'],  然后向子容器传入一个普通字符串“food”：<cartopp :food="food"></cartopp>（父容器里）

    // 组件实例的作用域是孤立的。这意味着不能并且不应该在子组件的模板内直接引用父组件的数据。可以使用 props 把数据传给子组件。
    methods:{

          /*实现加的功能*/
          addcart(){

              //console.log("run")
              //count是加入购物车的数量，如果没有时，就给它设置一个属性（Vue.set / this.$set）
              if(!this.food.count){
                //给data里设置一个food.count 属性，值为1
                Vue.set(this.food,"count",1);
              }else{
                  //下次进行循环时，有值为1 ，执行这里，然后进行加1；
                  this.food.count++;
                  console.log(this.food.count);
              }

              /* //小球
               this.$refs.shopcart.drop(target);*/


          },
          /*实现加减的功能*/
          subcart(){
              if(this.food.count>0){
                this.food.count--;
              }

          }

    }

  }
</script>

<style>
  .cartopp{width:100%;height: 0.48rem;display: table;}/*垂直居中，父容器设置display:table  子容器设置display:table-cell ; vertical-align:middle ;text-align:center*/
  .cartopp .cart-decrease,.cart-add{font-size: 0.48rem;color:rgb(0,160,220);line-height: 0.48rem;padding: 0.06rem;/*//增大点击区域*/}
  .cartopp .cart-count{font-size: 0.2rem;color:rgb(147,153,159);line-height:0.48rem;vertical-align:middle;width: 0.48rem;text-align: center;display: table-cell}
  .cartopp .cart-add{ }
  .cartopp .clear{clear:both}
</style>
