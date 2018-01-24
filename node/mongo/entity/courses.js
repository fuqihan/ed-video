/*
   课程
*/
const Schema = require('../index.js').Schema
let a = new Date(new Date().getTime() + 28800000)
module.exports = {
    name: {type: String, unique: true},//名字
    imageUrl: String,
    intro: String,
    editorContent: String,
    cliicCount: {type: Number, default: 0},  //点击量
    buyCount: {type: Number, default: 0},  //购买数
    courseLists: Array,
    active: {type: Boolean, default: false},
    author: {type: Schema.Types.ObjectId, ref: 'teachers',},//外键，指向这个课程的作者
    classification: {type: Schema.Types.ObjectId, ref: 'classifications',},
    createDate: {type: Date, default: a},
}
