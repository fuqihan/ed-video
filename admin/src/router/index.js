// import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const index = r => require.ensure([], () => r(require('../page/index.vue')), 'index')
const home = r => require.ensure([], () => r(require('../page/home/home.vue')), 'home')
const person = r => require.ensure([], () => r(require('../page/person/index.vue')), 'person')
const findPerson = r => require.ensure([], () => r(require('../page/person/findPerson.vue')), 'findPerson')
const addPerson = r => require.ensure([], () => r(require('../page/person/addPerson.vue')), 'addPerson')
const distributionPerson = r => require.ensure([], () => r(require('../page/person/distribution.vue')), 'distribution')
const teacher = r => require.ensure([], () => r(require('../page/teacher/index.vue')), 'teacher')
const addTeacher = r => require.ensure([], () => r(require('../page/teacher/addTeacher.vue')), 'addTeacher')
const findTeacher = r => require.ensure([], () => r(require('../page/teacher/findTeacher.vue')), 'findTeacher')
const courses = r => require.ensure([], () => r(require('../page/courses/index.vue')), 'courses')
const addClassifications = r => require.ensure([], () => r(require('../page/courses/addClassifications.vue')), 'addClassifications')
const addCourses = r => require.ensure([], () => r(require('../page/courses/addCourses.vue')), 'addCourses')
const findCourses = r => require.ensure([], () => r(require('../page/courses/findCourses.vue')), 'findCourses')
const login = r => require.ensure([], () => r(require('../page/login/login.vue')), 'login')

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: '主页',
    component: index,
    children: [
      {
        path: '/',
        redirect: 'home'
      },
      {
        path: 'home',
        name: '默认',
        component: home
      },
      {
        path: 'person',
        name: '用户管理',
        component: person,
        children: [
          {
            path: '/',
            redirect: 'findPerson'
          },
          {
            path: 'findPerson',
            name: '查看用户',
            component: findPerson
          },
          {
            path: 'addPerson',
            name: '添加用户',
            component: addPerson
          },
          {
            path: 'distributionPerson',
            name: '用户分布图',
            component: distributionPerson
          },
        ]
      },
      {
        path: 'teacher',
        name: '教师管理',
        component: teacher,
        children: [
          {
            path: 'addTeacher',
            name: '添加教师',
            component: addTeacher
          },
          {
            path: 'findTeacher',
            name: '添加教师',
            component: findTeacher
          },
        ]
      },
      {
        path: 'courses',
        name: '课程管理',
        component: courses,
        children: [
          {
            path: 'addClassifications',
            name: '添加课程分类',
            component: addClassifications
          },
          {
            path: 'addCourses',
            name: '添加课程信息',
            component: addCourses
          },
          {
            path: 'findCourses',
            name: '查看课程信息',
            component: findCourses
          },
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
]


const router = new Router({
  linkActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.state.login) {
    if (to.path !== '/login') {
      console.log(to)
      next({path: '/login'})
    } else {
      next()
    }
  } else {
    console.log(to)
    next()
  }
})

export default router
