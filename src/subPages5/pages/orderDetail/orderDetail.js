import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { getOrderDetail } from '../../../actions/mall'

import './orderDetail.scss'

export default function OrderDetail() {

    useEffect(()=>{

    },[])

    return (
        <View className='order_detail_index'>
            
        </View>
    )

}
OrderDetail.config = {
    navigationBarTitleText: '订单详情',
}