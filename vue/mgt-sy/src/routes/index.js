import Vue from 'vue'
import VueRouter from 'vue-router'
import config from './config';

// ------------------- 1. 安装VueRouter
Vue.use(VueRouter);

// 2. 创建路由对象
const router = new VueRouter(config);

// 导出
export default router
