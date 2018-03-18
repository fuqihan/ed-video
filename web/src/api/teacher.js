import axios from 'axios'
import * as util from '../config/util'

// const token = localStorage['edVideoToken']
export function homeFindLikeTeacher() {
  return axios.get(util.locaUrl + 'teacher/homeFindLikeTeacher')
}

export function findTeachers(obj) {
  return axios.get(util.locaUrl + 'teacher/teachers', {params: obj})
}

export function findTeacherId(id) {
  return axios.get(util.locaUrl + 'teacher/teacher?id=' + id)
}
