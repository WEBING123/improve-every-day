<template>
  <div id="app">
      <ElementTable></ElementTable>
  </div>
</template>

<script>
import ElementTable from './components/ElementTable.vue'

export default {
  name: 'app',
  components: {
    ElementTable
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
