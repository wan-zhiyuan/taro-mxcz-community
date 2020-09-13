import Taro, { useState, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'

import './index.scss'

export default function Index(props) {

    const { activityDetail } = props

    return (
        <View className='activity_detail_header'>
            <Text className='title'>{activityDetail.title || ''}</Text>
            <View className='header_box_1'>
                <Text className='enroll_number'>
                    {'进度：' + activityDetail.enroll_number + '/' + activityDetail.limit_number}</Text>
                <Text className='price'>{'¥' + (activityDetail.price || 0)}</Text>
            </View>
        </View>
    )
}

Index.defaultProps = {
    activityDetail: {}
}