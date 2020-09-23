import Taro, { useState, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'
import { getShowPriceFixed } from '../../../../utils/price'

import './index.scss'

export default function Index(props) {

    const { } = props

    const activityDetail = useSelector(state => state.activity.communityActivityDetail.basic)

    return (
        <View className='activity_detail_header'>
            <Text className='title'>{activityDetail.title || ''}</Text>
            <View className='header_box_1'>
                <Text className='enroll_number'>
                    {'进度：' + (activityDetail.enroll_number || 0) + '/' + (activityDetail.limit_number || 0)}</Text>
                <Text className='price'>{'¥' + getShowPriceFixed(activityDetail.price || 0)}</Text>
            </View>
        </View>
    )
}

Index.defaultProps = {
    
}