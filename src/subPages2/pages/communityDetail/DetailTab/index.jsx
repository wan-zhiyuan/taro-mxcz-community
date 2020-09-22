import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import TabMain from '../TabMain'
import TabComment from '../TabComment'

import './index.scss'

export default function Index(props) {

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
                    <TabMain />
                }
                {
                    currentTab === 1 &&
                    <TabComment />
                }
            </View>
        </View>
    )
}

Index.defaultProps = {
    
}