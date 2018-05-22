<template>
  <div class="detail-course-list">
    <div class="detail-course-list-master">
      <span class="name">{{courseLists.name}}</span>
    </div>
    <div @click="aaa(item)" v-for="(item,index) in courseLists.child" :key="index" class="detail-course-list-child">
      <span class="index">{{'0'+(index +1)}}</span>
      <span class="name">{{item.name}}</span>
      <span class="time">3:00</span>
    </div>
  </div>
</template>

<script>
  import {Icon} from 'vux'
  export default {
    props: ['courseLists', 'videoUrl'],
    components: {
      Icon
    },
    methods: {
      aaa(item) {
        this.$emit('update:videoUrl', item.url);
      }
    }
  }
</script>

<style lang="less">
  .detail-course-list {
    background-color: white;
    min-height: .8rem;
    font-size: 16px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .detail-course-list-master {
      width: 100%;
      height: .5rem;
      position: relative;
      & > .name {
        position: absolute;
        left: .6rem;
        top: .03rem;
      }
      & > .bottom-icon {
        position: absolute;
        right: .4rem;
      }
    }
    .detail-course-list-child {
      width: 100%;
      height: .5rem;
      line-height: .5rem;
      margin-top: 10px;
      & > .index {
        margin-left: .6rem;
      }
      & > .name {
        margin-left: .4rem;
      }
      & > .time {
        margin-left: 2.8rem;
      }
    }
  }
</style>
