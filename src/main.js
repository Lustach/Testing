import Vue from 'vue'
import App from './App.vue'
import {store} from '../store/index'
import {router} from '../routes.js'
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css'
// Vue.config.productionTip = false

new Vue({
 el:'#app',
 store,
 router,
 vuetify,
 render: h => h(App)
}).$mount('#app')
