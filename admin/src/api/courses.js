import axios from 'axios'
import * as util from '../config/util'

export function addCourses(obj) {
  return axios.post(util.localhostUrl + '/courses/courses', obj)
}

export function findCourses(obj) {
  return axios.get(util.localhostUrl + '/courses/courses', {params: obj})
}

export function updateActive(obj) {
  return axios.put(util.localhostUrl + '/courses/updateActive', obj)
}
