import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import ActivityList from '../../../components/ActivityList'
import { getCommunityActivity } from '../../../actions/activity'

import './activitySub.scss'

// 按照社区分类的活动页面
export default function ActivitySub() {

    const router = useRouter()
    const { cid=0, title='' } = router.params

    const [activityList, setActivityList] = useState([])

    useEffect(()=>{
        // 设置标题
        console.log('title=' + title)
        Taro.setNavigationBarTitle({
            title:title
        })
        // 获取数据
        async function getData() {
            const res = await getCommunityActivity(cid,1,100)
            console.log(res)
            if (res.code === 200) {
                setActivityList(res.data.list)
            }
        }
        getData()
    },[])

    return (
        <View className='activity_sub_index'>
            <ActivityList list={activityList}/>
        </View>
    )
}

ActivitySub.config = {
    navigationBarTitleText: '',
}