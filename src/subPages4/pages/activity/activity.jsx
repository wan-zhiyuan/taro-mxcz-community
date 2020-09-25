import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import ActivityCateList from './ActivityCateList'
import ActivityList from './ActivityList'
import { getCommunityActivity, getActivityCate } from '../../../actions/activity'

import './activity.scss'

/* 社区活动 针对社区发布的活动 */
export default function Activity() {

    const [activityCate, setActivityCate] = useState([])
    const [activityList, setActivityList] = useState([])

    useEffect(()=>{
        async function getData() {
            const res = await getCommunityActivity(0,1,100)
            console.log(res)
            if (res.code === 200) {
                setActivityList(res.data.list)
            }

            const r = await getActivityCate()
            if (r.code === 200) {
                setActivityCate(r.data)
            }
        }
        getData()
    },[])

    return (
        <View className='activity_index'>
            {/* 活动分类 */}
            <ActivityCateList activityCate={activityCate}/>
            {/* 活动列表 */}
            <ActivityList activityList={activityList}/>
        </View>
    )
}

Activity.config = {
    navigationBarTitleText: '社区活动',
}