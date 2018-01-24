import axios from 'axios'
import * as util from '../config/util'

export function addPerson(obj) {
  return axios.post(util.localhostUrl + '/person/person', obj)
}

export function findPersons(obj) {
  return axios.get(util.localhostUrl + '/person/persons', {params: obj})
}

export function updatePerson(obj) {
  return axios.put(util.localhostUrl + '/person/person', obj)
}

export function updateActive(obj) {
  return axios.put(util.localhostUrl + '/person/updateActive', obj)
}
