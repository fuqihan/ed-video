<template>
  <div class="detail-teacher">
    <div class="detail-teacher-avatar">
      <span class="back" @click="$router.go(-1)"> < </span>
      <img class="avatar" :src="msg.imageUrl" alt="">
      <span class="name">{{msg.name}}</span>
    </div>
    <div class="detail-teacher-intro">
      <span class="name">个人介绍</span>
      <p>{{msg.intro}}</p>
    </div>
    <div class="detail-teacher-course">
      <span class="name">课程</span>
      <div class="list">
        <course-list key="item" v-for="item in 10"></course-list>
      </div>
    </div>
  </div>
</template>

<script>
  import courseList from '../../components/courseList.vue'
  import {base64} from 'vux'
  import api from '../../api/index'

  let htmlBody = document.scrollingElement || document.documentElement
  export default {
    components: {
      courseList
    },
    data() {
      return {
        msg: {}
      }
    },
    mounted() {
      htmlBody.scrollTop = 0
      api.teacher.findTeacherId(base64.decode(this.$route.params.id)).then(data => {
        this.msg = data.data.data.data[0]
        console.log(this.msg)
      })
    }
  }
</script>

<style lang="less">
  .detail-teacher {
    .detail-teacher-avatar {
      height: 4rem;
      background-color: #5f5f5f;
      position: relative;
      .back {
        width: .5rem;
        height: .5rem;
        background-color: #1b1b1b;
        color: white;
        font-size: 16px;
        text-align: center;
        border-radius: 50%;
        line-height: .5rem;
        position: absolute;
        top: .2rem;
        left: .2rem;
        z-index: 99;
      }
      .avatar {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        border: 1px solid #a3a3a3;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
      }
      .name {
        display: block;
        width: 2rem;
        font-size: 16px;
        color: white;
        position: absolute;
        left: 50%;
        top: 80%;
        text-align: center;
        margin-left: -1rem;
      }
    }
    .detail-teacher-intro {
      padding: .3rem 0;
      font-size: 16px;
      border-bottom: 1px solid #c1c1c1;
      .name {
        display: block;
        width: 86%;
        margin: 0 auto;
      }
      p {
        display: block;
        padding-top: .2rem;
        width: 86%;
        margin: 0 auto;
      }
    }
    .detail-teacher-course {
      padding: .3rem 0;
      .name {
        display: block;
        width: 86%;
        margin: 0 auto;
        font-size: 16px;
      }
      .list {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
      }
    }
  }
</style>
