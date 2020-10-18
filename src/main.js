// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

window.axios = require('axios');
window.axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
window.axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:8080';
window.axios.defaults.withCredentials = true;

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
