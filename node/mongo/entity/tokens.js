/*
    token  用于判断重要接口需要普安段异地登陆
*/

module.exports = {
    userId: String,
    iat: String,   //创建时间
    exp: String,  // 过期时间
}
