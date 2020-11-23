import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

export default function Index(props) {

    const { orderItem } = props

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

    return (
        <View className='order_list_item'>
            <View className='header'>
                <View className='header_left'>
                    <AtIcon prefixClass='icon' value='dingdan' size='15' color='#FEBB40'></AtIcon>
                    <Text className='title'>订单详情</Text>
                </View>
                <Text className='order_id'>{orderItem.id}</Text>
            </View>
            <View className='content'>
                <Text className='goods_title'>商品：测试商品三</Text>
                <Text className='goods_price'>{calGoodsPrice()}</Text>
            </View>
            <View className='footer'>
                <Text>{judgeOrderStatus()}</Text>
            </View>
        </View>
    )
}
Index.defaultProps = {

}