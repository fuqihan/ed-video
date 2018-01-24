// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef(v) {
    return v === undefined || v === null || v === ''
}

function isDef(v) {
    return v !== undefined && v !== null
}

function isTrue(v) {
    return v === true
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}

function isFalse(v) {
    return v === false
}

const hasOwnProperty = Object.prototype.hasOwnProperty

/* 判断这个数据里的数据是否有空值 */
let isObjUndef = (obj) => {
    try {
        if (isObject(obj)) {
            for (key in obj) {
                if (hasOwnProperty.call(obj, key)) {
                    if (isObject(obj[key])) {
                        return isObjUndef(obj[key])
                    } else {

                        if (isUndef(obj[key])) {
                            return false
                        }
                    }
                }
            }
        }
    } catch (err) {
        console.log(err)
    }

    return true
}
module.exports = {
    isObjUndef,
}