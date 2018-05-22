/*
   课程讨论
*/
const Schema = require('../index.js').Schema
let a = new Date(new Date().getTime() + 28800000)
module.exports = {
    intro: String,//内容
    heat: Number,//热度，赞数
    talk: {type: String, ref: 'talks'},
    course: {type: String, ref: 'courses'},//外键，指向这个课程的作者
    person: {type: Schema.Types.ObjectId, ref: 'persons', unique: true},//发这句讨论的人
    createDate: {type: Date, default: a},
}