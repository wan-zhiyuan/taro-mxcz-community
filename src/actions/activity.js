import { COMMUNITY_ACTIVITY_DETAIL } from '../constants/activity'
import { API_COMMUNITY, API_USER } from '../constants/api'
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
export const getCommunityActivityDetail = (target_id) => createHttp({
    url: API_COMMUNITY + `/${target_id}?op=activity`,
    method: 'GET',
})
/**
 * 获取社区活动详情
 * @param {*} target_id 
 */
export const dispatchCommunityActivityDetail = (target_id) => createAction({
    url: API_COMMUNITY + `/${target_id}?op=activity`,
    type: COMMUNITY_ACTIVITY_DETAIL,
    method: 'GET',
})

/**
 * 获取社区活动分类
 */
export const getActivityCate = () => createHttp({
    url: API_USER + '?op=classify&type=2',
    method: 'GET',
})

/**
 * 志愿者申请
 * @param {*} postData 
 */
export const applyVolunteer = postData => createHttp({
    url: API_USER,
    method: 'POST',
    postData,
})

/**
 * 获取我的报名
 * 优化点：分页（未完成）
 */
export const getMyEnroll = () => createHttp({
    url: API_COMMUNITY + '?op=enroll&page=1&pagesize=200',
    method: 'GET',
})

/**
 * 活动报名接口
 * @param {*} postData 
 */
export const activityEnroll = postData => createHttp({
    url: API_COMMUNITY,
    method: 'POST',
    postData,
})

/**
 * 活动核销
 * @param {*} postData 
 */
export const activityVerify = postData => createHttp({
    url: API_COMMUNITY,
    method: 'POST',
    postData
})