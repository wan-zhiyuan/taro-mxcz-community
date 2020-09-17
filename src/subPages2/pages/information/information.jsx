import Taro, { useState } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtFab } from 'taro-ui'
import { getWindowHeight } from '../../../utils/style'
import InfoList from './InfoList'

import './Information.scss'

/* 资讯列表页面 */
export default function Information() {

    const [current, setCurrent] = useState(0)
    const [infoList, setInfoList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 8, 8, 8, 88,])

    function handleClick(v) {
        setCurrent(v)
        // 请求数据 更新

    }

    function handlePublish() {
        console.log('跳转资讯发布页面')
        Taro.navigateTo({
            url: '/subPages2/pages/infoPublish/infoPublish'
        })
    }

    return (
        <View className='information_index'>
            {/* <ScrollView
                className='information_scroll'
                scrollY
                scrollWithAnimation
                style={{ height: getWindowHeight() }}
            > */}
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
                <AtTabsPane current={current} index={0}>
                    <InfoList infoList={infoList} />
                </AtTabsPane>
                <AtTabsPane current={current} index={1}>
                    <InfoList infoList={infoList} />
                </AtTabsPane>
                <AtTabsPane current={current} index={2}>
                    <InfoList infoList={infoList} />
                </AtTabsPane>
                <AtTabsPane current={current} index={3}>
                    <InfoList infoList={infoList} />
                </AtTabsPane>
                <AtTabsPane current={current} index={4}>
                    <InfoList infoList={infoList} />
                </AtTabsPane>
                <AtTabsPane current={current} index={5}>
                    <InfoList infoList={infoList} />
                </AtTabsPane>
            </AtTabs>

            {/* </ScrollView> */}
            <View className='publish_button'>
                <AtFab size='small' onClick={handlePublish}>
                    <Text className='at-fab__icon at-icon at-icon-add'></Text>
                </AtFab>
            </View>
        </View>
    )

}
Information.config = {
    navigationBarTitleText: '资讯列表',
}