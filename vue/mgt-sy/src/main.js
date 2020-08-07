import Vue from 'vue'
import router from './routes/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //  3. 配置路由到 vue 实例中（路由规则）
  router: router // 可以简写 router
}).$mount('#app')
