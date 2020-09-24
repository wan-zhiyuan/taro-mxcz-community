import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { getWindowHeight } from '../../../utils/style'
import { ClCard, ClInput, ClText, ClMenuList } from "mp-colorui"

import './activityVerification.scss'

export default function ActivityVerification() {

    const router = useRouter()
    const { target_id } = router.params

    const [activityDetail, setActivityDetail] = useState({})

    useEffect(() => {
        // 
    }, [])

    const typeMenu = [
        {
            title: "报名时间：",
        },
        {
            title: "2020-09-19 20:46:49",
        },
        {
            title: "活动时间：",
        },
        {
            title: "2020-09-19 20:40至2020-09-20 20:46",
        },
        {
            title: "联系电话：",
            value: '15885856363',
        },
        {
            title: "活动地点：",
            value: '上海市静安区豫园区333号',
        },
    ];

    return (
        <View className='activity_verification_index'>
            <View className='verification_box1'>
                <Text className='title'>这是标题</Text>
                <Image className='code'></Image>
                <View className='button'>核校</View>
            </View>
            <View className='verification_box2'>
                <ClMenuList card list={typeMenu} />
            </View>
        </View>
    )

}
ActivityVerification.config = {
    navigationBarTitleText: '活动核销',
}