'use strict'
var tokens = require('../mongo/mongo.js').tokens;
module.exports = {
    //添加users
    addToken: (id, iat, exp) => {

        const msg = [
            {
                userId: id,
                iat: iat,   //创建时间
                exp: exp,  // 过期时间
            }
        ]
        tokens.find({userId: id}).exec().then(function (data) {
            if (data.length === 0) {
                console.log('createToken')
                tokens.create(msg)

            } else {
                console.log('updateToken')
                tokens.update({userId: id}, {iat: iat, xp: exp}, {multi: true}, function () {
                })
            }
        })
    },

}
