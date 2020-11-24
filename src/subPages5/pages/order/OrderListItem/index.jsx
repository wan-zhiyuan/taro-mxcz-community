import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { postPay } from '../../../../actions/mall'

import './index.scss'
import { Toast } from '../../../../utils/toast'

export default function Index(props) {

    const { orderItem } = props

    function handleOrderItem() {
        Taro.navigateTo({
            url: `/subPages5/pages/orderDetail/orderDetail?oid=${orderItem.id}`
        })
    }

    function calGoodsPrice() {
        switch (Number(orderItem.pay_type)) {
            case 1:
                return `${orderItem.point_price || 0}积分`
            case 2:
                return `¥ ${orderItem.pay_price || 0}`
            case 4:
                return `¥ ${orderItem.pay_price || 0} + ${orderItem.point_price || 0}积分`
            default:
                return '未知购买类型'
        }
    }

    function judgeOrderStatus() {
        switch (Number(orderItem.status || 0)) {
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

    async function handlePay(e) {
        
        let oid = orderItem.id
        let postDataPay = { oid }
        const resPay = await postPay(postDataPay)
        if (resPay.code !== 200) {
            return
        }
        const dPay = resPay.data.data
        console.log('#############')
        console.log(dPay)
        console.log('pay_type:' + orderItem.pay_type)
        if (orderItem.pay_type === 1) {
            Toast('购买成功')
        } else {
            Taro.requestPayment({
                timeStamp: dPay.timeStamp,
                nonceStr: dPay.nonceStr,
                package: dPay.package,
                signType: dPay.signType,
                paySign: dPay.paySign,
                success: function (res) {
                    console.log('########################支付成功')
                    console.log(res)
                    Taro.navigateTo({
                        url: `/subPages5/pages/orderDetail/orderDetail?oid=${oid}`
                    })
                },
                fail: function (res) {
                    console.log('########################支付失败')
                    console.log(res)
                    Toast('支付失败')
                }
            })
        }
        e.stopPropagation()
    }



    return (
        <View className='order_list_item' onClick={handleOrderItem}>
            <View className='header'>
                <View className='header_left'>
                    <AtIcon prefixClass='icon' value='dingdan' size='15' color='#FEBB40'></AtIcon>
                    <Text className='title'>订单详情</Text>
                </View>
                <Text className='order_id'>{orderItem.id}</Text>
            </View>
            <View className='content'>
                <Text className='goods_title'>商品：{orderItem.name || ''}</Text>
                <Text className='goods_price'>{calGoodsPrice()}</Text>
            </View>
            <View className='footer'>
                <View
                    className='btn_pay'
                    style={Number(orderItem.status) === 1 ? {} : { display: 'none' }}
                    onClick={handlePay}
                >付款</View>
                <View className='btn_status'>{judgeOrderStatus()}</View>
            </View>
        </View>
    )
}
Index.defaultProps = {
    orderItem: {}
}