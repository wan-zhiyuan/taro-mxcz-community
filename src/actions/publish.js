import { PUBLISH_DETAIL, INFORMATION_DETAIL, PUBLISH_APPLY_UPDATE, INFORMATION_APPLY_UPDATE, } from '../constants/publish'
import { API_USER } from '../constants/api'
import { createAction, createHttp } from '../service/servers'
import { SERVICE_SITE_APPLU_UPDATE } from '../constants/community'

// 发布信息 && 咨询信息 相关接口

/**
 * 新增发布信息
 * @param {*} postData 
 */
export const increasePublish = postData => createHttp({
    url: API_USER,
    method: 'POST',
    postData
})

/**
 * 新增咨询信息
 * @param {*} postData 
 */
export const increaseInfo = postData => createHttp({
    url: API_USER,
    method: 'POST',
    postData
})

/**
 * 发布信息阅读、点赞、评论
 * @param {*} postData 
 */
export const publishExtend = postData => createHttp({
    url: API_USER,
    method: 'POST',
    postData
})
/**
 * 资讯信息阅读、点赞、评论 0-阅读
 * @param {*} postData 
 */
export const informationExtend = postData => createHttp({
    url: API_USER,
    method: 'POST',
    postData
})

/**
 * 获取发布信息列表
 * @param {*} cate_id 
 * @param {*} location 
 */
export const getPublish = (cate_id, location, is_near=0) => createHttp({
    url: API_USER + '?op=publish&cate_id=' + cate_id + '&location=' + location + '&is_near=' + is_near,
    method: 'GET',
})
/**
 * 获取资讯信息列表
 * @param {*} cate_id 
 */
export const getInformation = (cate_id, page=1, pagesize=10) => createHttp({
    url: API_USER + '?op=information&cate_id=' + cate_id + '&page=' + page + '&pagesize=' + pagesize,
    method: 'GET',
})

/**
 * 获取发布信息详情
 * @param {*} target_id 发布信息列表中的target_id
 */
export const getPublishDetail = (target_id) => createHttp({
    url: API_USER + '/' + target_id + '?op=publish'
})
/**
 * 获取发布信息详情
 * @param {*} target_id 发布信息列表中的target_id
 */
export const dispatchPublishDetail = (target_id) => createAction({
    url: API_USER + '/' + target_id + '?op=publish',
    type: PUBLISH_DETAIL,
    cb: res => {
        let read = []
        let like = []
        let share = []
        let comment = []
        for (let i = 0; i < res.extend.length; i++) {
            if (res.extend[i].type === 0) {
                read.push(res.extend[i])
            } else if (res.extend[i].type === 1) {
                like.push(res.extend[i])
            } else if (res.extend[i].type === 2) {
                comment.push(res.extend[i])
            } 
        }
        res.read = read
        res.like = like
        res.comment = comment
        return res
    }
})
/**
 * 获取资讯信息详情
 * @param {*} target_id 发布信息列表中的target_id
 */
export const getInformationDetail = (target_id) => createHttp({
    url: API_USER + '/' + target_id + '?op=information'
})
/**
 * 获取资讯信息详情
 * @param {*} target_id 发布信息列表中的target_id
 */
export const dispatchInformationDetail = (target_id) => createAction({
    url: API_USER + '/' + target_id + '?op=information',
    type: INFORMATION_DETAIL,
    cb: res => {
        let read = []
        let like = []
        let share = []
        let comment = []
        for (let i = 0; i < res.extend.length; i++) {
            if (res.extend[i].type === 0) {
                read.push(res.extend[i])
            } else if (res.extend[i].type === 1) {
                like.push(res.extend[i])
            } else if (res.extend[i].type === 2) {
                comment.push(res.extend[i])
            }
        }
        res.read = read
        res.like = like
        res.comment = comment
        return res
    }
})

/**
 * 更新发布信息申请
 * @param {*} publishApply 
 */
export const updatePublishApply = (publishApply) => {
    return {
        type: PUBLISH_APPLY_UPDATE,
        payload: publishApply,
    }
}
/**
 * 更新资讯信息申请
 * @param {*} serviceSiteApply 
 */
export const updateInformationApply = (informationApply) => {
    return {
        type: SERVICE_SITE_APPLU_UPDATE,
        payload: informationApply,
    }
}
