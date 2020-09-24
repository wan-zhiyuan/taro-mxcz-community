import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { getWindowHeight } from '../../../utils/style'
import dayjs from 'dayjs'
import { ClButton, ClCard, ClInput } from "mp-colorui"


import './activityEnroll.scss'

export default function ActivityEnroll() {

    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')

    useEffect(() => {

    }, [])

    /* 报名 */
    function handleEnroll() {
        console.log('报名:name=' + name + ',mobile=' + mobile)

    }

    function handleChangeName(v) {
        setName(v)
    }
    function handleChangeMobile(v) {
        setMobile(v)
    }


    return (
        <View className='activity_enroll_index'>
            <ClCard>
                <ClInput title='姓名' placeholder="请输入姓名" type='text' value={name} onChange={handleChangeName} />
                <ClInput title='电话' placeholder="请输入您的电话" type="number" value={mobile} onChange={handleChangeMobile} />
            </ClCard>
            <View className='enroll' onClick={handleEnroll}>报名</View>
        </View>
    )

}
ActivityEnroll.config = {
    navigationBarTitleText: '报名',
}
