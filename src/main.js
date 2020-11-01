import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
import '@/assets/css/main.sass'
 
Vue.use(VueSweetalert2);

Vue.config.productionTip = false


new Vue({

  router,
  store,
  render: h => h(App)
}).$mount('#app')
