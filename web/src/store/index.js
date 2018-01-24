import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'

Vue.use(Vuex)
const state = {
  loginInfo: false,  // 记录用户登录状态
  phoneHeight: 0,    // 记录屏幕的高度
  headerHeight: 0,   // 头部和底部大小相同，用于计算界面视高
  loginBefore: '',   //  用于记录前往登陆页之前的要进行前往的页面
  localhostUrl: 'http://localhost:3000'    //  地址前缀
}

const store = new Vuex.Store({
  state,
  getters: {},
  mutations,
  actions: {},
  modules: {}
})

export default store
