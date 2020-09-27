import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { getMyEnroll } from '../../../actions/activity'

import './myEnroll.scss'

export default function MyEnroll() {

    const[ enrollList, setEnrollList] = useState([])

    useEffect(()=>{
        async function getData() {
            const res = await getMyEnroll()
            if (res.code === 200) {
                
            } else {
                console.log(res.msg)
            }
        }
        getData()
    },[])

    return (
        <View className='my_enroll_index'>
            
        </View>
    )

}
MyEnroll.config = {
    navigationBarTitleText: '我的报名',
}