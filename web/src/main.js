// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import store from './store'
import infiniteScroll from 'vue-infinite-scroll'
import App from './App.vue'
import { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)
import './style/iconfont.css'
import './style/pc.less'

Vue.use(infiniteScroll)
Vue.use(AlertPlugin)
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
