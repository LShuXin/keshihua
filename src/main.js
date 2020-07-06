import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import VueClipboard from 'vue-clipboard2'

import '@/icons' // icon
import '@/permission' // permission control
import API_DATA from '@/api/axios.js'
Vue.prototype.GLOBAL = API_DATA
import LABEL_DATA from '@/api/label.js'
Vue.prototype.LABEL_DATA = LABEL_DATA
import { mockXHR } from '../mock'
Vue.use(ElementUI)

Vue.config.productionTip = false
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
