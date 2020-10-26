import Taro, { useState } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import DetailHeader from './DetailHeader'
import DetailFooter from './DetailFooter'

import './goodsDetail.scss'

export default function GoodsDetail() {

    return (
        <View className='goods_detail_index'>
            <DetailHeader />
            <DetailFooter />
        </View>
    )

}
GoodsDetail.config = {
    navigationBarTitleText: '商品详情',
}