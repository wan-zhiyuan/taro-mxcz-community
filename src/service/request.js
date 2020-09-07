import Taro from '@tarojs/taro'
import interceptors from './interceptors'
import { isEmpty } from '../utils/is'
import { Toast } from '../utils/toast'

const token = ''
interceptors.forEach(i => Taro.addInterceptor(i))

export default async function fetch(options) {
    const { url, postData, method = 'GET', showToast = true, autoLogin = true, isShowLoading = false } = options
    let contentType = 'application/x-www-form-urlencoded'
    let orzAuth5 = Taro.getStorageSync('jwt') || ''    // 后台用于校验登录状态
    contentType = options.contentType || contentType
    const option = {
        isShowLoading: false,
        loadingText: '正在加载',
        url: BASE_URL + url,
        data: postData,
        method: method,
        header: {
            'content-type': contentType,
            'token': token,
            'Orz-Auth-Xcx': 'true',
            'Orz-Auth5': orzAuth5,
        },
    }
    if (isShowLoading) {
        Taro.showLoading({
            title: '加载中',
        })
    }
    return Taro.request(option)
        .then(res => {
            const { code, data, status } = res.data
            
            if (isShowLoading) {
                Taro.hideLoading()
            }
            // 若api返回的data.command为login,则从data.token更新jwt值
            if (res.data.data.command === 'login') {    // 所有login api都从data.token获取jwt
                console.log('api：login请求，jwt从token获取')
                Taro.setStorageSync('jwt', res.data.data.token)
                return res
            }
            // 更新jwt值，只要api返回header中存在orz-auth5 即更新
            if (!isEmpty(res.header['Orz-Auth5'])) {
                // console.log('res.header.Orz-Auth5不为空')
                Taro.setStorageSync('jwt', res.header['Orz-Auth5'])
            }
            if (!isEmpty(res.header['orz-auth5'])) {
                // console.log('res.header.orz-auth5不为空')
                // IOS手机使用 res.header.orz-auth5会报错
                Taro.setStorageSync('jwt', res.header['orz-auth5'])
            }
            if (code !== 200) {
                if (showToast) {
                    Toast(status)
                }
            }
            return res.data // 数据格式： code,data,status
        }).catch((err) => {
            console.log('Taro.request err:' + JSON.stringify(err))
        })
}