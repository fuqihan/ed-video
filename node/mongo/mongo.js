'use strict'
const mongoose = require('./index.js')
// 连接mongodb
const options = {
    db: {native_parser: true},
    user: 'ed',
    pass: '123456'
}

mongoose.connect('mongodb://115.159.79.40:12345/edvideo', options)
// 实例化连接对象
const db = mongoose.connection
var Schema = mongoose.Schema

const personsEntity = require('./entity/persons.js')//用户表
const coursesEntity = require('./entity/courses.js')//课程表
const teachersEntity = require('./entity/teachers.js')//教师表
const classificationsEntity = require('./entity/classifications.js')//教师表
const courseTalksEntity = require('./entity/courseTalks')//课程评论表
const tokensEntity = require('./entity/tokens')//课程评论表

db.on('error', console.error.bind(console, '连接错误：'))
db.once('open', (callback) => {
    console.log('MongoDB连接成功！！')
})
// 创建schema
const personsSchema = new Schema(personsEntity)
const coursesSchema = new Schema(coursesEntity)
const teachersSchema = new Schema(teachersEntity)
const classificationsSchema = new Schema(classificationsEntity)
const courseTalksSchema = new Schema(courseTalksEntity)
const tokensSchema = new Schema(tokensEntity)

// 创建model
const persons = mongoose.model('persons', personsSchema, 'persons') // newClass为创建或选中的集合,第三个参数为实际表名
const courses = mongoose.model('courses', coursesSchema, 'courses')
const teachers = mongoose.model('teachers', teachersSchema, 'teachers')
const classifications = mongoose.model('classifications', classificationsSchema, 'classifications')
const courseTalks = mongoose.model('courseTalks', courseTalksSchema, 'courseTalks')
const tokens = mongoose.model('tokens', tokensSchema, 'tokens')

module.exports = {
    persons,
    courses,
    teachers,
    classifications,
    courseTalks,
    tokens
}
