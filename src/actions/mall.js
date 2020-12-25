import { GOODS_LIST, GOODS_DETAIL } from '../constants/mall'
import { API_GOODS, API_ORDER, API_PAY, API_GOODS_CATE, API_GOODS_SERVICE_STATION } from '../constants/api'
import { createAction, createHttp } from '../service/servers'

/**
 * 获取商品列表
 */
export const getGoodsList = (page = 1, pagesize = 10, cate_id = 0, ssid = 0) => createHttp({
    url: API_GOODS + `?page=${page}&pagesize=${pagesize}&cate_id=${cate_id}&ssid=${ssid}`,
    method: 'GET',
    fetchOptions: {
        isShowLoading: true,
    },
})
export const dispatchGoodsList = (page = 1, pagesize = 10, cate_id = 0, ssid = 0) => createAction({
    url: API_GOODS + `?page=${page}&pagesize=${pagesize}&cate_id=${cate_id}&ssid=${ssid}`,
    type: GOODS_LIST,
    method: 'GET',
    fetchOptions: {
        isShowLoading: true,
    },
})

// 清空goodsList数据
export const emptyGoodsList = () => {
    return {
        type: GOODS_LIST,
        payload: {
            list:[],
            banner:[],
        }
    }
}

/**
 * 获取商品详情
 * @param {*} id 商品id
 */
export const getGoodsDetail = (id) => createHttp({
    url: API_GOODS + `/${id}`,
    method: 'GET',
})
export const dispatchGoodsDetail = (id) => createAction({
    url: API_GOODS + `/${id}`,
    type: GOODS_DETAIL,
    method: 'GET',
})

/**
 * 获取订单列表
 */
export const getOrderList = (page = 1, pagesize = 10) => createHttp({
    url: API_ORDER + `?page=${page}&pagesize=${pagesize}`,
    method: 'GET'
})

/**
 * 获取订单详情
 * @param {*} oid 订单id
 */
export const getOrderDetail = (oid) => createHttp({
    url: API_ORDER + `/${oid}`,
    method: 'GET',
})

/**
 * 生成订单
 * @param {*} postData 
 */
export const postOrder = postData => createHttp({
    url: API_ORDER,
    method: 'POST',
    postData
})

/**
 * 订单支付
 * @param {*} postData 
 */
export const postPay = postData => createHttp({
    url: API_PAY,
    method: 'POST',
    postData
})

/**
 * 获取分类列表
 */
export const getGoodsCate = () => createHttp({
    url: API_GOODS_CATE,
    method: 'GET',
})

/**
 * 获取商品社区服务站列表
 */
export const getGoodsServiceStation = () => createHttp({
    url: API_GOODS_SERVICE_STATION,
    method: 'GET',
})