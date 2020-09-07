import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import ActivityList from './../activity/ActivityList'

import './activitySub.scss'

export default function ActivitySub() {

    const router = useRouter()
    const { cid=0, name='' } = router.params

    useEffect(()=>{
        console.log('name=' + name)
        Taro.setNavigationBarTitle({
            title:name
        })
    },[])

    return (
        <View className='activity_sub_index'>
            <ActivityList />
        </View>
    )
}

ActivitySub.config = {
    navigationBarTitleText: '',
}