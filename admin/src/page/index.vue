<template>
  <div>
    <f-header :isCollapse.sync="isCollapse"></f-header>
    <div class="home-center">
      <f-menu :isCollapse="isCollapse"></f-menu>
      <div class="home-router-view">
        <el-breadcrumb class="center-breadcrumb" separator=" ">
          <el-breadcrumb-item v-for="item in levelList" :key="item.path"
                              :to="{ name: item.name }">{{item.name}}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <router-view ref="aaa"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import fHeader from './header/header.vue'
  import fMenu from './menu/menu.vue'

  export default {
    components: {
      fHeader,
      fMenu
    },
    data() {
      return {
        isCollapse: false,
        levelList: null
      }
    },
    created() {
      this.getBreadcrumb()
    },
    methods: {
      getBreadcrumb() {
        this.levelList = this.$route.matched.filter(item => item.name)
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    }
  }
</script>

<style lang="less">
  .home-center {
    display: flex;
    justify-content: space-between;
    & > .home-router-view {
      flex: 1;
      .center-breadcrumb {
        font-size: 16px;
        padding: 12px 0 10px 40px;
      }
    }
  }
</style>
