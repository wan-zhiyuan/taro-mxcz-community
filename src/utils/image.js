export function getImagePath(path) {
    if (/^https?:\/\/.*?/.test(path)) {
        return path;
    }
    if (process.env.NODE_ENV === 'development') {
        return `http://static.ibarrel.top/${path}`;
    } else {
        return `http://static.ibarrel.com.cn/${path}`;
    }

    // 已下判断只适用于微信小程序
    // if (wx.getAccountInfoSync().miniProgram.appId === 'wxf0fe4cdc2abcc90a') {   // 爱杯mini吧
    //     return `http://static.ibarrel.com.cn/${path}`;
    // } else if (wx.getAccountInfoSync().miniProgram.appId === 'wx3ef57a29db6c4831') { // 斌谷
    //     return `http://static.ibarrel.top/${path}`;
    // } else {
    //     return `http://static.ibarrel.top/${path}`;
    // }
}