<template>
  <div class="video">
    <div class="video-header">
      <span class="back" @click="$router.go(-1)"> < </span>
      <span class="name">我是我是我是我是我是我是我是</span>
      <img src="http://img.mukewang.com/529dc3380001379906000338-228-128.jpg" alt="">
    </div>
    <video controls	 src="http://edvideo-1252875234.cosbj.myqcloud.com/7993821.mp4"></video>
    <div class="video-list">
      <course-list key="item" v-for="item in 10"></course-list>
    </div>
  </div>
</template>

<script>
  import courseList from '../../components/courseItemList.vue'
  export default {
    components: {
      courseList
    }
  }
</script>

<style lang="less">
  .video {
    width: 100%;
    .video-header {
      height: .8rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .back{
        display: block;
        font-size: 20px;
        padding-left: .2rem;
      }
      .name {
        display: block;
        font-size: 16px;
        width: 30%;
        overflow: hidden;
        white-space: nowrap;

      }
      img {
        display: block;
        width: .6rem;
        height: .6rem;
        margin-right: .2rem;
        border-radius: 50%;
      }
    }
    video {
      width: 100%;
      height: 3rem;
      object-fit: fill;
    }
    .video-list {
      padding-top: .2rem;
    }
  }
</style>
