import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { useSelector } from '@tarojs/redux'
import { geocoder } from '../../../../utils/geocoder'

import './index.scss'
import { Toast } from '../../../../utils/toast'

export default function Index(props) {

    const { } = props
    const activityDetail = useSelector(state => state.activity.communityActivityDetail.basic)

    /* 电话 */
    function handleMobile() {
        Taro.makePhoneCall({
            phoneNumber: String(activityDetail.mobile)
        })
    }

    /* 地址定位（导航） */
    async function handleAddress() {
        // 如果没有经纬度，可以使用地址逆解析后打开openLocation
        if (activityDetail.coordinate === '') {
            const res = await geocoder(activityDetail.address)
            if (res.statusCode === 200) {
                if (res.data.status === 0) {
                    let location = res.data.result.location
                    Taro.openLocation({
                        latitude: location.lat,
                        longitude: location.lng,
                        scale: 8, // 缩放比例
                        name: "地址",
                        address: activityDetail.address,
                        success: function (r) {
                            console.log(r)
                        },
                        fail: res => {
                            Toast('定位失败1')
                        }
                    })
                } else {
                    Toast('定位失败2')
                }
            } else {
                Toast('定位失败3')
            }
        } else {
            let latitude = Number(activityDetail.coordinate.split(',')[0])
            let longitude = Number(activityDetail.coordinate.split(',')[1])
            Taro.openLocation({
                latitude: latitude, // 纬度，范围为-90~90，负数表示南纬
                longitude: longitude, // 经度，范围为-180~180，负数表示西经
                scale: 8, // 缩放比例
                name: "地址",
                address: activityDetail.address,
                success: function (r) {
                    console.log(r)
                },
                fail: res => {
                    Toast('定位失败3')
                }
            })
        }

    }

    return (
        <View className='activity_detail_middle'>
            <View className='middle_item'>
                <View className='item_left'>
                    <AtIcon prefixClass='icon' value='lishi' size='16' color='#e16531'></AtIcon>
                    <Text className='item_label'>活动时间：</Text>
                    <Text className='item_value' style={{ width: '260px' }}>
                        {activityDetail.start_time + ' - ' + activityDetail.end_time}</Text>
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

}