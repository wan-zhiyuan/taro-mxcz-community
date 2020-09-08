import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'

import './activityDetail.scss'

export default function ActivityDetail() {

    const router = useRouter()
    const { aid=0 } = router.params

    useEffect(() => {
        // 获取活动详情信息



    },[])

    return (
        <View className='community_detail_index'>

        </View>
    )
}

ActivityDetail.config = {
    navigationBarTitleText: '活动详情',
}