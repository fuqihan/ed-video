<template>
  <div ref="courseChart" style="width: 400px;height:300px;padding-right: 20px"></div>
</template>

<script>
  const option = {
    title: {
      text: '活动效果'
    },
    tooltip: {},
    legend: {
      x: 'right',
      data: ['热度', '关注']
    },
    radar: {
      // shape: 'circle',
      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      indicator: [
        { name: '团队实力', max: 6500},
        { name: '主题热度', max: 16000},
        { name: '项目热度', max: 30000},
        { name: '运营时间', max: 38000},
        { name: '新闻舆情', max: 52000},
        { name: '已投机构', max: 52000},
      ]
    },
    series: [{
      name: '预算 vs 开销（Budget vs spending）',
      type: 'radar',
      // areaStyle: {normal: {}},
      data : [
        {
          value : [4300, 10000, 28000, 35000, 50000, 40000],
          name : '热度'
        },
        {
          value : [5000, 14000, 28000, 31000, 42000, 36000],
          name : '关注'
        }
      ]
    }]
  };
  export default {
    mounted() {
      let myChart = this.$echarts.init(this.$refs.courseChart);
      myChart.setOption(option);
    }
  }
</script>

<style lang="less">

</style>
