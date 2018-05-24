<template>
  <div class="teacher-list" @click="onDetail">
    <span class="teacher-list-name">{{$props.item.name}}</span>
    <span class="teacher-list-sort">{{$props.item.title}}</span>
    <p class="teacher-list-info">{{$props.item.intro}}</p>
    <img class="teacher-list-avatar" :src="$props.item.imageUrl" alt="">
  </div>
</template>

<script>
  import {base64} from 'vux'

  export default {
    props: {
    item: {
      type: Object,
      default: function () {
        return {
            imageUrl: '',
            name: '',
            intro: '',
            title: ''
            }
         }
      }
    },
    methods: {
      onDetail() {
        this.$router.push('/detail/teacher/' + base64.encode(this.$props.item._id))
      }
    }
  }
</script>

<style lang="less">
  .teacher-list {
    margin-bottom: .02rem;
    height: 2rem;
    border-bottom: 1px solid #e2e2e2;
    position: relative;
    .teacher-list-sort {
      min-width: 1.2rem;
      padding: 0 .2rem;
      font-size: 12px;
      text-align: center;
      color: white;
      background-color: #2d2d2d;
      display: block;
      position: absolute;
      top: .3rem;
      left: 1.4rem;
    }
    .teacher-list-name {
      font-size: 14px;
      width: 3rem;
      position: absolute;
      top: .26rem;
      left: .4rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .teacher-list-info {
      display: block;
      width: 50%;
      height: 1rem;
      font-size: 12px;
      color: #3f3f3f;
      position: absolute;
      top: .6rem;
      left: .4rem;
      line-height: .34rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      white-space: normal;
    }
    .teacher-list-avatar {
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 50%;
      position: absolute;
      top: .2rem;
      right: .2rem;
    }
  }

  .teacher-list:first-child {
    border-top: 1px solid #e8e8e8;
  }
</style>
