import axios from 'axios'
import * as util from '../config/util'

// const token = localStorage['edVideoToken']
/*
* Get
* 用于分类查找课程
* */
export function findTalks(id) {
    return axios.get(util.locaUrl + 'talk/talks?id=' + id)
}

export function addTalk(obj) {
    return axios.post(util.locaUrl + 'talk/talk', obj)
}

export function findTalkDetail(id) {
    return axios.get(util.locaUrl + `talk/findTalkDetail?id=${id}`)
}
