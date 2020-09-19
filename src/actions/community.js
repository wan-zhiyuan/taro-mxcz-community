import { COMMUNITY_IS_OPENED_QRCODE } from '../constants/community'
import { API_COMMUNITY } from '../constants/api'
import { createAction, createHttp } from '../service/servers'


export const showPopQr = () => {
    return {
        type: COMMUNITY_IS_OPENED_QRCODE,
        payload: { isOpenedPopQr: true }
    }
}
export const hidePopQr = () => {
    return {
        type: COMMUNITY_IS_OPENED_QRCODE,
        payload: { isOpenedPopQr: false }
    }
}


/**
 * 获取社区服务站列表
 * @param {*} location 
 * @param {*} industry 服务站类别，传空获取所有服务站，例：'社区助餐‘ ’社区养老‘
 * @param {*} is_near 
 */
export const getCommunityServiceSite = (location, industry='', is_near) => createHttp({
    url: API_COMMUNITY + `?op=service_site&location=${location}&industry=${industry}&is_near=${is_near}`,
    method: 'GET',
})

/**
 * 获取社区列表
 * @param {*} location 
 * @param {*} industry 
 * @param {*} is_near 
 */
export const getCommunityBusiness = (location, industry='', is_near) => createHttp({
    url: API_COMMUNITY + `?op=business&location=${location}&industry=${industry}&is_near=${is_near}`,
    method: 'GET',
})

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
 * 创建社区服务站
 * @param {*} postData 
 */
export const createCommunityServiceSite = postData => createHttp({
    url: API_COMMUNITY,
    method: 'POST',
    postData
})

/**
 * 创建社区（商家）
 * @param {*} postData 
 */
export const createCommunityBusiness = postData => createHttp({
    url: API_COMMUNITY,
    method: 'POST',
    postData
})

/**
 * 社区（商家）的点赞、评论、分享、收藏等操作
 * @param {*} postData type(类型：0-阅读（浏览）；1-点赞；2-评论；3-分享；4-收藏')
 */
export const communityBusinessExtend = postData => createHttp({
    url: API_COMMUNITY,
    method: 'POST',
    postData
})


/**
 * 获取社区服务站详情
 * @param {*} target_id 
 */
export const getServiceSiteDetail = (target_id) => createHttp({
    url: API_COMMUNITY +`/${target_id}?op=service_site`,
    method: 'GET',
})
/**
 * 获取社区(商家)详情
 * @param {*} target_id 
 */
export const getBusinessDetail = (target_id) => createHttp({
    url: API_COMMUNITY +`/${target_id}?op=business`,
    method: 'GET',
})
/**
 * 获取社区活动详情
 * @param {*} target_id 
 */
export const getActivityDetail = (target_id) => createHttp({
    url: API_COMMUNITY +`/${target_id}?op=activity`,
    method: 'GET',
})

