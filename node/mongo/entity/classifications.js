/*
   分类
*/
let a = new Date(new Date().getTime() + 28800000)
module.exports = {
    name: {type: String, unique: true},//名字
    heat: Number,//热度,
    active: {type: Boolean, default: false},   // 激活状态，用于前端显示选中
    createDate: {type: Date, default: a},
}
