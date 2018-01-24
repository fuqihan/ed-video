import axios from 'axios'
import * as util from '../config/util'

// const token = localStorage['edVideoToken']
export function weiboFindUserInfo(accessToken, uid) {
  return axios.get(util.locaUrl + 'login/getWbUserInfo?accessToken=' + accessToken + '&uid=' + uid)
}
