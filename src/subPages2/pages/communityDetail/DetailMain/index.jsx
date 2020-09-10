import Taro, { useState, useEffect, } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { useDispatch } from '@tarojs/redux'
import CommunityComment from '../CommunityComment'
import MyRichText from '../../../../components/MyRichText'

import './index.scss'

export default function Index(props) {

    const { community } = props

    const [currentTab, setCurrentTab] = useState(0)

    function changeCurrentTab(value) {
        setCurrentTab(value)
    }

    return (
        <View className='detail_main'>
            <View className='detail_main_box'>
                <View className='detail_tab'>
                    <Text
                        className={currentTab === 0 ? 'detail_tab_title activate' : 'detail_tab_title'}
                        onClick={() => { changeCurrentTab(0) }}
                    >社区详情</Text>
                    <Text
                        className={currentTab === 1 ? 'detail_tab_title activate' : 'detail_tab_title'}
                        onClick={() => { changeCurrentTab(1) }}
                    >用户评论</Text>
                </View>
                {
                    currentTab === 0 &&
                    <MyRichText richText={community.detail} />
                }
                {
                    currentTab === 1 &&
                    <CommunityComment />
                }

            </View>
        </View>
    )
}

Index.defaultProps = {
    community: {},
}