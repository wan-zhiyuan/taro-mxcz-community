import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { getOrderDetail } from '../../../actions/mall'

import './orderDetail.scss'
import { getDateTypeMinutes } from '../../../utils/timer'

export default function OrderDetail() {

    const router = useRouter()
    const { oid = 0 } = router.params

    const [market, setMarket] = useState([])
    const [order, setOrder] = useState({})

    useEffect(() => {
        async function getData() {
            const res = await getOrderDetail(oid)
            setMarket(res.data.order_market)
            setOrder(res.data.order)
        }
        getData()
    }, [])

    function calGoodsPrice(item) {
        switch (Number(item.pay_type)) {
            case 1:
                return `${item.point_price || 0}积分`
            case 2:
                return `¥ ${item.pay_price || 0}`
            case 4:
                return `¥ ${item.pay_price || 0} + ${item.point_price || 0}积分`
            default:
                return '未知购买类型'
        }
    }

    function judgeOrderStatus(status) {
        switch (status) {
            case 1:
                return '待支付'
            case 2:
                return '待提货'
            case 4:
                return '已完成'
            default:
                return '未定义'
        }
    }

    return (
        <View className='order_detail_index'>
            <View className='detail_main'>
                <View className='detail_item'>
                    <View className='label_title'>订单号</View>
                    <View className='value'>{oid || null}</View>
                </View>
                <View className='detail_item'>
                    <View className='label_title'>下单时间</View>
                    <View className='value'>{getDateTypeMinutes(order.create_time)}</View>
                </View>
                <View style={{ width: '100%', height: '30px', borderBottom: '1px solid #f2f2f2' }}></View>
                <View className='detail_item'>
                    <View className='label_title'>商品明细</View>
                </View>
                {
                    market.map((item, idx) => {
                        return (
                            <View className='detail_item' key={'index_' + idx}>
                                <View className='label'>商品名：{item.name || null}</View>
                                <View className='value'>{calGoodsPrice(item)}</View>
                            </View>
                        )
                    })
                }
                <View style={{ width: '100%', height: '30px', borderBottom: '1px solid #f2f2f2' }}></View>
                <View className='detail_item'>
                    <View className='label_title'>收货信息</View>
                </View>
                <View className='detail_item'>
                    <View className='label'>卖家：{ order.sale_name }</View>
                </View>
                <View className='detail_item'>
                    <View className='label'>联系电话：{ order.sale_mobile }</View>
                </View>
                <View className='detail_item'>
                    <View className='label'>提货地址：{ order.take_address }</View>
                </View>
                <View style={{ width: '100%', height: '30px', borderBottom: '1px solid #f2f2f2' }}></View>
                <View className='detail_item'>
                    <View className='label_title'>订单状态</View>
                    <View className='value'>{judgeOrderStatus(order.status)}</View>
                </View>
                <View style={{ width: '100%', height: '30px'}}></View>
            </View>
        </View>
    )

}
OrderDetail.config = {
    navigationBarTitleText: '订单详情',
}