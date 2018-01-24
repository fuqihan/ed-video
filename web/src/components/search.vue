<template>
  <div class="search" ref="search">
    <div class="search-no-active" v-show="$props.showSearch" @click="onNNoActive">
      <div class="search-no-active-show">
        <i class="icon iconfont icon-sousuo"></i>
        <span>搜索</span>
      </div>
    </div>
    <div class="search-active" v-show="!$props.showSearch">
      <span class="search-active-checkbox" @click="showCheck=true">{{checkText.name}}</span>
      <input type="text" ref="searchText" v-model="searchText" @keyup.enter="onSearch">
      <div class="search-active-cancel" @click="onActive">取消</div>
    </div>
    <actionsheet v-model="showCheck" :menus="menuCheck" theme="android" @on-click-menu="onCheck">
    </actionsheet>
    <div class="search-model" v-show="!this.$props.showSearch && !this.searchEnter"
         :style="{minHeight: searchModelHeight}">
      <span class="search-model-title">热门搜索</span>
      <div class="search-model-list">
        <div class="list" v-for="item in 10">anguaalar</div>
      </div>
      <div class="search-model-list-before">查看更多...</div>
      <span class="search-model-title">搜索历史</span>
      <div class="search-model-list">
        <div class="list" v-for="item in 10">anguaalar</div>
      </div>
    </div>
    <div class="search-list-model" v-show="!this.$props.showSearch && this.searchEnter"
         :style="{minHeight: searchModelHeight}">
    </div>
  </div>
</template>

<script>
  import {Actionsheet} from 'vux'

  export default {
    props: ['showSearch'],
    data() {
      return {
        searchModelHeight: '',
        searchText: '',
        searchEnter: false,
        checkText: {name: '视频', key: 'video'},
        showCheck: false,
        menuCheck: {
          video: '视频',
          classification: '类别',
          topic: '题目',
          teacher: '教师'
        }
      }
    },
    components: {
      Actionsheet
    },
    methods: {
      onCheck(key) {
        this.checkText = {name: this.menuCheck[key], key: key}
      },
      onNNoActive() {
        this.$emit('update:showSearch', false)
        setTimeout(() => {
          this.$refs.searchText.focus()
        }, 0)
      },
      onActive() {
        this.$emit('update:showSearch', true)
        this.searchText = ''
        this.searchEnter = false
      },
      onSearch() {
        this.searchEnter = true
      }
    },
    mounted() {
      let searchModelHeight = window.screen.height - this.$refs.search.offsetHeight
      this.searchModelHeight = searchModelHeight + 'px'
    }
  }
</script>

<style lang="less">
  @import "../style/iconfont.css";

  @searchActiveColor: #4b4b4b;

  .search {
    width: 100%;
    height: .8rem;
    position: fixed;
    z-index: 99;
    .search-no-active {
      height: 100%;
      width: 100%;
      background-color: @searchActiveColor;
      display: flex;
      justify-content: center;
      align-items: center;
      .search-no-active-show {
        height: 70%;
        width: 80%;
        background-color: white;
        border-radius: 5%;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-size: 12px;
          display: block;
          margin-left: .2rem;
        }
      }
    }
    .search-active {
      height: 100%;
      width: 100%;
      background-color: @searchActiveColor;
      display: flex;
      justify-content: center;
      align-items: center;
      .search-active-checkbox {
        font-size: 14px;
        width: 16%;
        height: .48rem;
        color: white;
        margin-right: .2rem;
        text-align: center;
        line-height: .48rem;
      }
      input {
        width: 52%;
        height: 60%;
        border-radius: 5%;
      }
      .search-active-cancel {
        font-size: 12px;
        color: white;
        width: 16%;
        height: .48rem;
        background-color: #2259ff;
        border-radius: 12%;
        margin-left: .2rem;
        text-align: center;
        line-height: .48rem;
      }
    }
    .search-model {
      width: 100%;
      background: white;
      z-index: 99;
      .search-model-title {
        display: block;
        padding-top: .4rem;
        margin-left: .4rem;
        font-size: 14px;
        font-weight: bold;
      }
      .search-model-list {
        height: 2rem;
        font-size: 12px;
        padding-left: .14rem;
        margin: .2rem auto;
        display: flex;
        flex-wrap: wrap;
        .list {
          padding: 0 .1rem;
          height: .5rem;
          text-align: center;
          line-height: .5rem;
          margin: .1rem .1rem;
          border-radius: 5%;
          background-color: #d4d4d4;
        }
      }
      .search-model-list-before {
        display: inline-block;
        font-size: 12px;
        text-align: center;
        width: 100%;
      }
    }
    .search-list-model {
      width: 100%;
      background: white;
      z-index: 99;
    }
  }
</style>
