<template>
  <div class="community-datail">
    <div class="community-datail-header">
        <div class="community-datail-header-title">你热爱编程吗</div>
        <div class="community-datail-header-center">你热爱编程吗</div>
        <div class="community-datail-header-bottom">
          <div class="community-datail-header-bottom-left">
            <img src="http://tva2.sinaimg.cn/crop.0.0.100.100.50/005Txlymjw8enrjx569wrj302s02sa9x.jpg" alt="">
            <span>fuqihan</span>
          </div>
          <div class="community-datail-header-bottom-right">
             <x-button type="default">立即回答</x-button> 
          </div>
          <div style="clear: both"></div>
        </div>
    </div>
    <review-list :key="item" v-for="item in 10"></review-list>
  </div>
</template>

<script>
import { XButton } from 'vux'
import reviewList from '../../components/reviewList.vue'
export default {
  components: {
    XButton,
    reviewList
  }
};
</script>

<style lang="less">
.community-datail {
  width: 100%;
  .community-datail-header {
    width: 100%;
    .community-datail-header-title {
      padding-top: 10px;
      display: block;
      font-size: 16px;
      text-align: center;
    }
    .community-datail-header-center {
      font-size: 12px;
    }
    .community-datail-header-bottom {
      border-top: 1px solid black;
      border-bottom: 1px solid black;
      .community-datail-header-bottom-left {
        padding-top: 6px;
        padding-left: 5px;
        float: left;
        img {
          display: block;
          border-radius: 50%;
          width: 35px;
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
      }
    }
  }
}
</style>
