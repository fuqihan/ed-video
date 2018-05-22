<template>
  <div class="community">
    <div class="community-nav">
      <div ref="communityNavList" class="community-nav-list"
           :style="communityNavListStyle.info?communityNavListStyle: 0">
        <div class="list" @click="onAll">全部</div>
        <div class="list" :key="item.name" v-for="item in classifi" @click="onList(item._id)">{{item.name}}</div>
      </div>
      <div class="community-nav-more" @click="navMore">{{communityNavListStyle.info ? '查看更多' : '收起'}}></div>
    </div>
    <div class="community-center">
      <community-list :data="item" :key="index" v-for="(item, index) in communitys"></community-list>
    </div>
    <div class="community-create" @click="$router.push('/talkModel')">
          +
    </div>
    <loading style="font-size: 12px" :show="loading"></loading>
  </div>
</template>

<script>
import communityList from "./child/communityList.vue";
import api from "../../api/index";
import { Loading } from "vux";
export default {
  data() {
    return {
      communityNavListStyle: {
        overflow: "hidden",
        height: "1.6rem",
        info: true
      },
      classifi: [],
      communitys: [],
      loading: true
    };
  },
  components: {
    communityList,
    Loading
  },
  methods: {
    navMore() {
      this.communityNavListStyle.info = !this.communityNavListStyle.info;
    },
    onAll() {
      this.loading = true;
      api.talk.findTalks("").then(data => {
        this.communitys = data.data.data;
        this.loading = false;
      });
    },
    onList(id) {
      this.loading = true;
      console.log(id);
      api.talk.findTalks(id).then(data => {
        this.communitys = data.data.data;
        this.loading = false;
      });
    }
  },
  mounted() {
    api.classifications.findClassifications().then(data => {
      this.classifi = data.data.data;
    });
    api.talk.findTalks("").then(data => {
      this.communitys = data.data.data;
      this.loading = false;
    });
  }
};
</script>

<style lang="less">
.community {
  width: 100%;
  .community-nav {
    border-bottom: 1px solid #dfdfdf;
    .community-nav-list {
      width: 100%;
      font-size: 12px;
      line-height: 0.6rem;
      display: flex;
      flex-wrap: wrap;
      .list {
        margin: 0.1rem 0.1rem;
        padding: 0 0.1rem;
        border-radius: 25%;
        background-color: rgba(0, 7, 235, 0.11);
        display: block;
        text-align: center;
      }
    }
    .community-nav-more {
      font-size: 16px;
      width: 30%;
      text-align: center;
      padding: 0.1rem;
      margin: 0.2rem auto;
      border-radius: 12%;
      background-color: rgba(0, 7, 235, 0.11);
    }
  }
  .community-center {
    width: 100%;
  }
}
.community-create {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgb(136, 135, 135);
  position: fixed;
  bottom: 1.4rem;
  right: 30px;
  text-align: center;
  line-height: 40px;
}
</style>
