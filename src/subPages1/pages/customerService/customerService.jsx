import Taro, { useState } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import IconFont from '../../../components/iconfont'

import './customerService.scss'

export default function CustomerService() {

    function hanldeKefu() {
        console.log('在线客服')
    }

    function hanldeDianhua() {
        console.log('联系电话')
    }

    return (
        <View className='customer_service_index'>
            <View className='item' onClick={hanldeKefu}>
                <IconFont name='zaixiankefu' size={200} />
                <Text className='label'>在线客服</Text>
            </View>
            <View className='item' onClick={hanldeDianhua}>
                <IconFont name='lianxidianhua' size={200} />
                <Text className='label'>联系电话</Text>
            </View>
        </View>
    )

}
CustomerService.config = {
    navigationBarTitleText: '联系客服',
}