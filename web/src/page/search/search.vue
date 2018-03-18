<template>
  <div class="search" ref="search">
    <div class="search-active">
      <span class="search-active-checkbox" @click="showCheck=true">{{checkText.name}}</span>
      <input type="text" ref="searchText" v-model="searchText" @keyup.enter="onSearch">
      <div class="search-active-cancel" @click="onActive">取消</div>
    </div>
    <actionsheet v-model="showCheck" :menus="menuCheck" theme="android" @on-click-menu="onCheck">
    </actionsheet>
    <div class="search-model" v-show="!this.searchEnter"
         :style="{minHeight: searchModelHeight}">
      <span class="search-model-title">热门搜索</span>
      <div class="search-model-list">
        <div class="list" :key="item.name" v-for="item in classifi">{{item.name}}</div>
      </div>
      <!-- <div class="search-model-list-before">查看更多...</div> -->
      <span class="search-model-title">搜索历史</span>
      <!-- <div class="search-model-list">
        <div class="list" v-for="item in 10">anguaalar</div>
      </div> -->
    </div>
    <div class="search-list-model" v-show="this.searchEnter"
         :style="{minHeight: searchModelHeight}">
         <div v-if="checkText.name === menuCheck.video">
           <search-course :item="item" v-for="item in courseList" :key="item._id"></search-course>
         </div>
         <div v-if="checkText.name === menuCheck.teacher">
             <teacher-list :item="item" v-for="item in teacherList" :key="item._id"></teacher-list>
         </div>
    </div>
  </div>
</template>

<script>
  import {Actionsheet} from 'vux'
  import searchCourse from '../../components/searchCourse.vue'
  import teacherList from '../../components/teacherList.vue'
  import api from '../../api/index'
  export default {
    data() {
      return {
        searchModelHeight: '',
        searchText: '',
        searchEnter: false,
        checkText: {name: '视频', key: 'video'},
        showCheck: false,
        classifi: [],
        menuCheck: {
          video: '视频',
          // classification: '类别',
          // topic: '题目',
          teacher: '教师'
        },
        teacherList: [],
        courseList: []
      }
    },
    components: {
      Actionsheet,
      searchCourse,
      teacherList
    },
    methods: {
      onCheck(key) {
        this.checkText = {name: this.menuCheck[key], key: key}
      },
      onActive() {
        this.$router.go(-1)
        this.searchText = ''
        this.searchEnter = false
      },
      onSearch() {
        this.searchEnter = true
        if (this.checkText.name === this.menuCheck.video) {
          api.courses.findSearchCourses({
            page: 1,
            limit: 100,      //  访问参数
            title: this.searchText,
            sort: '+id'
          }).then(data => {
            this.courseList = data.data.data.data
          })
        }
        if (this.checkText.name === this.menuCheck.teacher) {
          api.teacher.findTeachers({
            page: 1,
            limit: 100,      //  访问参数
            title: this.searchText,
            sort: '+id'
          }).then(data => {
            this.teacherList = data.data.data.data
          })
        }
      }
    },
    mounted() {
      let searchModelHeight = window.screen.height - this.$refs.search.offsetHeight
      this.searchModelHeight = searchModelHeight + 'px'
      api.classifications.findClassifications().then((data) => {
        this.classifi = data.data.data
      })
    }
  }
</script>

<style lang="less">
  @import "../../style/iconfont.css";

  @searchActiveColor: #4b4b4b;

  .search {
    width: 100%;
    height: .8rem;
    z-index: 99;
    .search-active {
      height: 100%;
      width: 100%;
      background-color: @searchActiveColor;
      display: flex;
      justify-content: center;
      align-items: center;
      .search-active-checkbox {
        font-size: 14px;
        width: 16%;
        height: .48rem;
        color: white;
        margin-right: .2rem;
        text-align: center;
        line-height: .48rem;
      }
      input {
        width: 52%;
        height: 60%;
        border-radius: 5%;
      }
      .search-active-cancel {
        font-size: 12px;
        color: white;
        width: 16%;
        height: .48rem;
        background-color: #2259ff;
        border-radius: 12%;
        margin-left: .2rem;
        text-align: center;
        line-height: .48rem;
      }
    }
    .search-model {
      width: 100%;
      background: white;
      z-index: 99;
      .search-model-title {
        display: block;
        padding-top: .4rem;
        margin-left: .4rem;
        font-size: 14px;
        font-weight: bold;
      }
      .search-model-list {
        height: 2rem;
        font-size: 12px;
        padding-left: .14rem;
        margin: .2rem auto;
        display: flex;
        flex-wrap: wrap;
        .list {
          padding: 0 .1rem;
          height: .5rem;
          text-align: center;
          line-height: .5rem;
          margin: .1rem .1rem;
          border-radius: 5%;
          background-color: #d4d4d4;
        }
      }
      .search-model-list-before {
        display: inline-block;
        font-size: 12px;
        text-align: center;
        width: 100%;
      }
    }
    .search-list-model {
      width: 100%;
      background: white;
      z-index: 99;
    }
  }
</style>
