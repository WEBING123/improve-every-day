<template>
  <div id="app">
    <!-- <HelloWorld/> -->
    <!-- vue-router提供的全局组件 -->
    <router-view></router-view>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue'

  export default {
    name: 'App',
    components: {
      HelloWorld
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  html,
  body,
  #app,
  #app>div {
    height: 100%;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>