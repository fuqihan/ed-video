<template>
  <div class="home">
    <div class="home-swiper">
      <f-swiper :listImg="listImg" :sTime="5000" sHeight="2.3rem"></f-swiper>
    </div>
    <div class="home-nav">
      <router-link to="/theme/1"><i class="icon icon-color iconfont icon-gaokao"></i><span>高考</span></router-link>
      <router-link to="/theme/2"><i class="icon icon-color iconfont icon-jisuanji"></i><span>计算机</span></router-link>
      <router-link to="/theme/3"><i class="icon icon-color  iconfont icon-waiyu"></i><span>外语</span></router-link>
      <router-link to="/theme/4"><i class="icon icon-color iconfont icon-jineng"></i><span>技能</span></router-link>
    </div>
    <div class="home-popular">
      <div class="home-popular-header">
        <span>热门课程</span>
        <router-link to="/">查看更多 ></router-link>
      </div>
      <div class="home-popular-center">
        <course-list :key="item._id" :item="item" v-for="item in popularCourses"></course-list>
      </div>
    </div>
    <div class="home-teacher">
      <div class="home-teacher-header">
        <span>资深教师</span>
        <router-link to="/">查看更多</router-link>
      </div>
      <div class="home-teacher-center">
        <teacher-list :item="item" v-for="item in likeTeacher" :key="item._id"></teacher-list>
      </div>
    </div>
    <div class="home-like">
      <div class="home-like-header">
        <div class="home-like-header-hr"></div>
        <span>猜你喜欢</span>
        <div class="home-like-header-hr"></div>
      </div>
      <div class="home-like-center" v-infinite-scroll="loadMore"
           infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <course-list key="item" :item="item" v-for="item in homeCourses"></course-list>
        <loading style="font-size: 12px" :show="loading"></loading>
      </div>
      <div class="home-like-loading">
        <span>{{homeCoursesEnd}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import fSwiper from '../../components/swiper.vue'
  import courseList from '../../components/courseList.vue'
  import teacherList from '../../components/teacherList.vue'
  import api from '../../api/'
  import {Loading} from 'vux'

  export default {
    data() {
      return {
        height: '',
        homeFooter: true,
        listImg: [
          {url: 'http://oxw83yoit.bkt.clouddn.com/17156e86715d3827dfeef24524d6e8ff.blob'},
          {url: 'http://oxw83yoit.bkt.clouddn.com/8e9ee293ee938b4438ac4c75b618381b.blob'}
        ],
        popularCourses: [],
        likeTeacher: Array,
        likeCourses: [],
        busy: false,
        homeCoursesPage: 1,
        homeCourses: [],
        loading: false,
        homeCoursesEnd: '加载更多'
      }
    },
    components: {
      fSwiper,
      courseList,
      teacherList,
      Loading
    },
    mounted() {
      api.courses.homeFindPopularCourses().then((data) => {
        this.popularCourses = data.data.data
      })
      api.teacher.homeFindLikeTeacher().then(data => {
        this.likeTeacher = data.data.data
      })
      api.courses.findHomeCourses({limit: 6, page: this.homeCoursesPage}).then(data => {
        data.data.data.data.map(index => {
          this.homeCourses.push(index)
        })
        this.homeCoursesPage = 4
      })
    },
    methods: {
      loadMore() {
        this.homeCoursesPage += 1
        this.loading = true
        api.courses.findHomeCourses({limit: 2, page: this.homeCoursesPage}).then(data => {
          if (!data.data.data) {
            this.loading = false
            this.homeCoursesEnd = '已经到头了。。。'
            return
          }
          data.data.data.data.map(index => {
            this.homeCourses.push(index)
          })
          this.loading = false
        })
      }
    }
  }
</script>

<style lang="less">
  .home {
    .home-nav {
      height: 1.5rem;
      display: flex;
      font-size: 10px;
      a {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-decoration: none;
        i {
          padding-top: 0.1rem;
          font-size: 16px;
        }
        span {
          padding: 0.1rem;
          display: block;
          letter-spacing: 3px;
          font-size: 10px;
          color: #1d1b28;
        }
      }
    }
    .home-popular {
      background-color: #f5f5f5;
      .home-popular-header {
        height: .6rem;
        position: relative;
        font-size: 10px;
        span {
          position: absolute;
          left: .2rem;
          top: .2rem;
        }
        a {
          position: absolute;
          right: .2rem;
          top: .2rem;
          color: #111111;
          text-decoration: none;
        }
      }
      .home-popular-center {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
      }
    }
    .home-teacher {
      .home-teacher-header {
        height: .6rem;
        position: relative;
        font-size: 10px;
        span {
          position: absolute;
          left: .2rem;
          top: .2rem;
        }
        a {
          position: absolute;
          right: .2rem;
          top: .2rem;
          color: #111111;
          text-decoration: none;
        }
      }
      .home-teacher-center {
        display: flex;
        flex-direction: column;
      }
    }
    .home-like {
      background-color: #f5f5f5;
      .home-like-header {
        height: .6rem;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        .home-like-header-hr {
          width: 37%;
          height: 1px;
          background-color: #919191;
        }
      }
      .home-like-center {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

      }
      .home-like-loading {
        height: 1rem;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .icon-color {
    color: #ff03ce;
  }
</style>
