<template>
  <div class="search-course-list" @click="onDetail">
    <img :src="$props.item.imageUrl" alt="">
    <span class="search-course-list-name">{{$props.item.name}}</span>
    <p class="search-course-list-info">{{$props.item.intro}}</p>
  </div>
</template>

<script>
import { base64 } from 'vux'
export default {
  props: {
    item: {
      type: Object,
      default: function () {
        return {
            imageUrl: '',
            name: '',
            intro: ''
          }
        }
    }
  },
  methods: {
    onDetail() {
      this.$router.push({
        path: '/detail/course/' + base64.encode(this.$props.item._id)
      })
    }
  }
};
</script>

<style lang="less">

.search-course-list {
  width: 100%;
  height: 1.6rem;
  font-size: 12px;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
  img {
    width: 30%;
    height: 80%;
    position: absolute;
    top: 10%;
    left: 5%;
  }
  .search-course-list-name {
    width: 60%;
    font-size: 14px;
    font-weight: bold;
    display: block;
    position: absolute;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    top: 10%;
    left: 40%;
  }
  .search-course-list-info {
    display: block;
    width: 52%;
    height: 0.8rem;
    font-size: 12px;
    color: #3f3f3f;
    position: absolute;
    top: 24%;
    left: 40%;
    line-height: 0.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
}
</style>
