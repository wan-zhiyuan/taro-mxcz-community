import Taro, { useState, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import ActivityPicBig from '../../../images/activity_pic_big.png'

import './index.scss'
import { isEmpty } from '../../../../utils/is'

export default function Index(props) {

    const { activity } = props

    function handleActivity() {
        Taro.navigateTo({
            url: `/subPages4/pages/activityDetail/activityDetail?id=${activity.id}`
        })
    }

    return (
        <View className='activity_item' onClick={handleActivity}>
            {
                !isEmpty(activity.pic)
                    ? <Image className='activity_pic' src={activity.pic} mode='scaleToFill'></Image>
                    : <Image className='activity_pic_default' src={ActivityPicBig} mode='scaleToFill'></Image>
            }
            <View className='activity_title'>{activity.title || ''}</View>
            <View className='activity_bottom'>
                <View className='bottom_left'>
                    <Text className='activity_community'>{activity.cate_name || ''}</Text>
                    {/* 价格为0时，显示免费图标 */}
                    {
                        Number(activity.price) === 0 &&
                        <Text className='activity_free'>免费</Text>
                    }
                    {
                        // 同时判断 status 和 isenroll 后续实际数据添加判断
                        activity.status && Number(activity.status) === 1
                            ? <Text className='activity_state_1'>进行中</Text>
                            : <Text className='activity_state_0'>已关闭</Text>
                    }
                </View>
                <View className='bottom_right'>
                    <Text style={{ fontSize: '10px', lineHeight: '10px', color: '#ff0044', marginRight: '4px' }}>{activity.enroll_number || 0}</Text>
                    <Text style={{ fontSize: '10px', lineHeight: '10px', color: '#333' }}>已报名</Text>
                </View>
            </View>
        </View>
    )
}

Index.defaultProps = {
    activity: {}
}