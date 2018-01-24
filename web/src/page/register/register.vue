<template>
  <div class="register" :style="{height: $store.state.phoneHeight+'px'}">
    <div class="register-header">
      <router-link to="/"> < 返回主页</router-link>
    </div>
    <div class="register-center">
      <span class="register-center-title">立即注册</span>
      <group>
        <x-input placeholder="输入您的昵称" title="昵称" ref="name"
                 v-model="name.value" :is-type="isName"></x-input>
      </group>
      <group>
        <x-input placeholder="输入您的账号" title="账号" ref="username"
                 v-model="username.value" :is-type="isUsername"></x-input>
      </group>
      <group>
        <x-input title="密码" placeholder="输入您的密码" ref="password"
                 v-model="password.value" type="password" :is-type="isPassword"></x-input>
      </group>
      <group>
        <x-input title="确认密码" placeholder="输入和上面一致的密码" ref="eqPassword"
                 :is-type="isEqPassword" v-model="eqPassword.value" type="password"></x-input>
      </group>
      <group>
        <x-input class="weui-vcode" :is-type="isTel" ref="tel"
                 placeholder="输入您的电话,发送未启用" v-model="tel.value" type="tel" :max="13">
          <x-button slot="right" type="primary" mini>发送</x-button>
        </x-input>
      </group>
      <span @click="onRegister" class="button">注册</span>
    </div>
    <div>
      <alert v-model="alertShow.show" @on-hide="onRegisterAlertHide">{{alertShow.msg}}</alert>
    </div>
  </div>
</template>

<script>
  import {Group, XInput, XButton, Alert, md5} from 'vux'
  import {addUser} from '../../api/user'
  //  import axios from 'axios'

  export default {
    components: {
      Group,
      XInput,
      XButton,
      Alert
    },
    data() {
      return {
        name: {name: 'name', value: '', isTrue: false},
        username: {name: 'username', value: '', isTrue: false},
        tel: {name: 'tel', value: null, isTrue: false},
        password: {name: 'password', value: null, isTrue: false},
        eqPassword: {name: 'eqPassword', value: null, isTrue: false},
        alertShow: {
          show: false,
          msg: '恭喜您，注册成功，确认即前往之前的操作',
          ret: false
        }
      }
    },
    methods: {
      isName: function (value) {
        value = value.trim()
        if (value.length > 2 && value.length < 16) {
          this.name.isTrue = true
          return {valid: true}
        } else {
          this.name.isTrue = false
          return {valid: false, msg: 'aaaaa'}
        }
      },
      isUsername: function (value) {
        let uPattern = /^[a-zA-Z0-9_-]{6,16}$/
        this.username.isTrue = uPattern.test(value)
        return {valid: uPattern.test(value), msg: 'aaaaa'}
      },
      isPassword: function (value) {
        let uPattern = /^[a-zA-Z0-9_-]{6,16}$/
        this.password.isTrue = uPattern.test(value)
        return {valid: uPattern.test(value), msg: 'aaaaa'}
      },
      isEqPassword: function (value) {
        if (value === this.password.value) {
          this.eqPassword.isTrue = true
          return {valid: true}
        } else {
          this.eqPassword.isTrue = false
          return {valid: false, msg: 'aaaaa'}
        }
      },
      isTel(value) {
        let uPattern = /^[0-9]{11}$/
        this.tel.isTrue = uPattern.test(value)
        return {valid: uPattern.test(value), msg: 'aaaaa'}
      },
      onRegister() {
        /*  验证是否输入完全  */
        let inputList = [
          this.name,
          this.username,
          this.password,
          this.eqPassword,
          this.tel
        ]
        for (let i = 0; i < inputList.length; i++) {
          if (inputList[i].isTrue === false) {
            console.log(i)
            this.$refs[inputList[i].name].focus()
            return
          }
        }
        /* 发送注册请求 */
        addUser({
          name: this.name.value,
          username: this.username.value,
          tel: this.tel.value,
          password: md5(this.password.value)
        }).then((data) => {
          if (data.data.ret) {
            console.log(data.data)
            window.localStorage['edVideoToken'] = data.data.data.token
            this.$store.commit('LOGIN_INFO', {
              ret: true,
              id: data.data.data.id,
              name: data.data.data.name
            })
            this.alertShow.msg = '恭喜您，注册成功'
            this.alertShow.ret = true
          } else {
            this.alertShow.msg = '很抱歉，您输入的账号或电话重复，请重新提交'
            this.alertShow.ret = false
          }
          this.alertShow.show = true
        })
      },
      onRegisterAlertHide: function () {
        this.alertShow.ret ? !this.$store.state.loginBefore ? this.$router.push('/')
          : this.$router.push({name: this.$store.state.loginBefore})
          : 0
      }
    }
  }
</script>

<style lang="less">
  @import "../../style/iconfont.css";

  .register {
    background-color: #79dbf7;
    .register-header {
      height: .8rem;
      background-color: #4b4b4b;
      font-size: 16px;
      a {
        padding-left: .3rem;
        line-height: .8rem;
        text-decoration: none;
        color: white;
      }
    }
    .register-center {
      width: 90%;
      margin: 0 auto;
      text-align: center;
      .register-center-title {
        font-size: 20px;
        padding: 0.2rem;
        color: #484365;
      }
      .register-center-pick {
        width: 100%;
        margin: 0.4rem auto;
        display: flex;
        justify-content: space-between;
        .register-center-check {
          width: 26%;
          padding: 0.2rem;
          font-size: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .register-center-psd-info {
          width: 26%;
          font-size: 12px;
          padding: 0.2rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .button {
        display: block;
        width: 5rem;
        margin: 1rem auto;
        border: 1px solid #0a3c59;
        background: #006756;
        background: -webkit-gradient(linear, left top, left bottom, from(#2a3740), to(#006756));
        background: -webkit-linear-gradient(top, #2a3740, #006756);
        background: -moz-linear-gradient(top, #2a3740, #006756);
        background: -ms-linear-gradient(top, #2a3740, #006756);
        background: -o-linear-gradient(top, #2a3740, #006756);
        background-image: -ms-linear-gradient(top, #2a3740 0%, #006756 100%);
        padding: 10px 20px;
        -webkit-border-radius: 16px;
        -moz-border-radius: 16px;
        border-radius: 16px;
        -webkit-box-shadow: rgba(255, 255, 255, 0.4) 0 1px 0, inset rgba(255, 255, 255, 0.4) 0 1px 0;
        -moz-box-shadow: rgba(255, 255, 255, 0.4) 0 1px 0, inset rgba(255, 255, 255, 0.4) 0 1px 0;
        box-shadow: rgba(255, 255, 255, 0.4) 0 1px 0, inset rgba(255, 255, 255, 0.4) 0 1px 0;
        text-shadow: #45a5e0 0 1px 0;
        color: #ffffff;
        font-size: 14px;
        font-family: helvetica, serif;
        text-decoration: none;
        vertical-align: middle;
      }

      .register-center-icon {
        width: 90%;
        margin: 0.4rem auto;
        display: flex;
        justify-content: space-between;
        .left {
          width: 26%;
          display: flex;
          justify-content: space-between;
          i {
            font-size: 24px;
            color: #534f75;
          }
        }
        .right {
          font-weight: 900;
          font-size: 18px;
          display: flex;
          align-items: center;
          a {
            text-decoration: none;
            color: #534f75;
          }
        }

      }
    }
  }
</style>
