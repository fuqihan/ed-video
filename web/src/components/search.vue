<template>
  <div class="search-no" ref="search">
    <div class="search-no-active" @click="onNNoActive">
      <div class="search-no-active-show">
        <i class="icon iconfont icon-sousuo"></i>
        <span>搜索</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      onNNoActive() {
        this.$router.push({name: 'search'})
      }
    }
  }
</script>

<style lang="less">
  @import "../style/iconfont.css";

  @searchActiveColor: #4b4b4b;

  .search-no {
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
  }
</style>
