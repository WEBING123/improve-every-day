<template>
  <div>

  </div>
</template>

<script>
export default {
    data() {
        return {
            // get参数在data中定义
            // 获取用户列表的参数对象
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 2
            }
        }
    },
    // 发起当前组件的数据请求
    created() {
        this.getUsersList();
    },
    methods: {
        async getUsersList() {
            // get请求：注意是异步操作
            // 第1个参数：请求的地址
            // 后续参数：需要向后台传的参数 
            // 可以有如下写法：{ params:{pagenum: 1, pagesize: 2} }，但更推荐以下写法 { params: this.queryInfo }
            const { data: res } = await this.$http.get('users', { params: this.queryInfo })
            // get 会返回promise对象
            // 使用await就会得到一个数据对象
            // 解构赋值 =>
            console.log(res);
        }
    },
}
</script>

<style>

</style>