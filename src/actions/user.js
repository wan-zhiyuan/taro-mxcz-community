import { USER_INFO, CITY_INFO } from '../constants/user'
import { API_USER } from '../constants/api'
import { createAction, createHttp } from '../service/servers'

/**
 * 获取用户基本信息
 * @param {*} postData 
 */
export const dispatchUser = postData => createAction({
    url: API_USER + '?op=basic',
    type: USER_INFO,
    method: 'GET',
    postData
})

/**
 * 获取用户手机号
 * @param {*} postData 
 */
export const getUserPhone = postData => createHttp({
    url: API_USER + '/0',
    method: 'PUT',
    postData
})

/**
 * 积分列表
 */
export const getPointList = (page, pagesize) => createHttp({
    url: API_USER + `?op=point&page=${page}&pagesize=${pagesize}`,
    method: 'GET',
})

/**
 * 收藏列表
 */
export const getCollectList = () => createHttp({
    url: API_USER + `?op=collect`,
    method: 'GET',
})

/**
 * 更新城市
 * @param {*} city 
 */
export const updateCity = (city) => {
    return {
        type: CITY_INFO,
        payload: city,
    }
}
