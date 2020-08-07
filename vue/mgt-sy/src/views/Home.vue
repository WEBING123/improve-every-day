<template>
  <div class="home">
    <el-row>
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
        <LeftNav></LeftNav>
      </el-col>
      <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import LeftNav from '../views/LeftNav.vue'
  // import { getNews } from '../services/newsServices'

  export default {
    name: 'Home',
    components: {
      LeftNav,
    },
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style>
  .el-row,
  .el-row .el-col {
    height: 100%;
  }
</style>