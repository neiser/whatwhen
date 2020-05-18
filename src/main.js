import Vue from 'vue'
import App from './App.vue'
import VueLocalStorage from 'vue-localstorage'

Vue.config.productionTip = false

Vue.use(VueLocalStorage)

new Vue({
  render: h => h(App),
}).$mount('#app')
