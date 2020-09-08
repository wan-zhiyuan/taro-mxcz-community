import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'

import './communityDetail.scss'

export default function CommunityDetail() {

    const router = useRouter()
    const { cid=0 } = router.params

    useEffect(() => {
        // 获取社区详情信息



    },[])

    return (
        <View className='community_detail_index'>

        </View>
    )
}

CommunityDetail.config = {
    navigationBarTitleText: '社区',
}