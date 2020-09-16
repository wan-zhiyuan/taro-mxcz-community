import Taro, { useState } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { getWindowHeight } from '../../../utils/style'

import './myCollection.scss'

export default function MyCollection() {

    return (
        <View className='my_collection_index'>
            <ScrollView
                className='my_collection_scroll'
                scrollY
                scrollWithAnimation
                style={{ height: getWindowHeight() }}
            >
                

            </ScrollView>
        </View>
    )

}
MyCollection.config = {
    navigationBarTitleText: '我的收藏',
}