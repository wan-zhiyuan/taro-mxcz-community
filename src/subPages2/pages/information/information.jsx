import Taro, { useState } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { getWindowHeight } from '../../../utils/style'
import InfoList from './InfoList'

import './Information.scss'

export default function Information() {

    const [current, setCurrent] = useState(0)
    const [infoList, setInfoList] = useState([])

    function handleClick(v) {
        setCurrent(v)
        // 请求数据 更新

    }

    return (
        <View className='information_index'>
            <ScrollView
                className='information_scroll'
                scrollY
                scrollWithAnimation
                style={{ height: getWindowHeight() }}
            >
                <AtTabs
                    current={current}
                    scroll
                    tabList={[
                        { title: '标签页1' },
                        { title: '标签页2' },
                        { title: '标签页3' },
                        { title: '标签页4' },
                        { title: '标签页5' },
                        { title: '标签页6' }
                    ]}
                    onClick={handleClick}>
                    {/* <AtTabsPane current={current} index={0}>
                        <View style='font-size:18px;text-align:center;height:100px;'>标签页一的内容</View>
                    </AtTabsPane>
                    <AtTabsPane current={current} index={1}>
                        <View style='font-size:18px;text-align:center;height:100px;'>标签页二的内容</View>
                    </AtTabsPane>
                    <AtTabsPane current={current} index={2}>
                        <View style='font-size:18px;text-align:center;height:100px;'>标签页三的内容</View>
                    </AtTabsPane>
                    <AtTabsPane current={current} index={3}>
                        <View style='font-size:18px;text-align:center;height:100px;'>标签页四的内容</View>
                    </AtTabsPane>
                    <AtTabsPane current={current} index={4}>
                        <View style='font-size:18px;text-align:center;height:100px;'>标签页五的内容</View>
                    </AtTabsPane>
                    <AtTabsPane current={current} index={5}>
                        <View style='font-size:18px;text-align:center;height:100px;'>标签页六的内容</View>
                    </AtTabsPane> */}
                    <InfoList infoList={infoList}/>
                </AtTabs>

            </ScrollView>
        </View>
    )

}
Information.config = {
    navigationBarTitleText: '资讯列表',
}