import { API_LOGIN } from '../constants/api'
import { createAction, createHttp } from '../service/servers'

/**
 * 用户登录授权 或者获取手机号
 * @param {*} postData 
 */
export const getLogin = postData => createHttp({
    url: API_LOGIN,
    method: 'POST',
    postData
})

