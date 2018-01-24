<template>
  <div class="topic-list">
    <span class="radius"></span>
    <span class="name">编程语言</span>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
  .topic-list {
    background-color: white;
    height: .8rem;
    font-size: 16px;
    display: flex;
    align-items: center;
    .radius {
      display: block;
      background-color: #ff1b2c;
      width: .2rem;
      height: .2rem;
      margin-left: .5rem;
    }
    .name {
      margin-left: .5rem;
    }
  }
</style>
