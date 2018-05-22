/*
   讨论
*/
const Schema = require('../index.js').Schema
let a = new Date(new Date().getTime() + 28800000)
module.exports = {
    intro: String,//内容
    title: String,
    classification: {type: String, ref: 'classifications'},
    person: {type: Schema.Types.ObjectId, ref: 'persons', unique: true},//外键，指向这个课程的作者
    createDate: {type: Date, default: a},
}
