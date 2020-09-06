
// 原单位：分 转换后 元
export function getShowPriceFixed(price) {
    if (price) {
        const num = Number(price) / 100;
        // const money = num.toFixed(1);
        return Number(num);
    }
    else {
        return 0
    }

}

// 以下函数未修改
// 四舍五入 保留一位小数 ，貌似并没有实现前面的描述
export function getShowPriceFixed_1(price) {
    if (price) {
        const num = Number(price) / 100;
        // const money = num.toFixed(1);
        return Number(num);
    }
    else {
        return 0
    }

}


// 目前仅返利优惠显示使用
// 四舍五入 保留两位小数  price单位是分，已经乘100，所以不需要乘100。小于1分的单位不计算
export function getShowPriceFixed_2(price) {
    if (price) {
        // Math.round(number * 100) / 100
        const num = Math.round(price) / 100;
        return Number(num);
    } else {
        return 0
    }

}

// 目前主要是用于分期金额的计算
// 保留两位 不四舍五入
export function getShowPriceFixed_fenqi(price) {
    if (price) {
        // Math.round(number * 100) / 100
        const num = price / 100;
        return Number(parseFloat(num).toFixed(3).slice(0, -1))
    } else {
        return 0
    }

}