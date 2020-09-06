/* eslint-disable import/prefer-default-export */
import HTTP from "./http"
import { get as getGlobalData } from '../global_data'
import fetch from './request'

// 封装网络请求 + redux数据操作(注意最终返回的数据为res.data)
export function createAction(options) {
    const { url, postData, method, fetchOptions, cb, type, } = options
    return (dispatch) => {
        return fetch({ url, postData, method, ...fetchOptions }).then((res) => {
            if (res.code !== 200) {
                return res
            }
            dispatch({ type, payload: cb ? cb(res.data) : res.data }) // 直接将res.data.data传入reducer中处理
            return res // 返回的数据为 res.data 需求返回数据 res.data
        })
    }
}

// 仅网络请求(注意最终返回的数据为res.data)
export function createHttp(options) {
    const { url, postData, method, fetchOptions, } = options
    return fetch({ url, postData, method, ...fetchOptions }).then((res) => {
        return res // 返回的数据为 res.data
    })
}


// 判断用户是否登录(包含授权and获取手机号)
export function judgeLogin() {
    return HTTP.post('login/wxalogin', { option: 'islogin' })
}

// 用户登陆 （初始化）
export function loginInit(postData) {
    return HTTP.post('login/wxalogin', postData) // js_code: jsCode, encryptedData, iv
}

// 用户重新登陆
export function loginRelogin(postData) {
    return HTTP.post('login/wxalogin', postData) // option: 'relogin', js_code: jsCode
}

// 用户注册
export function loginRegister(postData) {
    return HTTP.post('login/wxalogin', postData) // option: 'register', iv, encryptedData, js_code: jsCode, merchant_id: mid,
    // 区别在于postData中的option: register
}
