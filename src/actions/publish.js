import {  } from '../constants/publish'
import { API_USER } from '../constants/api'
import { createAction, createHttp } from '../service/servers'

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
 * 资讯信息阅读、点赞、评论
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
 * 获取资讯信息详情
 * @param {*} target_id 发布信息列表中的target_id
 */
export const getInformationDetail = (target_id) => createHttp({
    url: API_USER + '/' + target_id + '?op=information'
})
