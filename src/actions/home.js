import { HOME_INDEX } from '../constants/home'
import { API_HOME } from '../constants/api'
import { createAction, createHttp } from '../service/servers'

/**
 * 首页数据
 * @param {*} postData 
 */
export const dispatchHomeIndex = (page, pagesize) => createAction({
    url: API_HOME + '?page='+ page + '&pagesize=' + pagesize,
    type: HOME_INDEX,
    method: 'GET',
})