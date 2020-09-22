import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

export default function Index(props) {

    const { activityDetail } = props

    function handleMobile() {
        Taro.makePhoneCall({
            phoneNumber: String(activityDetail.mobile)
        })
    }
    function handleAddress() {
        // 如果没有经纬度，可以使用地址逆解析后打开openLocation
        let latitude = Number(activityDetail.coordinate.split(',')[0])
        let longitude = Number(activityDetail.coordinate.split(',')[1])
        Taro.openLocation({
            latitude: latitude, // 纬度，范围为-90~90，负数表示南纬
            longitude: longitude, // 经度，范围为-180~180，负数表示西经
            scale: 8, // 缩放比例
            name: "定位",
            address: activityDetail.address,
            success: function (r) {
                console.log(r)
            }
        })
    }

    return (
        <View className='activity_detail_middle'>
            <View className='middle_item'>
                <View className='item_left'>
                    <AtIcon prefixClass='icon' value='lishi' size='16' color='#e16531'></AtIcon>
                    <Text className='item_label'>活动时间：</Text>
                    <Text className='item_value' style={{ width: '260px' }}>{activityDetail.start_time + '-' + activityDetail.end_time}</Text>
                </View>
            </View>
            <View className='middle_item' onClick={handleMobile}>
                <View className='item_left'>
                    <AtIcon prefixClass='icon' value='dianhua' size='16' color='#1CCEAB'></AtIcon>
                    <Text className='item_label'>联系电话：</Text>
                    <Text className='item_value'>{activityDetail.mobile || ''}</Text>
                </View>
                <View className='item_right'>
                    <AtIcon value='chevron-right' size='17' color='#d4d4d4'></AtIcon>
                </View>
            </View>
            <View className='middle_item' onClick={handleAddress}>
                <View className='item_left'>
                    <AtIcon prefixClass='icon' value='dingwei' size='16' color='#17abe3'></AtIcon>
                    <Text className='item_label'>地址：</Text>
                    <Text className='item_value'>{activityDetail.address || ''}</Text>
                </View>
                <View className='item_right'>
                    <AtIcon value='chevron-right' size='17' color='#d4d4d4'></AtIcon>
                </View>
            </View>
        </View>
    )
}

Index.defaultProps = {
    activityDetail: {}
}