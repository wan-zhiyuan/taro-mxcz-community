import Taro, { useState } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { getWindowHeight } from '../../../utils/style'
import { activityVerify } from '../../../actions/activity'

import './verification.scss'

export default function Verification() {

    const[result, setResult] = useState(0)

    function handleScan() {
        Taro.scanCode({
            onlyFromCamera: true,
            success: (res) => {
              console.log(res)

            }
          })
    }

    return (
        <View className='verification_index'>
            <Text className='ver_txt1'>您是核销员身份</Text>
            <View className='ver_btn' onClick={handleScan}>扫码核销</View>
            <Text className='ver_txt2'>您是核销员身份</Text>
            
        </View>
    )

}
Verification.config = {
    navigationBarTitleText: '核销功能',
}