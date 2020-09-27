import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { getMyEnroll } from '../../../actions/activity'
import ActivityList from '../../../components/ActivityList'

import './myEnroll.scss'

export default function MyEnroll() {

    const [enrollList, setEnrollList] = useState([])

    useEffect(() => {
        async function getData() {
            const res = await getMyEnroll()
            if (res.code === 200) {
                setEnrollList(res.data.list)
            } else {
                console.log(res.msg)
            }
        }
        getData()
    }, [])

    return (
        <View className='my_enroll_index'>
            <ActivityList list={enrollList} from='myEnroll'/>
        </View>
    )

}
MyEnroll.config = {
    navigationBarTitleText: '我的报名',
}