/*!

=========================================================
* BootstrapVue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/bootstrap-vue-argon-dashboard
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';

// router setup
import router from './routes/router';
import Vuex from 'vuex';
import {storage} from "./store";
import axios from './http/axiosConfig';
import VueAxios from 'vue-axios';
import moment from 'moment';
import excel from 'vue-excel-export';
// plugin setup
Vue.use(DashboardPlugin);
Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(excel)

const store = new Vuex.Store(storage)

Vue.prototype.$appName = process.env.VUE_APP_NAME;
Vue.prototype.$moment = moment;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
});
