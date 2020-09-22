import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import CommunityList from './CommunityList'
import ActivityList from './ActivityList'
import { getCommunityActivity } from '../../../actions/activity'

import './activity.scss'

/* 社区活动 针对社区发布的活动 */
export default function Activity() {

    useEffect(()=>{
        async function getActivity() {
            const res = await getCommunityActivity(0,1,100)
            console.log(res)
        }
        getActivity()
    },[])

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