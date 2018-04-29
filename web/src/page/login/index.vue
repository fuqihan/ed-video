<template>
  <div class='login-index' v-show="loginShow">
    <div class='login-header'>
      <div class="login-header-icon" @click="$router.go(-1)">
        <icon type='cancel'></icon>
      </div>
      <span class='name'>登录</span>
    </div>
    <div class='login-center'>
      <div id="wb_connect_btn" style="display: none"></div>
      <span class='button' @click='onWeibo'>
        <!-- <icon type='cancel' style='margin: 0 .5rem 0 -1rem'></icon> -->
        微博登录
      </span>
      <span class='button' @click='onBaidu'>
        <!-- <icon type='cancel' style='margin: 0 .5rem 0 -1rem'></icon> -->
        百度登录
      </span>
      <span class='button' @click='onLogin'>
        <!-- <icon type='cancel' style='margin: 0 .5rem 0 -1rem'></icon> -->
        qq登录
      </span>
    </div>
    <confirm v-model="show"
             confirm-text="是"
             cancel-text="否"
             @on-cancel="onCancel"
             @on-confirm="onConfirm">
      <p style="text-align:center;">登录成功?'</p>
    </confirm>
  </div>
</template>

<script>
  import {Icon, Confirm} from 'vux'
  import * as util from '../../config/util'
  import io from 'socket.io-client'

  const socket = io.connect('https://www.fuqihan.cn:3000/');
  // const socket = io.connect('localhost:3000/');
  export default {
    components: {
      Icon,
      Confirm
    },
    data() {
      return {
        show: false,
        loginShow: false,
        outhHtml: undefined
      }
    },
    created() {
      let name = this.$store.state.loginBefore ? this.$store.state.loginBefore : (window.localStorage.edVideoLoginBefore ? window.localStorage.edVideoLoginBefore : 'index')
      if (util.getCookie('WeiboAccessToken')) {
        this.$store.commit('LOGIN_INFO', true)
        this.$router.push({name: name})
      } else {
        if (util.getCookie('BaiduAccessToken')) {
          this.$store.commit('LOGIN_INFO', true)
          this.$router.push({name: name})
        } else {
          this.loginShow = true
        }
      }
      socket.on('loginOff', function(data) {
        this.outhHtml.close()
        this.$store.commit('LOGIN_INFO', true)
        this.$router.push({name})
      })
    },
    methods: {
      loginCel() {
        this.$router.go(-1)
      },
      onWeibo() {
        this.outhHtml = window.open(`https://api.weibo.com/oauth2/authorize?client_id=456805882&response_type=code&state=` + socket.id + `&redirect_uri=http://www.fuqihan.cn/node/login/getWeiboAccessToken`)
        this.show = true
      },
      onBaidu() {
        this.outhHtml = window.open('http://openapi.baidu.com/oauth/2.0/authorize?response_type=code&\n' +
          '\tclient_id=8zEhM2TlYGTD273GDVlFiwd0\n' +
          '&redirect_uri=http://www.fuqihan.cn/node/login/getBaiduAccessToken&\n' +
          '\tscope=basic&\n' +
          '\tdisplay=popup&state=' + socket.id)
        this.show = true
      },
      onLogin() {
        this.$router.push({name: 'login'})
      },
      onConfirm() {
        window.localStorage.edVideoLoginBefore = this.$store.state.loginBefore ? this.$store.state.loginBefore : 'index'
        this.$router.go(0)
      },
      onCancel() {
      }
    }
  }
</script>

<style lang='less'>

  .login-index {
    min-height: 100vh;
    background: url('http://oxw83yoit.bkt.clouddn.com/login/10.jpg');
    .login-header {
      display: flex;
      height: 1rem;
      padding-left: .3rem;
      justify-content: flex-start;
      align-items: center;
      & > .login-header-icon {
        margin-top: -.16rem;
      }
      & > * {
        display: block;
      }
      & > .name {
        font-size: 16px;
        margin-top: -.06rem;
        margin-left: 2rem;
        color: #F43530;
      }
    }
    .login-center {
      padding-top: 2.6rem;
      height: 3rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      & > .intro {
        width: 80%;
        display: block;
        color: white;
        font: 16px/1.5 Tahoma, Helvetica, Arial, '宋体', sans-serif;
        margin-bottom: .16rem;
      }
      & > .button {
        border: 0px solid #ffffff;
        width: 4.6rem;
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #ffffff;
        background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#ffffff));
        background: -webkit-linear-gradient(top, #ffffff, #ffffff);
        background: -moz-linear-gradient(top, #ffffff, #ffffff);
        background: -ms-linear-gradient(top, #ffffff, #ffffff);
        background: -o-linear-gradient(top, #ffffff, #ffffff);
        background-image: -ms-linear-gradient(top, #ffffff 0%, #ffffff 100%);
        -webkit-border-radius: 30px;
        -moz-border-radius: 30px;
        border-radius: 30px;
        -webkit-box-shadow: rgba(255, 255, 255, 0.4) 0 1px 0, inset rgba(255, 255, 255, 0.4) 0 1px 0;
        -moz-box-shadow: rgba(255, 255, 255, 0.4) 0 1px 0, inset rgba(255, 255, 255, 0.4) 0 1px 0;
        box-shadow: rgba(255, 255, 255, 0.4) 0 1px 0, inset rgba(255, 255, 255, 0.4) 0 1px 0;
        text-shadow: #ffffff 0 1px 0;
        color: #10544e;
        font-size: 16px;
        font-weight: bold;
        font-family: helvetica, serif;
        text-decoration: none;
        vertical-align: middle;
      }
    }
  }
</style>
