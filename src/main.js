import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
import Cube from 'cube-ui';
Vue.use(Cube);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
