<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="less">

  body {
    margin: 0;
  }

  body::-webkit-scrollbar {
    display: none;
  }

  * {
    font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
    text-decoration: none;
  }
</style>
