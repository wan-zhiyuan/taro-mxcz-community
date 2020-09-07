import Taro, { useState, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import CommunityList from './CommunityList'
import ActivityList from './ActivityList'

import './activity.scss'

export default function Activity() {

    return (
        <View className='activity_index'>
            <CommunityList />
            <ActivityList />
        </View>
    )
}

Activity.config = {
    navigationBarTitleText: '社区活动',
}