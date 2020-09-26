import Taro from '@tarojs/taro'

/* 定位信息工具类 */

function getLocation() {
    return new Promise((resolve, reject) => {
        Taro.getLocation({
            type: 'gcj02',
            success: res => {
                resolve(res)
            },
            fail: err => {
                resolve(err)
            }
        })
    })
}

/**
 * 异步 获取定位字符串（纬度+，+经度）
 * 注意：使用时请用async/await
 */
export async function getLocationString() {
    console.log('调用了getLocationString()')
    let location = ''
    try {
        const res = await Taro.getLocation({
            type: 'gcj02',
        })
        console.log(res)
        location = res.latitude + ',' + res.longitude
        console.log(location)
    } catch (err) {
        location = ''
    }
    return location
}

/**
 * 异步 获取定位字符串（增加提示用户的弹窗）
 * 注意：使用时请用async/await
 */
export async function getLocationStringPopup() {
    console.log('调用了getLocationStringPopup()')
    const res = await getLocation()
    // console.log('###################')
    // console.log(res)
    if (res.errMsg === 'getLocation:ok') {
        // return '定位权限开启，获取定位成功'
        return res.latitude + ',' + res.longitude

    } else if (res.errMsg === 'getLocation:fail auth deny') {
        const settingRes = await Taro.getSetting()
        let statu = settingRes.authSetting
        if (!statu['scope.userLocation']) {
            const tip = await Taro.showModal({ content: '检测到你还没打开地理位置权限，是否去开启？', })
            if (tip.confirm) {
                // 用户点击确认
                const data = await Taro.openSetting()
                // 设置界面返回
                if (data.authSetting["scope.userLocation"] === true) {
                    // 定位权限打开
                    Taro.showLoading({
                        title: '加载中',
                    })
                    const secondRes = await getLocation()
                    Taro.hideLoading()
                    if (secondRes.errMsg === 'getLocation:ok') {
                        console.log(secondRes)
                        const latitude = secondRes.latitude
                        const longitude = secondRes.longitude
                        const speed = secondRes.speed
                        const accuracy = secondRes.accuracy
                        // return '用户打开定位设置，获取定位成功'
                        return secondRes.latitude + ',' + secondRes.longitude
                    } else {
                        // return '用户打开定位设置，还是获取定位失败'
                        return ''
                    }
                } else {
                    // 定位权限未打开
                    // return '用户进入设置界面，但是未打开地理位置权限'
                    return ''
                }
            } else {
                // 用户点击取消
                // return '用户拒绝打开地理位置权限'
                return ''
            }
        }
    }
}


/**
 * 选择地址（如果未开启定位，会弹窗提示开启）如何能返回选中的地址数据，等待解决？？？？可以尝试模仿上面的async/await写法
 */
export function chooseAddress() {
    Taro.getLocation({
        type: 'gcj02',
        success: function (res) {
            console.log(res)
            const latitude = res.latitude
            const longitude = res.longitude
            Taro.chooseLocation({
                latitude: latitude,
                longitude: longitude,
                success: function (res) {
                    console.log(res)
                    Taro.showToast({
                        title: res.address
                    })
                }
            })
        },
        fail: function (err) {
            Taro.getSetting({
                success: function (res) {
                    let statu = res.authSetting
                    if (!statu['scope.userLocation']) {
                        Taro.showModal({
                            content: '检测到你还没打开地理位置权限，是否去开启？',
                            success: function (tip) {
                                if (tip.confirm) {
                                    Taro.openSetting({
                                        success: function (data) {
                                            // 设置界面返回
                                            if (data.authSetting["scope.userLocation"] === true) {
                                                // 定位权限打开了
                                                // 重新执行获取定位打开地址选择的功能
                                                Taro.showLoading({
                                                    title: '加载中',
                                                })
                                                Taro.getLocation({
                                                    type: 'gcj02',
                                                    success: function (res) {
                                                        console.log(res)
                                                        const latitude = res.latitude
                                                        const longitude = res.longitude
                                                        Taro.chooseLocation({
                                                            latitude: latitude,
                                                            longitude: longitude,
                                                            success: function (res) {
                                                                console.log(res)
                                                                Taro.showToast({
                                                                    title: res.address
                                                                })
                                                            }
                                                        })
                                                    },
                                                    complete: function (res) {
                                                        Taro.hideLoading()
                                                    }
                                                })
                                            } else {
                                                // 定位权限未打开
                                                console.log('########5')
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            })
        }
    })
}