import { GOODS_LIST, GOODS_DETAIL } from '../constants/mall'
import { API_GOODS, API_ORDER, API_PAY } from '../constants/api'
import { createAction, createHttp } from '../service/servers'

/**
 * 获取商品列表
 */
export const getGoodsList = () => createHttp({
    url: API_GOODS + `?page=1&pagesize=8`,
    method: 'GET',
})
export const dispatchGoodsList = () => createAction({
    url: API_GOODS + `?page=1&pagesize=8`,
    type: GOODS_LIST,
    method: 'GET',
    cb: res=>{
        return res.list
    }
})

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
export const getOrderList = () => createHttp({
    url: API_ORDER + `?page=1&pagesize=8`,
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