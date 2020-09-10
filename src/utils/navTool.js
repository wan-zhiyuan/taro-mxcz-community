import Taro from '@tarojs/taro'

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
            case 'communityDetail':
                Taro.navigateTo({
                    url: `/subPages2/pages/communityDetail/communityDetail?cid=${params.cid}`
                  })
                break;
            default:
                break;
        }
    }
}