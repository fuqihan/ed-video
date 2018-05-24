import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

const Index = r => require.ensure([], () => r(require('../page/index.vue')), 'index')
const Home = r => require.ensure([], () => r(require('../page/home/home.vue')), 'index')
const Login = r => require.ensure([], () => r(require('../page/login/index.vue')), 'index')
const Register = r => require.ensure([], () => r(require('../page/register/register.vue')), 'index')
const Classification = r => require.ensure([], () => r(require('../page/classification/classification.vue')), 'index')
const Community = r => require.ensure([], () => r(require('../page/community/community.vue')), 'index')
const Person = r => require.ensure([], () => r(require('../page/person/person.vue')), 'index')
const Topic = r => require.ensure([], () => r(require('../page/topic/topic.vue')), 'index')
const Detail = r => require.ensure([], () => r(require('../page/detail/index.vue')), 'index')
const CourseDetail = r => require.ensure([], () => r(require('../page/detail/course.vue')), 'index')
const TeacherDetail = r => require.ensure([], () => r(require('../page/detail/teacher.vue')), 'index')
const CommunityDetail = r => require.ensure([], () => r(require('../page/communityDetail/communityDetail.vue')), 'index')
const Video = r => require.ensure([], () => r(require('../page/video/video.vue')), 'index')
const Search = r => require.ensure([], () => r(require('../page/search/search.vue')), 'index')
const Theme = r => require.ensure([], () => r(require('../page/theme/theme.vue')), 'index')
const TextModel = r => require.ensure([], () => r(require('../page/model/textModel.vue')), 'index')
const InputModel = r => require.ensure([], () => r(require('../page/model/inputModel.vue')), 'index')
const TalkModel = r => require.ensure([], () => r(require('../page/model/talkModel.vue')), 'index')

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    children: [
      {
        path: '/',
        redirect: '/index/home'
      },
      {
        path: 'home',
        name: 'home',
        component: Home
      },
      {
        path: 'classification',
        name: 'classification',
        component: Classification
      },
      {
        path: 'topic',
        name: 'topic',
        component: Topic
      },
      {
        path: 'community',
        name: 'community',
        component: Community
      },
      {
        path: 'person',
        name: 'person',
        component: Person
      }
    ]
  },
  {
    path: '/communityDetail:id',
    name: 'CommunityDetail',
    component: CommunityDetail
  },
  {
    path: '/textModel',
    name: 'textModel',
    component: TextModel
  },
  {
    path: '/talkModel',
    name: 'talkModel',
    component: TalkModel
  },
  {
    path: '/inputModel:id',
    name: 'inputModel',
    component: InputModel
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/theme/:url',
    name: 'theme',
    component: Theme
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/video:id',
    name: 'video',
    component: Video
  },
  {
    path: '/detail',
    component: Detail,
    children: [
      {
        path: 'teacher/:id',
        name: 'teacherDetail',
        component: TeacherDetail
      },
      {
        path: 'course/:id',
        name: 'courseDetail',
        component: CourseDetail
      }
    ]
  }
]
const router = new Router({
  // mode: 'history',
  linkActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.state.loginInfo) {
    if (to.name === 'person') {
      store.commit('LOGIN_BEFORE', '/index/person')
      next({ path: '/login' })
    }
  }
  next()
})

export default router
