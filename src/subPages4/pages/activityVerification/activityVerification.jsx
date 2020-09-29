import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { getWindowHeight } from '../../../utils/style'
import { ClCard, ClInput, ClText, ClMenuList } from "mp-colorui"
import { getCommunityActivityDetail } from '../../../actions/activity'
import { getDateTypeSeconds } from '../../../utils/timer'
import { useSelector } from '@tarojs/redux'
import { Barcode, QRCode } from 'taro-code'

import './activityVerification.scss'

export default function ActivityVerification() {

    const router = useRouter()
    const { target_id } = router.params

    const userInfo = useSelector(state => state.user.userInfo)

    const [activityDetail, setActivityDetail] = useState({})
    const [code, setCode] = useState('') // 核销码
    const [enrollTime, setEnrollTime] = useState(0) // 报名时间

    useEffect(() => {
        async function getData() {
            const res = await getCommunityActivityDetail(target_id)
            console.log(res)
            setActivityDetail(res.data.basic)
            setEnrollTime(res.data.enroll_time)
        }
        getData()
    }, [])

    const typeMenu = [
        {
            title: "报名时间：",
        },
        {
            title: getDateTypeSeconds(enrollTime),
        },
        {
            title: "活动时间：",
        },
        {
            title: `${activityDetail.start_time || 'NaN'}至${activityDetail.end_time}`,
        },
        {
            title: "联系电话：",
            value: activityDetail.mobile || 'NaN',
        },
        {
            title: "活动地点：",
        },
        {
            title: activityDetail.address || 'NaN',
        },
    ];

    return (
        <View className='activity_verification_index'>
            <View className='verification_box1'>
                <Text className='title'>{activityDetail.title || '活动标题'}</Text>
                {/* <Image className='code' src={code} mode='scaleToFill'></Image> */}
                <View className='code'>
                    <QRCode
                        text={`activity_id=${activityDetail.id || 0}&enroll_user_id=${userInfo.id || 0}`}
                        size={150}
                        scale={4}
                        errorCorrectLevel='M'
                        typeNumber={2}
                    />
                </View>
                <Text className='tips'>请向工作人员出示核销码</Text>
            </View>
            <View className='verification_box2'>
                <ClMenuList
                    // card
                    list={typeMenu} />
            </View>
        </View>
    )

}
ActivityVerification.config = {
    navigationBarTitleText: '活动核销',
}