import axios from 'axios'
import * as util from '../config/util'

export function addClassification(name) {
  return axios.post(util.localhostUrl + '/classifications/classification', name)
}

export function findClassifications() {
  return axios.get(util.localhostUrl + '/classifications/findClassifications')
}
