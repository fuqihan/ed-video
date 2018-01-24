<template>
  <div class="community">
    <div class="community-nav">
      <div ref="communityNavList" class="community-nav-list"
           :style="communityNavListStyle.info?communityNavListStyle: 0">
        <div class="list">全部</div>
        <div class="list" v-for="item in 10">前端学习</div>
      </div>
      <div class="community-nav-more" @click="navMore">{{communityNavListStyle.info ? '查看更多' : '收起'}}></div>
    </div>
    <div class="community-center">
      <community-list key="item" v-for="item in 6"></community-list>
    </div>
  </div>
</template>

<script>
  import communityList from './child/communityList.vue'
  export default {
    data() {
      return {
        communityNavListStyle: {
          overflow: 'hidden',
          height: '1.6rem',
          info: true
        }
      }
    },
    components: {
      communityList
    },
    methods: {
      navMore() {
        this.communityNavListStyle.info = !this.communityNavListStyle.info
      }
    }
  }
</script>

<style lang="less">
  .community {
    width: 100%;
    .community-nav {
      border-bottom: 1px solid #dfdfdf;
      .community-nav-list {
        width: 100%;
        font-size: 12px;
        line-height: .6rem;
        display: flex;
        flex-wrap: wrap;
        .list {
          margin: .1rem .1rem;
          padding: 0 .1rem;
          border-radius: 25%;
          background-color: rgba(0, 7, 235, 0.11);
          display: block;
          text-align: center;
        }
      }
      .community-nav-more {
        font-size: 16px;
        width: 30%;
        text-align: center;
        padding: .1rem;
        margin: 0.2rem auto;
        border-radius: 12%;
        background-color: rgba(0, 7, 235, 0.11);
      }
    }
    .community-center {
      width: 100%;
    }
  }
</style>
