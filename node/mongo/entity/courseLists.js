/*
   课程列表
*/
const Schema = require('../index.js').Schema
let a = new Date(new Date().getTime() + 28800000)
module.exports = {
    name: {type: String, unique: true},//名字
    url: String,
    course: {type: Schema.Types.ObjectId, ref: 'courses', unique: true},//外键，指向这个课程的作者
    createDate: {type: Date, default: a},
}
