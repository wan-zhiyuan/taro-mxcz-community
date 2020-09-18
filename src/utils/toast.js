import Taro from '@tarojs/taro'

/* toast封装 */
export function Toast(text) {
    Taro.showToast({
        title: text,
        icon: 'none',
        duration: 2000
    }).then(res => console.log(res))
}

export function ToastSuccess(text) {
    Taro.showToast({
        title: text,
        icon: 'success',
        duration: 2000
    }).then(res => console.log(res))
}

export function ToastLoading(text) {
    Taro.showToast({
        title: text,
        icon: 'loading',
        duration: 2000
    }).then(res => console.log(res))
}