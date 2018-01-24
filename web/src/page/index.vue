<template>
  <div id="app">
    <Search :showSearch.sync="showFooter"></Search>
    <router-view v-show="showFooter" class="position"></router-view>
    <div v-if="showFooter" class="footer" ref="fooder">
      <router-link to="home"><i class="icon iconfont icon-home"></i><span>主页</span></router-link>
      <router-link :to="'classification'"><i
        class="icon iconfont icon-fenlei"></i><span>分类</span></router-link>
      <router-link to="topic"><i class="icon iconfont icon-laoshi"></i><span>题目</span></router-link>
      <router-link to="community"><i class="icon iconfont icon-comiisredian"></i><span>社区</span></router-link>
      <router-link to="person"><i class="icon iconfont icon-gerenzhongxin"></i><span>个人</span></router-link>
    </div>
  </div>
</template>

<script>
  import Search from '../components/search.vue'

  export default {
    name: 'app',
    components: {
      Search
    },
    data() {
      return {
        showFooter: true
      }
    },
    mounted() {
      this.$store.commit('HEADER_HEIGHT', this.$refs.fooder.offsetHeight)
    }
  }
</script>

<style lang="less">
  .active {
    color: red;
  }

  .position {
    margin-bottom: .8rem;
    padding-top: .8rem;
  }

  .footer {
    width: 100%;
    background-color: #ffffff;
    height: 0.8rem;
    display: flex;
    position: fixed;
    bottom: 0;
    a {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-decoration: none;
      font-weight: bold;
      i {
        padding-top: 0.1rem;
        font-size: 16px;
      }
      span {
        padding: 0.06rem;
        display: block;
        font-size: 12px;
        -webkit-transform: scale(.8);
      }
    }
  }
</style>
