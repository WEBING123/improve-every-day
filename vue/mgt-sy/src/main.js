import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import { getNewsChannels } from './services/newsServices'

Vue.config.productionTip = false

Vue.use(ElementUI);

// async function getChannelList () {
//     var resp = await getNewsChannels();
//     console.log(resp);
// }

// getChannelList();

new Vue({
  render: h => h(App),
}).$mount('#app')
