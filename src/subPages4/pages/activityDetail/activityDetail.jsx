import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView, Swiper, SwiperItem, } from '@tarojs/components'
import { getWindowHeightNoPX } from '../../../utils/style'
import { AtIcon } from 'taro-ui'
import ActivityDetailBanner from './ActivityDetailBanner'
import ActivityDetailHeader from './ActivityDetailHeader'
import ActivityDetailMiddle from './ActivityDetailMiddle'
import ActivityDetailMain from './ActivityDetailMain'
import { useDispatch, useSelector } from '@tarojs/redux'
import { getCommunityActivityDetail, dispatchCommunityActivityDetail } from '../../../actions/activity'

import './activityDetail.scss'

export default function ActivityDetail() {

    const router = useRouter()
    const { target_id = 0 } = router.params
    const activity = useSelector(state => state.activity.communityActivityDetail)
    const dispatch = useDispatch()

    useEffect(() => {
        // 获取活动详情信息
        dispatch(dispatchCommunityActivityDetail(target_id))
    }, [])

    /* 首页 */
    function goToHome() {
        Taro.switchTab({
            url: `/pages/home/home`
        })
    }

    /* 报名 */
    function handleEnroll() {
        if (Number(activity.is_enroll) !== 0) {
            return
        }
        console.log('社区活动报名')
        // 方案1:详情接口告知是否已报名
        // 方案2:报名接口返回告知结果给用户展示
        Taro.navigateTo({
            url: `/subPages4/pages/activityEnroll/activityEnroll?target_id=${target_id}`
        })
    }

    return (
        <View className='activity_detail_index'>
            <ScrollView
                className='activity_detail_scroll'
                scrollY
                scrollWithAnimation
                // enableFlex={true}
                style={{ height: `${getWindowHeightNoPX() - 50}px` }}
            >
                <ActivityDetailBanner />
                <ActivityDetailHeader />
                <ActivityDetailMiddle />
                <ActivityDetailMain />

            </ScrollView>
            <View className='activity_detail_footer'>
                <View className='footer_left' onClick={goToHome}>
                    <AtIcon prefixClass='icon' value='home' size='16' color='#1CCEAB'></AtIcon>
                    <Text style={{ marginLeft: Taro.pxTransform(10) }}>首页</Text>
                </View>
                {/* status: 0-活动未开始； 1-活动正常； 2-活动已结束； */}
                {/* 先判断status，当为1的时候再判断is_enroll */}
                {
                    Number(activity.basic.status) === 1
                    ? <View className='footer_right_able' onClick={handleEnroll}>
                        {
                            Number(activity.is_enroll) !== 0
                            ? '已报名'
                            : '活动报名'
                        }
                    </View>
                    : <View className='footer_right_disable'>
                        {
                            Number(activity.basic.status) === 2
                            ? '活动已结束'
                            : '活动未开始'
                        }
                    </View>
                }
                {/* {
                    Number(activity.is_enroll) !== 0
                        ? <View className='footer_right'>已报名</View>
                        : <View className='footer_right'>
                            {
                                Number(activity.basic.status) === 1
                                    ? 
                                    // 活动进行中
                                    <View className='able' onClick={handleEnroll}>活动报名</View>
                                    : 
                                    <View>
                                        {
                                            Number(activity.basic.status) === 2
                                            ? <View className='disable'>活动已结束</View>
                                            : <View className='disable'>活动未开始</View>
                                        }
                                    </View>
                                    
                                    
                            }
                        </View>
                } */}
            </View>
        </View>
    )
}

ActivityDetail.config = {
    navigationBarTitleText: '活动详情',
}