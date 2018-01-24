import axios from 'axios'
import * as util from '../config/util'
// const token = localStorage['edVideoToken']

/*
* Get
*获取所有用户信息
* */
export function getUsers() {
  return axios.get(util.locaUrl + 'user/users')
}

/*
* Post
* 创建用户
*/
export function addUser(obj) {
  return axios.post(util.locaUrl + 'user/user', {obj: obj})
}

/*
* Get
* 查找单个用户，用于登陆
* */
export function findUser(obj) {
  return axios.get(util.locaUrl + 'user/user?username=' + obj.username + '&password=' + obj.password)
}
