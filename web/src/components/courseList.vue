<template>
  <div class="course-list" @click="onDetail">
    <div class="img">
      <img :src="$props.item.imageUrl" alt="">
      <!--<span class="img-up" :style="{color: this.imgUpColor}" ref="imgUp">HTML+CSS基础课程CSS基础课程CSS基础课程</span>-->
    </div>
    <p class="name">{{$props.item.name}}</p>
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
            name: ''
          }
        }
      }
    },
    data() {
      return {
        imgUpColor: ''
      }
    },
    methods: {
      onDetail() {
        this.$router.push({path: '/detail/course/' + base64.encode(this.$props.item._id)})
      }
    },
    mounted() {
      this.imgUpColor = 'rgba(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',1)'
    }
  }
</script>

<style lang="less">
  .course-list {
    background-color: white;
    margin: .1rem;
    width: 2.88rem;
    height: 2.62rem;
    text-align: center;
    .img {
      position: relative;
      img {
        width: 100%;
        height: 1.9rem;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: block;
        position: absolute;
      }
      .img-up {
        display: block;
        width: 70%;
        font-size: 12px;
        position: absolute;
        left: .4rem;
        top: .6rem

      }
    }
    .name {
      padding-top: 2rem;
      color: black;
      width: 90%;
      display: block;
      margin: 0 auto;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
