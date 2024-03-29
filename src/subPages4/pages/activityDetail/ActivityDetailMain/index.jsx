import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import MyRichText from '../../../../components/MyRichText'
import { useSelector } from '@tarojs/redux'

import './index.scss'

export default function Index(props) {

    const { } = props

    const activityDetail = useSelector(state => state.activity.communityActivityDetail.basic)

    return (
        <View className='activity_detail_main'>
            <View className='title'>
                <AtIcon prefixClass='icon' value='linggan' size='16' color='#db639b'></AtIcon>
                <Text className='title_txt'>详情内容</Text>
            </View>
            <View className='detail'>
                <MyRichText richText={activityDetail.details} />
            </View>
        </View>
    )
}

Index.defaultProps = {
    
}