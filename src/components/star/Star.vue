<template>
    <div class="star"><!-- :class="starType"-->
      <span class="star-item" v-for="item in itemClass" :class="item" ></span>
    </div>
</template>

<script>
  const Length=5;
  export default{
      props:["score",'size'],
      created(){
        console.log(this.score);
        console.log(this.size);
      },
      data(){
            return{
               starType:""
            }
      },
      computed:{
        starType(){ //通过计算属性,返回组装过的类型,用来对应class类型
          return 'star-' + this.size;
        },
        /*
         星星计算比较巧妙(根据分数转换为星星数)
         对于分数score进行2然后向下取整,然后再除以2,是为了获取所有星星的数量,并且这个数量是0.5倍数的,例如4.6 2就是9.2,然后向下取整是9,然后再除以2就是4.5,那么就可以得到一个0.5倍数的星星数,可以转换为4个全星+一个半星
         对于非整数的星星算作是半个星星,需要知道是否有存在这种情况,所以分数score%1 ,例如8 % 1是0, 8.5 % 1就不是0,并且这个半星只会出现一次,因为半星状态就只要一个
         没有星星的部分是要补全的,这里使用while循环来处理这种情况

         */
          itemClass(){
            let result=[];//返回的是一个数组，用来遍历输出星星
            let score=Math.floor(this.score*2)/2;//计算所有星星的数量
            let hasDecimal=score%1!==0;//判断非整数的星星
            let integer = Math.floor(score); //整数星星判断

            //let intege=parseInt(this.score);
            //let decimal=this.score - intege;

            for(let i=0;i<integer;i++){//整数星星的判断
                result.push("on");//一个整数星星就push一个on到数组里
            }
            if(hasDecimal){//非整数星星使用half
                result.push("half");
            }
            while (result.length<Length){//余下的用无星星补全，使用off
                result.push("off");
            }

            /*if(decimal>=0.5){
                result.push("half");
            }
            while(result.length<Length){
                result.push("off");
            }*/
            return result;
          }
      }

  }
</script>

<style>
  .star{}
  .star .star-item{display: inline-block;background-repeat: no-repeat;margin-right: 0.44rem;}
  /*48尺寸的星星 基本信息*/
  .star .star-item.star-48 .star-item{width: 0.48rem;height: 0.48rem;margin-right: 0.44rem;}
  .star .star-item.star-48 .star-item:last-child{margin-right: 0;}/*最后一个星星的边距为0*/
  .star .star-item.star-48 .star-item.on{background: url(./images/star48_on@3x.png);background-size: 0.48rem 0.48rem;}
  .star .star-item.star-48 .star-item.half{background: url(./images/star48_half@3x.png);background-size: 0.48rem 0.48rem;}
  .star .star-item.star-48 .star-item.off{background: url(./images/star48_off@3x.png);background-size: 0.48rem 0.48rem;}

  /*36尺寸的星星*/
  .star .star-item.star-36 .star-item{width: 0.36rem;height: 0.36rem;margin-right: 0.12rem;}
  .star .star-item.star-36 .star-item:last-child{margin-right: 0;}/*最后一个星星的边距为0*/
  .star .star-item.star-36 .star-item.on{background: url(./images/star48_on@3x.png);background-size: 0.36rem 0.36rem;}
  .star .star-item.star-36 .star-item.half{background: url(./images/star48_half@3x.png);background-size: 0.36rem 0.36rem;}
  .star .star-item.star-36 .star-item.off{background: url(./images/star48_off@3x.png);background-size: 0.36rem 0.36rem;}

  /**/
  .star .star-item.star-24 .star-item{width: 0.24rem;height: 0.24rem;margin-right: 0.6rem;}
  .star .star-item.star-24 .star-item:last-child{margin-right: 0;}/*最后一个星星的边距为0*/
  .star .star-item.star-24 .star-item.on{background: url(./images/star48_on@3x.png);background-size: 0.24rem 0.24rem;}
  .star .star-item.star-24 .star-item.half{background: url(./images/star48_half@3x.png);background-size: 0.24rem 0.24rem;}
  .star .star-item.star-24 .star-item.off{background: url(./images/star48_off@3x.png);background-size: 0.24rem 0.24rem;}



</style>
