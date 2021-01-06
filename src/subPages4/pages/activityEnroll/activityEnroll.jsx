import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { ClCard, ClInput } from "mp-colorui"
import { activityEnroll } from '../../../actions/activity'
import { Toast, ToastSuccess } from '../../../utils/toast'
import { ClUtils } from "mp-colorui/dist/weapp/lib"

import './activityEnroll.scss'

export default function ActivityEnroll() {

    const router = useRouter()
    const { target_id, price } = router.params

    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')

    /* 报名 */
    async function handleEnroll() {
        console.log('报名:name=' + name + ',mobile=' + mobile)
        if (!ClUtils.rule.required(name)) {
            Toast('请输入姓名')
            return
        }
        if (!ClUtils.rule.phone(mobile)) {
            Toast('手机号不正确')
            return
        }
        // 判断price的值 执行不同报名流程


        let postData = {
            op: 'activity_enroll',
            activity_id: target_id,
            contact_name: name,
            contact_mobile: mobile,
        }
        const res = await activityEnroll(postData)
        if (res.code === 200) {
            ToastSuccess('报名成功')
            setTimeout(()=>{
                Taro.navigateBack()
            },1500)
        } else {
            Toast(res.msg || '报名失败')
        }
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
