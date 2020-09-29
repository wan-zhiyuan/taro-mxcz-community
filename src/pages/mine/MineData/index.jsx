import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { useSelector } from '@tarojs/redux'
import { Toast } from '../../../utils/toast'

import './index.scss'

export default function Index(props) {

    const userInfo = useSelector(state => state.user.userInfo)

    function naviToWallet() {
        Toast('功能未开放')
    }

    function naviToPointDetail() {
        if (!userInfo.nickname) {
            Taro.navigateTo({
                url: '/subPages1/pages/login/login'
            })
            return
        }
        Taro.navigateTo({
            url: '/subPages1/pages/pointDetail/pointDetail'
        })
    }

    function naviToMyCollection() {
        // if (!userInfo.nickname) {
        //     Taro.navigateTo({
        //         url: '/subPages1/pages/login/login'
        //     })
        //     return
        // }
        Taro.navigateTo({
            url: '/subPages1/pages/myCollection/myCollection'
        })
    }

    return (
        <View className='mine_data'>
            <View className='data_item' onClick={naviToWallet}>
                <Text className='item_value'>0</Text>
                <Text className='item_key'>钱包</Text>
            </View>
            <View className='data_item' onClick={naviToPointDetail}>
                <Text className='item_value'>{userInfo.point || 0}</Text>
                <Text className='item_key'>积分</Text>
            </View>
            <View className='data_item' onClick={naviToMyCollection}>
                <Text className='item_value'>{userInfo.collect || 0}</Text>
                <Text className='item_key'>收藏</Text>
            </View>
        </View>
    )
}