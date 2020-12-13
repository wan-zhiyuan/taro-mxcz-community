import Taro, { useState, useEffect, useDidShow } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { dispatchMyEnroll } from '../../../actions/activity'
import ActivityList from '../../../components/ActivityList'
import { useDispatch, useSelector } from '@tarojs/redux'

import './myEnroll.scss'

export default function MyEnroll() {

    const myEnrollList = useSelector(state => state.activity.myEnrollList)
    const dispatch = useDispatch()

    useEffect(() => {

    }, [])
    useDidShow(()=>{
        async function getData() {
            await dispatch(dispatchMyEnroll())
        }
        getData()
    })

    return (
        <View className='my_enroll_index'>
            <ActivityList list={myEnrollList} from='myEnroll'/>
        </View>
    )

}
MyEnroll.config = {
    navigationBarTitleText: '我的报名',
}