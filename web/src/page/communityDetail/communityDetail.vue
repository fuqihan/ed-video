<template>
  <div class="community-datail">
     <div class="f-home-theme-header-icon"  @click="$router.push({name: 'community'})">
        <icon type='cancel'></icon>
      </div>
    <div class="community-datail-header">
        <div class="community-datail-header-title">你热爱编程吗</div>
        <div class="community-datail-header-center">你热爱编程吗</div>
        <div class="community-datail-header-bottom">
          <div class="community-datail-header-bottom-left">
            <img src="http://tva2.sinaimg.cn/crop.0.0.100.100.50/005Txlymjw8enrjx569wrj302s02sa9x.jpg" alt="">
            <span>fuqihan</span>
          </div>
          <div class="community-datail-header-bottom-right">
             <span class="button" @click="toSend">立即回答</span> 
          </div>
          <div style="clear: both"></div>
        </div>
    </div>
    <review-list :key="item" v-for="item in 10"></review-list>
  </div>
</template>

<script>
import { XButton } from "vux";
import reviewList from "../../components/reviewList.vue";
import { Icon } from "vux";
export default {
  components: {
    XButton,
    reviewList,
    Icon
  },
  methods: {
    toSend() {
      this.$router.push({ name: "inputModel" });
    }
  }
};
</script>

<style lang="less">
.community-datail {
  width: 100%;
  .community-datail-header {
    width: 100%;
    .community-datail-header-title {
      padding: 20px 0;
      display: block;
      font-size: 16px;
      text-align: center;
    }
    .community-datail-header-center {
      border-top: 1px solid rgb(216, 213, 213);
      font-size: 16px;
      padding: 15px 10px;
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
  }
}
.f-home-theme-header-icon {
  z-index: 99;
  margin-top: -10px;
  margin-left: 5px;
  height: 20px;
  width: 20px;
}
</style>
