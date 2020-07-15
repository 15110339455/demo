<template>
  <div id="app">
    <div id="title">
      <span>日程</span>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div id="foolt">
        <!-- <span class="active"> 日程</span>
        <span>待办</span> -->
        <richen></richen>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Richen from './components/richen1.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Richen
  }
}
</script>


<style>
body{
  margin: 0;
}
#title{
  width: 375px;
  height: 64px;
  line-height: 64px;
  text-align: center;
  background: #366cb3;
  box-shadow: 0px 1px 0px 0px #dcdcdc; 
}
#title span{
  color: #ffffff;
  font-size: 18px;
}
#foolt{
  position: absolute;
  bottom: 0;
  left: 0;
  height: 47px;
  line-height: 47px;
  width: 373px;
  display: flex;
  background: rgba(255,255,255,0.94);
  border-top: 1px solid rgba(0,0,0,0.3);
}
#foolt span{
  text-align: center;
  flex: 1;
}
.active{
  color: #366cb3;
}
.box{
  width: 375px;
}
</style>
