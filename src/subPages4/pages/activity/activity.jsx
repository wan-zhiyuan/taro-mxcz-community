import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import ActivityCateList from './ActivityCateList'
import ActivityList from './ActivityList'
import { getCommunityActivity } from '../../../actions/activity'

import './activity.scss'

/* 社区活动 针对社区发布的活动 */
export default function Activity() {

    const [activityList, setActivityList] = useState([])

    useEffect(()=>{
        async function getActivity() {
            const res = await getCommunityActivity(0,1,100)
            console.log(res)
            if (res.code === 200) {
                setActivityList(res.data.list)
            }
        }
        getActivity()
    },[])

    return (
        <View className='activity_index'>
            {/* 活动分类 */}
            <ActivityCateList />
            {/* 活动列表 */}
            <ActivityList activityList={activityList}/>
        </View>
    )
}

Activity.config = {
    navigationBarTitleText: '社区活动',
}