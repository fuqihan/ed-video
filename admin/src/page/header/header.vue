<template>
  <el-row>
    <el-col :span="24">
      <div class="grid-content header">
        <el-row>
          <el-col :span="4">
            <i class="el-icon-edit header-isMenu" @click="isMenu"></i>
          </el-col>
          <el-col :span="18"><span class="header-name">课后轻松学管理系统</span></el-col>
          <el-col :span="2">
            <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <img class="header-avatar-img" src="../../images/avatar.jpg" alt="">
      </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    props: ['isCollapse'],
    methods: {
      isMenu() {
        this.$emit('update:isCollapse', !this.$props.isCollapse)
      }
    }
  }
</script>

<style lang="less">
  @import "../../style/my";

  .header {
    height: 60px;
    background-color: @themeColor;
    .header-isMenu {
      text-align: center;
      color: white;
      display: block;
      width: 64px;
      line-height: 60px;
    }
    .header-name {
      color: white;
      display: block;
      font-size: 20px;
      line-height: 60px;
    }
    .header-avatar-img {
      margin-top: 5px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      float: right;
      line-height: 60px;
      margin-right: 50px;
    }
  }
</style>
