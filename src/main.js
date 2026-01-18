import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'mdb-vue-ui-kit/css/mdb.min.css'
import 'mdb-vue-ui-kit/js/mdb.es.min.js'
import 'jquery/dist/jquery.js'
import 'popper.js/dist/popper.js'

createApp(App).use(router).mount('#app')
