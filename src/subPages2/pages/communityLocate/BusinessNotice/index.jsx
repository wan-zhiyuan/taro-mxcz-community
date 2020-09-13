import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

export default function Index() {

    const [allowNotice, setAllowNotice] = useState(true)

    // 切换选中须知状态
    function handleAllowNotice() {
        setAllowNotice(!allowNotice)
    }

    function goToNotice(e) {
        console.log('跳转入驻须知页面')
        e.stopPropagation() // 阻止点击事件继续冒泡
    }

    return (
        <View className='business_notice' onClick={handleAllowNotice}>
            {
                allowNotice
                    ? <AtIcon prefixClass='icon' value='xuanze' size='20' color='#00D8A0'></AtIcon>
                    : <AtIcon prefixClass='icon' value='xuanze_disable' size='20' color='#333'></AtIcon>
            }
            <Text style={{ marginLeft: Taro.pxTransform(8) }}>我已阅读并同意</Text>
            <Text style={{ marginLeft: Taro.pxTransform(8),color:'#00D8A0' }} onClick={goToNotice}>《商家入驻须知》</Text>
        </View>
    )
}