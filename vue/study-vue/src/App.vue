<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <ComponentCarousel :percentage="50"/>
    <ComponentCarousel :percentage="80" status="success"/>
    <ComponentCarousel :percentage="40" status="exeption"/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import ComponentCarousel from './components/ComponentCarousel.vue'

export default {
  name: 'app',
  components: {
    // HelloWorld
    ComponentCarousel
  }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
body {
    overflow: hidden;
}
#app {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    padding: 10px;
    border: 2px dotted #f39c12;
    border-radius: 5px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
