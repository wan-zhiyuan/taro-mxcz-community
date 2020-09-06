import Taro from '@tarojs/taro'

/* ibarrel线上商城 */
export function goToIbarrelShop() {
    let url = IBARREL_SHOP_URL
    Taro.navigateToMiniProgram({
        // appId: 'wx3ef57a29db6c4831', // 斌谷科技
        appId: 'wxf0fe4cdc2abcc90a', // 爱杯权益兑换
        path: `pages/index/index?from=ibarrelbar&pageUrl=${url}`,
        extraData: {
            foo: 'bar'
        },
        envVersion: 'trial', 
        // develop打开开发版本， release打开正式版本， trial体验版本
        // 要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。
        success(res) {
            // 打开成功
            console.log(res)
        },
        fail: function (err) {
            // 打开失败
            console.log(err);
        }
    })
}

/* 页面回退方法（栈内无页面时，回退到首页） */
export function goback() {
    let pages = Taro.getCurrentPages() // 栈中的所有页面
    if (pages.length > 1) {
        Taro.navigateBack({
            delta: 1 // 返回上一级页面。
        });
    } else {
        console.log('cannot navigate back at first page')
        Taro.switchTab({
            url: '/pages/home/home'
        })
    }
}

/**
 * 判断target 跳转对应的目标页
 * @param {*} params 
 */
export function judgeTarget(params) {
    if (params.target) {
        console.log('存在target,跳转对应目标页面：' + params.target)
        switch (params.target) {
            case 'receive':
                Taro.navigateTo({
                    url: `/subPages2/pages/receive/receive?qid=${params.qid}&qtype=${params.qtype}&sendUid=${params.sendUid}`
                  })
                break;
        
            default:
                break;
        }
    }
}