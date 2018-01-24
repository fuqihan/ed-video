<template>
  <div class="home">
    <div class="name-cart">
      <img src="../../images/avatar.jpg" class="name-cart-img" alt="">
      <span class="name-cart-name">蜡笔</span>
      <div class="name-cart-warm">
        <el-badge :value="12" class="item">
          <el-button size="small">提醒</el-button>
        </el-badge>
        <el-badge :value="12" class="item">
          <el-button size="small">待办</el-button>
        </el-badge>
      </div>
    </div>
    <course-chart></course-chart>
    <activity-chart></activity-chart>
    <statistics-chart></statistics-chart>
    <access-map-chart></access-map-chart>
  </div>
</template>

<script>
  import courseChart from './child/courseChart.vue'
  import activityChart from './child/activityChart.vue'
  import statisticsChart from './child/statisticsChart.vue'
  import accessMapChart from './child/accessMapChart.vue'

  export default {
    components: {
      courseChart,
      activityChart,
      statisticsChart,
      accessMapChart
    }
  }
</script>

<style lang="less">
  .home {
    margin-left: 2%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    & > .name-cart {
      padding: 10px 20px;
      width: 20%;
      border: 1px solid #e2e2e2;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      & > .name-cart-img {
        width: 80%;
        border-radius: 50%;
        display: block;
        padding-top: 10px;
      }
      & > .name-cart-name {
        padding-top: 10px;
        font-size: 22px;
      }
      & > .name-cart-warm {
        width: 100%;
        padding-top: 10px;
        display: flex;
        justify-content: space-between;
        span {
          padding: 10px;
        }
      }
    }
  }
</style>
