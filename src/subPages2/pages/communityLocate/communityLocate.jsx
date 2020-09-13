import Taro, { useState, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtInput, AtIcon } from 'taro-ui'
import LocatePart1 from './LocatePart1'
import LocatePart2 from './LocatePart2'
import LocatePart3 from './LocatePart3'
import LocatePart4 from './LocatePart4'
import LocatePart5 from './LocatePart5'
import LocatePart6 from './LocatePart6'
import BusinessNotice from './BusinessNotice'
import { getWindowHeightNoPX } from '../../../utils/style'

import './communityLocate.scss'

export default function CommunityLocate() {

    const [allowNotice, setAllowNotice] = useState(true)

    function handleActivate() {
        console.log('申请开通')
    }

    // 切换选中须知状态
    function handleAllowNotice() {
        setAllowNotice(!allowNotice)
    }

    function goToNotice(e) {
        console.log('跳转入驻须知页面')
        e.stopPropagation() // 阻止点击事件继续冒泡
    }

    return (
        <View className='community_locate_index'>
            <ScrollView
                className='locate_scroll'
                scrollY
                scrollWithAnimation
                enableFlex={true}
                style={{ height: `${getWindowHeightNoPX() - 50}px` }}
            >
                <LocatePart1 />
                <LocatePart2 />
                <LocatePart3 />
                <LocatePart4 />
                <LocatePart5 />
                <LocatePart6 />
                <BusinessNotice />
            </ScrollView>
            <View className='footer' onClick={handleActivate}>申请开通</View>
        </View>
    )
}
CommunityLocate.config = {
    navigationBarTitleText: '商家入驻',
}