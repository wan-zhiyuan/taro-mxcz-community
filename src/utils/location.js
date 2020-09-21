/* 定位信息工具类 */

/**
 * 异步 获取定位字符串（纬度+，+经度）
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
 * 异步 获取定位字符串（存在弹窗）
 */
export async function getLocationStringPopup() {

}