import Taro, { useState, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import ActivityPicBig from '../../../assets/images/activity_pic_big.png'

import './index.scss'
import { isEmpty } from '../../../utils/is'

export default function Index(props) {

    const { activity } = props

    return (
        <View className='activity_item'>
            {
                !isEmpty(activity.pic)
                    ? <Image className='activity_pic' src={activity.pic} mode='scaleToFill'></Image>
                    : <Image className='activity_pic_default' src={ActivityPicBig} mode='scaleToFill'></Image>
            }
            <View className='activity_title'>{activity.title || ''}</View>
            <View className='activity_bottom'>
                <View className='bottom_left'>
                    <Text className='activity_community'>{activity.community || ''}</Text>
                    <Text className='activity_tag'>{activity.tag || ''}</Text>
                    {
                        activity.state && Number(activity.state) === 1
                            ? <Text className='activity_state_1'>进行中</Text>
                            : <Text className='activity_state_0'>已结束</Text>
                    }
                </View>
                <View className='bottom_right'>
                    <Text style={{ fontSize: '10px', lineHeight: '10px', color: '#ff0044', marginRight: '4px' }}>{activity.num || 0}</Text>
                    <Text style={{ fontSize: '10px', lineHeight: '10px', color: '#333' }}>已报名</Text>
                </View>

            </View>
        </View>
    )
}

Index.defaultProps = {
    activity: {}
}