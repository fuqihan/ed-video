import axios from 'axios'
import * as util from '../config/util'

// const token = localStorage['edVideoToken']
/*
* Get
* 用于分类查找课程
* */
export function findCourses(id) {
  return axios.get(util.locaUrl + 'courses/findCourses?id=' + id)
}
/*
* Get
* 用于搜索查找课程
* */
export function findSearchCourses(obj) {
  return axios.get(util.locaUrl + 'courses/courses', {params: obj})
}
/*
* Get
* 用于主页查找热门课程
* */
export function homeFindPopularCourses() {
  return axios.get(util.locaUrl + 'courses/homeFindPopularCourses')
}

export function findCoursesById(id) {
  return axios.get(util.locaUrl + 'courses/course?id=' + id)
}

export function findHomeCourses(obj) {
  return axios.get(util.locaUrl + 'courses/courses?page=' + obj.page + '&limit=' + obj.limit + "&reg=''")
}

export function addCourseTalk(obj) {
  return axios.post(util.locaUrl + 'courses/addCourseTalk', obj)
}