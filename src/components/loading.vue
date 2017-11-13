<template>
  <div class="loading">
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

    }
  }
}
</script>


<style>
  *{padding:0px;margin:0px;}
  .loading{width: 50px;height: 50px;position: absolute;top:0;right: 0;left: 0;bottom: 0;margin:auto;}
  .loading i{display: block;float: left;width: 5px;height: 40px;background: skyblue;margin:0 2px;transform: scaleY(0.5);animation:load 1s infinite}
  .loading i:nth-child(2){animation-delay:0.1s;}
  .loading i:nth-child(3){animation-delay:0.2s;}
  .loading i:nth-child(4){animation-delay:0.3s;}
  .loading i:nth-child(5){animation-delay:0.4s;}
  @keyframes load{
    0%,40%,100%{transform: scaleY(0.5);}
    20%{transform: scaleY(1);}
  }
</style>
