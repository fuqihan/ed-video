<template>
  <el-menu background-color="#545c64" text-color="#fff" :default-active="deActiive" class="el-menu-vertical-demo aaa"
           :collapse="isCollapse" router>
    <el-menu-item index="/index/home">
      <i class="el-icon-setting"></i>
      <span slot="title">主页</span>
    </el-menu-item>
    <el-submenu index="person">
      <template slot="title">
        <i class="el-icon-message"></i>
        <span slot="title">用户管理</span>
      </template>
      <el-menu-item index="/index/person/findPerson">查看用户</el-menu-item>
      <el-menu-item index="/index/person/addPerson">添加用户</el-menu-item>
      <!-- <el-menu-item index="/index/person/distributionPerson">用户分布</el-menu-item> -->
    </el-submenu>
    <el-submenu index="courses">
      <template slot="title">
        <i class="el-icon-message"></i>
        <span slot="title">课程管理</span>
      </template>
      <el-menu-item index="/index/courses/findCourses">查看课程</el-menu-item>
      <el-menu-item index="/index/courses/addCourses">添加课程信息</el-menu-item>
      <el-menu-item index="/index/courses/addClassifications">添加课程分类</el-menu-item>
    </el-submenu>
    <el-submenu index="teacher">
      <template slot="title">
        <i class="el-icon-message"></i>
        <span slot="title">教师管理</span>
      </template>
      <el-menu-item index="/index/teacher/findTeacher">查看教师</el-menu-item>
      <el-menu-item index="/index/teacher/addTeacher">添加教师</el-menu-item>
    </el-submenu>
    <!-- <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-message"></i>
        <span slot="title">活动管理</span>
      </template>
      <el-menu-item index="1-1">查看活动</el-menu-item>
      <el-menu-item index="1-2">添加活动</el-menu-item>
    </el-submenu>
    <el-menu-item index="6">
      <i class="el-icon-setting"></i>
      <span slot="title">支付记录</span>
    </el-menu-item> -->
  </el-menu>
</template>

<script>
  export default {
    props: ['isCollapse'],
    computed: {
      deActiive() {
        return this.$route.path
      }
    }
  }
</script>

<style lang="less">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100vh;
  }

  .aaa {
    min-height: 100vh;
  }
</style>
