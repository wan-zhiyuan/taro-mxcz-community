import Taro from '@tarojs/taro'

// 地址解析组件

// 腾讯位置服务密匙
const key = 'OPXBZ-F3OK6-U7DSX-E2NW3-ZAUF3-I6FK2'

/**
 * 地址解析
 * @param {*} address 
 * ex: https://apis.map.qq.com/ws/geocoder/v1/?address=%E4%B8%8A%E6%B5%B7%E5%B8%82%E6%B5%A6%E4%B8%9C%E6%96%B0%E5%8C%BA%E6%B5%A6%E4%B8%89%E8%B7%AF3058%E5%8F%B7&key=OPXBZ-F3OK6-U7DSX-E2NW3-ZAUF3-I6FK2
 */
export async function geocoder(address) {
    const option = {
        url: `https://apis.map.qq.com/ws/geocoder/v1/`,
        data: {
            key: key,
            address: address,
        },
        method: 'GET',
    }
    return Taro.request(option
    ).then((res) => {
        return res
    })
}

/**
 * 逆地址解析
 * @param {*} lat 经度
 * @param {*} lng 纬度
 * ex:http://apis.map.qq.com/ws/geocoder/v1/?location=31.15274,121.53721&key=OPXBZ-F3OK6-U7DSX-E2NW3-ZAUF3-I6FK2
 */
export async function reverseGeocoder(lat, lng) {
    let locationString = lat + ',' + lng
    const option = {
        url: `https://apis.map.qq.com/ws/geocoder/v1/`,
        data: {
            key: key,
            location: locationString,
        },
        method: 'GET',
    }
    return Taro.request(option)
        .then((res) => {
            return res
        })
}