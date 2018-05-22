<template>
  <div class="video">
    <div class="video-header">
      <span class="back" @click="$router.go(-1)"> < </span>
      <span class="name">{{videoObj.name}}</span>
    </div>
    <video controls	 :src="videoUrl"></video>
  <div class="community-datail-header-bottom">
          <div class="community-datail-header-bottom-left">
            <img :src="videoObj.author.imageUrl" alt="">
            <span>{{videoObj.author.name}}</span>
          </div>
          <div class="community-datail-header-bottom-right">
             <span class="button" @click="toSend">立即评论</span> 
          </div>
          <div style="clear: both"></div>
        </div>
    <div class="video-list">
      <course-list :videoUrl.sync="videoUrl" :key="index" :courseLists="item" v-for="(item,index) in videoObj.courseLists"></course-list>
    </div>
  </div>
</template>

<script>
import courseList from "../../components/courseItemList.vue";
import api from "../../api";
import { base64 } from "vux";
export default {
  components: {
    courseList
  },
  data() {
    return {
      videoObj: {},
      videoUrl: 'http://ed-video-1252875234.file.myqcloud.com/m1424uaq0ls.10703.1.mp4'
    }
  },
  created() {
    api.courses
      .findCoursesById(base64.decode(this.$route.params.id))
      .then(data => {
        this.videoObj = data.data.data
      });
  },
  methods: {
    toSend() {
      this.$router.push({
        name: "inputModel",
        params: {
          url: this.$route.name,
          data: this.$route.params
        }
      });
    }
    // toBack() {
    //   this.$router.push(`/detail/course/${this.$route.path.split('/')[2]}`)
    //   console.log(this.$route);
    // }
  }
};
</script>

<style lang="less">
.video {
  width: 100%;
  .video-header {
    height: 0.8rem;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    .back {
      display: block;
      font-size: 20px;
      padding-left: 0.2rem;
    }
    .name {
      display: block;
      font-size: 16px;
      width: 30%;
      overflow: hidden;
      white-space: nowrap;
      padding-left: 2rem;
    }
  }
  video {
    width: 100%;
    height: 3rem;
    object-fit: fill;
  }
  .video-list {
    padding-top: 0.2rem;
  }
}
.community-datail-header-bottom {
  padding: 10px 10px;
  border-top: 1px solid rgb(216, 213, 213);
  border-bottom: 1px solid rgb(216, 213, 213);
  .community-datail-header-bottom-left {
    padding-top: 6px;
    padding-left: 5px;
    float: left;
    img {
      display: block;
      border-radius: 50%;
      width: 35px;
      height: 35px;
      float: left;
    }
    span {
      display: block;
      float: left;
      font-size: 12px;
      padding-top: 12px;
      padding-left: 10px;
    }
  }
  .community-datail-header-bottom-right {
    float: right;
    .button {
      display: block;
      border: 1px solid #0a3c59;
      background: #3e779d;
      background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(#6637cc),
        to(#3e779d)
      );
      background: -webkit-linear-gradient(top, #6637cc, #3e779d);
      background: -moz-linear-gradient(top, #6637cc, #3e779d);
      background: -ms-linear-gradient(top, #6637cc, #3e779d);
      background: -o-linear-gradient(top, #6637cc, #3e779d);
      background-image: -ms-linear-gradient(top, #6637cc 0%, #3e779d 100%);
      padding: 10.5px 21px;
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      border-radius: 6px;
      -webkit-box-shadow: rgba(255, 255, 255, 0.4) 0 1px 0,
        inset rgba(255, 255, 255, 0.4) 0 1px 0;
      -moz-box-shadow: rgba(255, 255, 255, 0.4) 0 1px 0,
        inset rgba(255, 255, 255, 0.4) 0 1px 0;
      box-shadow: rgba(255, 255, 255, 0.4) 0 1px 0,
        inset rgba(255, 255, 255, 0.4) 0 1px 0;
      text-shadow: #7ea4bd 0 1px 0;
      color: #e6edf2;
      font-size: 14px;
      font-family: helvetica, serif;
      text-decoration: none;
      vertical-align: middle;
    }
    .button:hover {
      border: 1px solid #0a3c59;
      text-shadow: #1e4158 0 1px 0;
      background: #3e779d;
      background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(#4e338a),
        to(#3e779d)
      );
      background: -webkit-linear-gradient(top, #4e338a, #3e779d);
      background: -moz-linear-gradient(top, #4e338a, #3e779d);
      background: -ms-linear-gradient(top, #4e338a, #3e779d);
      background: -o-linear-gradient(top, #4e338a, #3e779d);
      background-image: -ms-linear-gradient(top, #4e338a 0%, #3e779d 100%);
      color: #d694d6;
    }
    .button:active {
      text-shadow: #1e4158 0 1px 0;
      border: 1px solid #0a3c59;
      background: #65a9d7;
      background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(#3e779d),
        to(#3e779d)
      );
      background: -webkit-linear-gradient(top, #3e779d, #65a9d7);
      background: -moz-linear-gradient(top, #3e779d, #65a9d7);
      background: -ms-linear-gradient(top, #3e779d, #65a9d7);
      background: -o-linear-gradient(top, #3e779d, #65a9d7);
      background-image: -ms-linear-gradient(top, #3e779d 0%, #65a9d7 100%);
      color: #fff;
    }
  }
}
</style>
