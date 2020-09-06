import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

export default function Index(props) {

    return (
        <View className='mine_data'>
            <View className='data_item'>
                <Text className='item_value'>0</Text>
                <Text className='item_key'>钱包</Text>
            </View>
            <View className='data_item'>
                <Text className='item_value'>100</Text>
                <Text className='item_key'>积分</Text>
            </View>
            <View className='data_item'>
                <Text className='item_value'>7</Text>
                <Text className='item_key'>收藏</Text>
            </View>
        </View>
    )
}