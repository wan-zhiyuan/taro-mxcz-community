import Taro, { useState } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtTextarea, AtImagePicker } from 'taro-ui'
import { getWindowHeight } from '../../../utils/style'
import InfoPublishHeader from './InfoPublishHeader'
import InfoPublishMain from './InfoPublishMain'

import './infoPublish.scss'

export default function InfoPublish() {

    function handlePublish() {
        console.log('发布')
        
    }

    return (
        <View className='info_publish_index'>
            <InfoPublishHeader />

            {/* 发布信息主要内容：标题、内容、图片、视频链接 */}
            <InfoPublishMain />

            <View className='publish_button' onClick={handlePublish}>发  布</View>
        </View>
    )

}
InfoPublish.config = {
    navigationBarTitleText: '资讯发布',
}