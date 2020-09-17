import { USER_INFO } from '../constants/user'
import { API_USER } from '../constants/api'
import { createAction, createHttp } from '../service/servers'

/**
 * 获取用户信息
 * @param {*} postData 
 */
export const dispatchUser = postData => createAction({
    url: API_USER,
    type: USER_INFO,
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
 * 获取签到主页数据
 */
export const signMain = () => createHttp({
    url: API_USER + '?op=sign_main',
    method: 'GET',
})

/**
 * 签到排名手速榜
 * @param {*} page 
 * @param {*} pagesize 
 */
export const signRankingTime = (page, pagesize) => createHttp({
    url: API_USER + `?op=sign_ranking_time?page=${page}pagesize=${pagesize}`,
    method: 'GET',
})

/**
 * 签到排名总榜
 * @param {*} page 
 * @param {*} pagesize 
 */
export const signRankingTotal = (page, pagesize) => createHttp({
    url: API_USER + `?op=sign_ranking_total?page=${page}pagesize=${pagesize}`,
    method: 'GET',
})

/**
 * 积分列表
 */
export const pointList = () => createHttp({
    url: API_USER + `?op=point`,
    method: 'GET',
})

/**
 * 收藏列表
 */
export const collectList = () => createHttp({
    url: API_USER + `?op=collect`,
    method: 'GET',
})
