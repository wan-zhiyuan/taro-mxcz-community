import {
    COMMUNITY_IS_OPENED_QRCODE, SERVICE_SITE_APPLY_UPDATE, BUSINESS_APPLY_UPDATE,
    COMMUNITY_BUSINESS_DETAIL, SERVICE_SITE_DETAIL,
} from '../constants/community'
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
 * @param {*} industry 服务站类别，传空获取所有服务站，例：'社区助餐' '社区养老'
 * @param {*} is_near 
 */
export const getCommunityServiceSite = (location, industry = '', is_near = 0) => createHttp({
    url: API_COMMUNITY + `?op=service_site&location=${location}&industry=${industry}&is_near=${is_near}`,
    method: 'GET',
})

/**
 * 获取社区列表
 * @param {*} location 
 * @param {*} industry 
 * @param {*} is_near 
 */
export const getCommunityBusiness = (location, industry = '', is_near) => createHttp({
    url: API_COMMUNITY + `?op=business&location=${location}&industry=${industry}&is_near=${is_near}`,
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
    url: API_COMMUNITY + `/${target_id}?op=service_site`,
    method: 'GET',
})
/**
 * 获取社区服务站详情
 * @param {*} target_id 
 */
export const dispatchServiceSiteDetail = (target_id) => createAction({
    url: API_COMMUNITY + `/${target_id}?op=service_site`,
    type: SERVICE_SITE_DETAIL,
    method: 'GET',
})
/**
 * 获取社区(商家)详情
 * @param {*} target_id 
 */
export const getBusinessDetail = (target_id) => createHttp({
    url: API_COMMUNITY + `/${target_id}?op=business`,
    method: 'GET',
})
/**
 * 获取社区（商家）详情
 * @param {*} target_id 
 */
export const dispatchBusinessDetail = (target_id) => createAction({
    url: API_COMMUNITY + `/${target_id}?op=business`,
    type: COMMUNITY_BUSINESS_DETAIL,
    method: 'GET',
    cb: res => {
        let read = []
        let like = []
        let comment = []
        let share = []
        let collect = []
        for (let i = 0; i < res.extend.length; i++) {
            if (res.extend[i].type === 0) {
                read.push(res.extend[i])
            } else if (res.extend[i].type === 1) {
                like.push(res.extend[i])
            } else if (res.extend[i].type === 2) {
                comment.push(res.extend[i])
            } else if (res.extend[i].type === 3) {
                share.push(res.extend[i])
            } else if (res.extend[i].type === 4) {
                collect.push(res.extend[i])
            }
        }
        res.read = read
        res.like = like
        res.comment = comment
        res.share = share
        res.collect = collect
        return res
    }
})



/**
 * 更新社区商户申请入驻信息
 * @param {*} businessApply 
 */
export const updateBusinessApply = (businessApply = {}) => {
    return {
        type: BUSINESS_APPLY_UPDATE,
        payload: { businessApply }
    }
}
/**
 * 更新社区服务站申请入驻信息
 * @param {*} serviceSiteApply 
 */
export const updateServiceSiteApply = (serviceSiteApply={}) => {
    return {
        type: SERVICE_SITE_APPLY_UPDATE,
        payload: { serviceSiteApply }
    }
}

/**
 * 删除我的社区服务站
 * @param {*} target_id 
 */
export const deleteMyServiceSite = (target_id) => createHttp({
    url: API_COMMUNITY + '/' + target_id + '?op=service_site',
    method: 'DELETE',
})

/**
 * 取消社区商家收藏
 * @param {*} postData 
 */
export const delBusinessExtend = postData => createHttp({
    url: API_COMMUNITY,
    method: 'POST',
    postData,
})
