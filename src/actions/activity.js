import { API_COMMUNITY } from '../constants/api'
import { createAction, createHttp } from '../service/servers'

/**
 * 获取社区活动列表
 * @param {*} cate_id 传0获取所有社区活动
 * @param {*} page 
 * @param {*} pagesize 
 */
export const getCommunityActivity = (cate_id, page, pagesize) => createHttp({
    url: API_COMMUNITY + `?op=activity&cate_id=${cate_id}&page=${page}&pagesize=${pagesize}`,
    method: 'GET',
})

/**
 * 获取社区活动详情
 * @param {*} target_id 
 */
export const getActivityDetail = (target_id) => createHttp({
    url: API_COMMUNITY + `/${target_id}?op=activity`,
    method: 'GET',
})