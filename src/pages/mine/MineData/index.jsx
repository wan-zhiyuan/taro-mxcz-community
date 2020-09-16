import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

export default function Index(props) {

    function naviToPointDetail() {
        Taro.navigateTo({
            url: '/subPages1/pages/pointDetail/pointDetail'
        })
    }

    function naviToMyCollection() {
        Taro.navigateTo({
            url: '/subPages1/pages/myCollection/myCollection'
        })
    }

    return (
        <View className='mine_data'>
            <View className='data_item'>
                <Text className='item_value'>0</Text>
                <Text className='item_key'>钱包</Text>
            </View>
            <View className='data_item' onClick={naviToPointDetail}>
                <Text className='item_value'>100</Text>
                <Text className='item_key'>积分</Text>
            </View>
            <View className='data_item' onClick={naviToMyCollection}>
                <Text className='item_value'>7</Text>
                <Text className='item_key'>收藏</Text>
            </View>
        </View>
    )
}