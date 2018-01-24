<template>
  <div class="topic">
    <div class="topic-header">
      <div class="topic-header-nav">
        <span>完成题目</span>
        <span>123</span>
      </div>
      <div class="topic-header-nav">
        <span>完成题目</span>
        <span>123</span>
      </div>
      <div class="topic-header-nav">
        <span>平均分</span>
        <span>123</span>
      </div>
    </div>
    <div class="topic-center">
      <div class="topic-center-nav" v-for="item in 10">
        <div class="topic-center-nav-item"  @click="off=!off">
           <span class="radius"></span>
          <span class="name">编程语言</span>
        </div>
        <topic-list key="item" v-for="item in 10" v-show="off"></topic-list>
      </div>
    </div>
  </div>
</template>

<script>
  import topicList from './child/topicList.vue'

  export default {
    components: {
      topicList
    },
    data() {
      return {
        off: false
      }
    }
  }
</script>

<style lang="less">
  .topic {
    margin: 0;
    .topic-header {
      width: 100%;
      height: 1rem;
      background-color: #4b4b4b;
      display: flex;
      justify-content: flex-start;
      .topic-header-nav {
        flex: 1;
        height: 100%;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        span {
          display: block;
          padding: 0.04rem;
          color: #07dcc0;
        }
        span:first-child {
          color: #c6c6c6;
        }
      }
    }
    .topic-center {
      .topic-center-nav {
        .topic-center-nav-item {
          background-color: white;
          height: .8rem;
          font-size: 16px;
          display: flex;
          align-items: center;
          .radius {
            display: block;
            background-color: #41ff05;
            width: .2rem;
            height: .2rem;
            margin-left: .5rem;
            border-radius: 50%;
          }
          .name {
            margin-left: .5rem;
          }
        }
      }
    }
  }
</style>
