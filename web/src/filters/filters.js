export function phoneFiter(phone) {
    // var reg = new RegExp()
    if (!phone) return '无';
    return phone.replace(/^(\d{3})(\d*)(\d{4})$/, function (a, b, c, d) {
        return b + c.replace(/\d/g, '*') + d;
    });
}

export function parseTime(time) {
    let parse_time = new Date(new Date(time).getTime());
    return `${time.split('T')[0]} `;
}

/**
 * 
 * @param status 
 * 判断当前订单是什么状态
 */
export function parseStatus(status) {
    switch (String(status)) {
        case '1':
            return '未支付';
        case '2':
            return '已支付';
        default:
            return '错误';
    }
}

/**
 * 
 * @param status 
 * 判断丹铅订单物流方式
 */
export function parseSettlementStatus(status) {
    switch (String(status)) {
        case '1':
            return '在线支付';
        case '2':
            return '货到支付';
        default:
            return '错误';
    }
}

/**
 * 
 * @param dept 
 * 判断订单的促销团队
 */
export function parseDeptname(dept) {
    if (!dept) return '无';
    return dept.name;
}