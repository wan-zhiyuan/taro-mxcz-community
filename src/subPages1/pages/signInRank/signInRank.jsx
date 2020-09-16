import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import TabGeneral from './TabGeneral'
import TabSpeed from './TabSpeed'
import { getWindowHeightNoPX } from '../../../utils/style'

import './signInRank.scss'

export default function SignInRank() {

    const [currentTab, setCurrentTab] = useState(0)

    function changeCurrentTab(value) {
        setCurrentTab(value)
    }

    return (
        <View className='rank_index'>
            <View className='rank_tab'>
                <Text
                    className={currentTab === 0 ? 'rank_tab_title activate' : 'rank_tab_title'}
                    onClick={() => { changeCurrentTab(0) }}
                >手速榜</Text>
                <Text
                    className={currentTab === 1 ? 'rank_tab_title activate' : 'rank_tab_title'}
                    onClick={() => { changeCurrentTab(1) }}
                >总榜</Text>
            </View>
            {
                currentTab === 0 &&
                <TabSpeed height={`${getWindowHeightNoPX() - 40}px`} />
            }
            {
                currentTab === 1 &&
                <TabGeneral height={`${getWindowHeightNoPX() - 40}px`} />
            }
        </View>
    )
}
SignInRank.config = {
    navigationBarTitleText: '签到排行榜',
}