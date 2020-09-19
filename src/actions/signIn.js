import { API_USER } from '../constants/api'
import { createAction, createHttp } from '../service/servers'

/**
 * 签到接口 && 签到页面数据
 * @param {*} postData 
 */
export const sign = () => createHttp({
    url: API_USER,
    method: 'POST',
    postData: { op: 'signed' }
})

/**
 * 签到排名手速榜
 * @param {*} page 
 * @param {*} pagesize 
 */
export const signRankingTime = (page, pagesize) => createHttp({
    url: API_USER + `?op=sign_ranking_time&page=${page}&pagesize=${pagesize}`,
    method: 'GET',
})

/**
 * 签到排名总榜
 * @param {*} page 
 * @param {*} pagesize 
 */
export const signRankingTotal = (page, pagesize) => createHttp({
    url: API_USER + `?op=sign_ranking_total&page=${page}&pagesize=${pagesize}`,
    method: 'GET',
})