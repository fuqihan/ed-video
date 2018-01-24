import axios from 'axios'
import * as util from '../config/util'

// const token = localStorage['edVideoToken']
export function findClassifications() {
  return axios.get(util.locaUrl + 'classifications/findClassifications')
}
