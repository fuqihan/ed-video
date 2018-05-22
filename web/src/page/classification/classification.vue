<template>
  <div class="classification">
    <div class="classification-nav">
      <span  v-for="(item,index) in classifi" :key="index" :style="{color: item.active}"
            @click="onClassifi(item._id,index)">{{item.name}}</span>
    </div>
    <div class="classification-center">
      <loading :show="loadingShow" :text="loadingText" style="font-size: 12px"></loading>
      <classification-list :key="item._id" :item="item" v-for="item in classifiList"></classification-list>
    </div>
  </div>
</template>

<script>
  import classificationList from './child/classificationList.vue'
  import api from '../../api/index'
  import {Loading} from 'vux'

  let htmlBody = document.scrollingElement || document.documentElement
  export default {
    data() {
      return {
        classificationScrollHeight: '',
        classifi: [{name: ''}],    // 分类列表
        classifiList: [],
        loadingShow: true,
        loadingText: '请稍等'
      }
    },
    components: {
      classificationList,
      Loading
    },
    mounted() {
      htmlBody.scrollTop = 0
      api.classifications.findClassifications().then((data) => {
        this.classifi = data.data.data
        this.classifi[0].active = 'red'
        api.courses.findCourses(this.classifi[0]._id).then((coursesData) => {
          console.log(coursesData.data)
          this.classifiList = coursesData.data.data
          this.loadingShow = false
        })
      })
    },
    methods: {
      onClassifi(id, i) {
        this.loadingShow = true
        let listChange = (item) => {
          item.active = 'red'
          api.courses.findCourses(item._id).then((coursesData) => {
            this.classifiList = coursesData.data.data
            this.loadingShow = false
          })
        }
        this.classifi.map((item, index) => {
          index === i ? listChange(item) : item.active = ''
        })
      }
    }
  }
</script>

<style lang="less">

  .classification {
    display: flex;
    justify-content: flex-start;
    min-height: 100vh;
    max-height: 100vh;
    .classification-nav {
      width: 18%;
      overflow-y: scroll;
      min-height: 100vh;
      max-height: 100vh;
      > span {
        display: block;
        width: 100%;
        height: 1rem;
        color: #475152;
        text-align: center;
        line-height: 1rem;
        text-decoration: none;
        font-size: 12px;
      }
    }
    .classification-nav::-webkit-scrollbar {
      display: none;
    }
    .classification-center {
      flex: 1;
      background-color: #eeeeee;
      overflow-y: scroll;
      min-height: 100vh;
      max-height: 100vh;
    }
  }
</style>
