import Taro from '@tarojs/taro'
// import getBaseUrl from './baseUrl'
import interceptors from './interceptors'
import { logError } from '../utils/error'
import { isEmpty } from '../utils/is'

const token = ''
interceptors.forEach(i => Taro.addInterceptor(i))

class httpRequest {
    baseOptions(params, method = 'GET') {
        let { url, postData, showToast = true, autoLogin = true } = params
        let contentType = 'application/x-www-form-urlencoded'
        let orzAuth5 = Taro.getStorageSync('jwt') || ''    // 后台用于校验登录状态
        contentType = params.contentType || contentType
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
        return Taro.request(option)
            .then(res => {
                // 若api返回的data.command为login,则从data.token更新jwt值
                if (res.data.data.command === 'login') {    // 所有login api都从data.token获取jwt
                    console.log('api：login请求，jwt从token获取')
                    Taro.setStorageSync('jwt', res.data.data.token)
                    return res
                }
                // 更新jwt值，只要api返回header中存在orz-auth5 即更新
                if (!isEmpty(res.header['orz-auth5'])) {
                    console.log('res.header.orz-auth5不为空')
                    // IOS手机使用 res.header.orz-auth5会报错
                    Taro.setStorageSync('jwt', res.header['orz-auth5'])
                }
                return res
            })
    }

    get(url, data = '') {
        let option = { url, data }
        return this.baseOptions(option)
    }

    post(url, postData, contentType) {
        let params = { url, postData, contentType }
        return this.baseOptions(params, 'POST')
    }

    // 只有login接口的jwt从返回的data中token获取
    put(url, data = '') {
        let option = { url, data }
        return this.baseOptions(option, 'PUT')
    }

    delete(url, data = '') {
        let option = { url, data }
        return this.baseOptions(option, 'DELETE')
    }

    // 简易封装网络请求
    fetch(options) {
        const { method = 'GET' } = options
        return this.baseOptions(options, method)
    }

}

export default new httpRequest()


export async function fetch(options) {
    const { method = 'GET' } = options
    return baseOptions(options, method)
}
