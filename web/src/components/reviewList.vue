<template>
  <div class="review-list" @click="onDetail">
    <img src="http://climg.mukewang.com/59030cc50001144806000338.jpg" alt="">
    <span class="review-list-name">{{talk.person.name}}</span>
    <span class="review-list-date">{{talk.createDate | parseTime}}</span>
    <span class="review-list-center">{{talk.intro}}</span>
  </div>
</template>

<script>
import * as filters from '../filters/filters'
export default {
  props: ["talk"],
  filters:{
    parseTime: filters.parseTime
  },
  methods: {
    onDetail() {
      this.$router.push({
        name: "textModel",
        params: {
          text:
            this.$props.talk.intro
        }
      });
    }
  }
};
</script>

<style lang="less">
.review-list {
  height: 3rem;
  border-bottom: 1px solid #e8e8e8;
  position: relative;
  img {
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    position: absolute;
    top: 0.1rem;
    left: 0.4rem;
  }
  .review-list-name {
    font-size: 16px;
    position: absolute;
    top: 0.21rem;
    left: 1.22rem;
  }
  .review-list-date {
    font-size: 14px;
    position: absolute;
    right: 0.4rem;
    top: 0.22rem;
  }
  .review-list-center {
    width: 90%;
    /*height: 1.2rem;*/
    font-size: 16px;
    line-height: 0.4rem;
    color: #7b7b7b;
    padding: 5px;
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    /*display: -webkit-box;*/
    /*-webkit-line-clamp: 3;*/
    /*-webkit-box-orient: vertical;*/
    /*white-space: normal;*/
    position: absolute;
    top: 0.9rem;
    left: 5%;
  }
}
</style>
