import Taro, { useState } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { getWindowHeight } from '../../../utils/style'
import { activityVerify } from '../../../actions/activity'
import { useSelector } from '@tarojs/redux'

import './verification.scss'

export default function Verification() {

    const userInfo = useSelector(state => state.user.userInfo)

    const [result, setResult] = useState(0)
    const [isShow, setIsShow] = useState(false)

    function handleScan() {
        setIsShow(false)
        Taro.scanCode({
            onlyFromCamera: true,
            success: (res) => {
                console.log(res)
                // setIsShow(true)
                let result =res.result
                let json = {}
                let strs = result.split('&')
                console.log('#########')
                console.log(strs)
                for (let i = 0; i < strs.length; i++) {
                    json[strs[i].split("=")[0]]=strs[i].split("=")[1];
                }
                console.log(json)
                let postData = {
                    op: 'activity_verify',
                    activity_id: json.activity_id,
                    enroll_user_id: json.enroll_user_id,
                    verify_user_id: userInfo.id,
                }
                activityVerify(postData).then(r => {
                    console.log(r)
                    if (r.code === 200) {
                        setResult(1)
                    } else {
                        console.log(r.msg)
                        setResult(0)
                    }
                    setIsShow(true)
                })
            }
        })
    }

    return (
        <View className='verification_index'>
            <Text className='ver_txt1'>您是核销员身份</Text>
            <View className='ver_btn' onClick={handleScan}>扫码核销</View>
            {
                isShow &&
                <Text className='ver_txt2'>{result ? '核销成功' : '核销失败'}</Text>
            }
        </View>
    )

}
Verification.config = {
    navigationBarTitleText: '核销功能',
}