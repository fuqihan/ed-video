<template>
  <div class="person" @touchmove="ccc" @touchend="ddd">
    <div class="person-header">
      <div class="person-header-site">
        <img :src="loginInfo.imageUrl" alt="">
      </div>
      <transition name="fade-slide-mode" mode="out-in">
        <div class="person-header-long" v-if="personHeaderOff" key="on">
          <div class="person-header-long-position">
            <img :src="loginInfo.imageUrl" alt="">
            <span class="person-header-long-position-name">{{loginInfo.name}}</span>
            <span class="person-header-long-position-motto">{{loginInfo.intro}}</span>
            <div class="person-header-long-position-attention">
              <div class="left">课程关注</div>
              <div class="right">教师关注</div>
            </div>
          </div>
        </div>
        <div class="person-header-short" v-if="!personHeaderOff" key="off">
          {{loginInfo.name}}
        </div>
      </transition>
    </div>
    <div class="person-center" ref="personCenter"
         :style="personHeaderOff?personCenterStyle[0]:personCenterStyle[1]">
      <div class="person-center-record">
        <div class="person-center-record-list" v-for="item in 5">
          <span>1000</span>
          <span>开心值</span>
        </div>
      </div>
      <div class="person-center-item">
        <div class="person-center-item-list" v-for="item in ['浏览记录','练习记录','签到','不开心','不开心','不开心','个人设置','私信']">
          <span class="name">{{item}}</span>
          <span class="next"> > </span>
        </div>
      </div>
    </div>
    <div class="person-footer">已经到底了</div>
  </div>
</template>

<script>
  import api from '../../api/index'
  import * as util from '../../config/util'

  export default {
    data() {
      return {
        personHeaderOff: true,
        startY: '',
        loginInfo: {},
        personCenterStyle: [
          {paddingTop: '3rem'},
          {paddingTop: '.8rem'}
        ]
      }
    },
    methods: {
      ccc(e) {
        this.$refs.personCenter.getBoundingClientRect().top < -5 ? this.personHeaderOff = false : 0
        this.startY === '' ? this.startY = e.touches[0].clientY : 0
        let scroll = e.touches[0].clientY - this.startY
        scroll > 20 && document.body.scrollTop === 0 ? this.personHeaderOff = true : 0
      },
      ddd() {
        this.startY = ''
      }
    },
    mounted() {
      if (util.getCookie('WeiboAccessToken')) {
        api.login.weiboFindUserInfo(util.getCookie('WeiboAccessToken'), util.getCookie('WeiboUid'))
          .then(data => {
            console.log(data)
            this.loginInfo = {
              name: data.data.data.name,
              imageUrl: data.data.data.profile_image_url,
              intro: data.data.data.description
            }
            window.localStorage.edVideoLoginBefore = ''
          })
      } else {
        if (util.getCookie('BaiduAccessToken')) {
          window.localStorage.edVideoLoginBefore = ''
        }
      }
    }
  }
</script>

<style lang="less">
  @headerNameColor: #27bae1;
  .person {
    margin-top: -0.8rem;
    .person-header {
      z-index: 9999;
      display: inline;
      .person-header-site {
        width: 100%;
        height: .8rem;
        background-color: #282828;
        position: fixed;
        img {
          display: block;
          width: .6rem;
          height: .6rem;
          margin: .1rem .3rem 0 0;
          border-radius: 50%;
          float: right;
        }
      }
      .person-header-long {
        margin-top: .8rem;
        width: 100%;
        height: 2.2rem;
        position: fixed;
        z-index: 0;
        .person-header-long-position {
          width: 100%;
          height: 100%;
          background-color: #282828;
          position: relative;
          img {
            display: block;
            width: .8rem;
            height: .8rem;
            border-radius: 50%;
            position: absolute;
            top: .2rem;
            left: .5rem;
          }
          .person-header-long-position-name {
            display: block;
            font-size: 12px;
            color: @headerNameColor;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            position: absolute;
            top: .2rem;
            left: 1.52rem;
          }
          .person-header-long-position-motto {
            display: block;
            width: 50%;
            font-size: 12px;
            color: #e6e6e6;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            position: absolute;
            top: .65rem;
            left: 1.52rem;
          }
          .person-header-long-position-attention {
            width: 100%;
            height: .8rem;
            font-size: 12px;
            color: @headerNameColor;
            display: flex;
            position: absolute;
            bottom: 0;
            div {
              flex: 1;
              text-align: center;
              line-height: .8rem;
            }
          }
        }
      }
      .person-header-short {
        width: 50%;
        height: .8rem;
        position: fixed;
        z-index: 99;
        font-size: 12px;
        color: white;
        text-align: center;
        line-height: .8rem;
      }
    }
    .person-center {
      .person-center-record {
        width: 100%;
        height: 1.1rem;
        border-bottom: 1px solid #c4c4c4;
        display: flex;
        justify-content: flex-start;
        .person-center-record-list {
          width: 20%;
          font-size: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          span {
            display: block;
            padding-top: .1rem;
          }
        }
      }
      .person-center-item {
        .person-center-item-list {
          z-index: -1;
          width: 100%;
          height: 1rem;
          border-bottom: 1px solid #e0e0e0;
          margin-bottom: 0.1px;
          font-size: 12px;
          position: relative;
          .name {
            position: absolute;
            left: .8rem;
            line-height: 1rem;
          }
          .next {
            font-size: 18px;
            color: #969696;
            position: absolute;
            right: .4rem;
            line-height: 1rem;
          }
        }
      }
    }
    .person-footer {
      height: 1rem;
      font-size: 14px;
      text-align: center;
      line-height: 1rem;
      background-color: #e9e9e9;
    }
  }

  .fade-slide-mode-enter-active, .fade-slide-mode-leave-active {
    transition: all .06s ease-in
  }

  .fade-slide-mode-enter {
    height: 0;
    transform: scaleY(1);
  }

  .fade-slide-mode-leave-active {
    height: 0;
    transform: scaleY(1);
  }

</style>
