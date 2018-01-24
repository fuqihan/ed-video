/*
   课程作者
*/
const Schema = require('../index.js').Schema
let a = new Date(new Date().getTime() + 28800000)
module.exports = {
    name: String,//名字
    username: {type: String, unique: true},//账号
    password: String,
    tel: {type: String, unique: true},
    imageUrl: String,
    sex: String,
    intro: String,
    attention: {type: Number, default: 0},
    title: String,// 称号
    active: {type: Boolean, default: false},
    address: Schema.Types.Mixed,
    createDate: {type: Date, default: a},
}
