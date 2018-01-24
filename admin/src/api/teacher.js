import axios from 'axios'
import * as util from '../config/util'

export function addTeacher(obj) {
  return axios.post(util.localhostUrl + '/teacher/teacher', obj)
}
export function findTeachers(obj) {
  return axios.get(util.localhostUrl + '/teacher/teachers', {params: obj})
}

export function updateTeacher(obj) {
  return axios.put(util.localhostUrl + '/teacher/teacher', obj)
}

export function updateActive(obj) {
  return axios.put(util.localhostUrl + '/teacher/updateActive', obj)
}
