<template>
  <div class="community-list">
    <img src="http://climg.mukewang.com/59030cc50001144806000338.jpg" alt="">
    <span class="community-list-name">符启晗</span>
    <span class="community-list-date">最后回复: 1天前</span>
    <span class="community-list-center">史上最牛逼标题史上最牛逼标题史上最牛逼标题史上最牛逼的标题史上最牛逼的标题史上最牛逼的标题史上最牛逼的标题史上最牛逼的标题史上最牛逼的标题史上最牛逼的标题史上最牛逼的标题</span>
  </div>
</template>

<script>

  export default {}
</script>

<style lang="less">
  .community-list {
    height: 3rem;
    border-bottom: 1px solid #e8e8e8;
    position: relative;
    img {
      width: .7rem;
      height: .7rem;
      border-radius: 50%;
      position: absolute;
      top: .1rem;
      left: .4rem;
    }
    .community-list-name {
      font-size: 16px;
      position: absolute;
      top: .21rem;
      left: 1.22rem;
    }
    .community-list-date {
      font-size: 14px;
      position: absolute;
      right: .4rem;
      top: .22rem;
    }
    .community-list-center {
      width: 90%;
      /*height: 1.2rem;*/
      font-size: 12px;
      line-height: 0.4rem;
      color: #7b7b7b;
      /*overflow: hidden;*/
      /*text-overflow: ellipsis;*/
      /*display: -webkit-box;*/
      /*-webkit-line-clamp: 3;*/
      /*-webkit-box-orient: vertical;*/
      /*white-space: normal;*/
      position: absolute;
      top: .9rem;
      left: 5%;
    }
  }
</style>
