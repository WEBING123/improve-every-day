<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <ComponentCarousel :percentage="10"/>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
