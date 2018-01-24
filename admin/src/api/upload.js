import axios from 'axios'
import * as util from '../config/util'

export function adminUpload(formdata) {
  return axios.post(util.localhostUrl + '/uploadImage', formdata, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
