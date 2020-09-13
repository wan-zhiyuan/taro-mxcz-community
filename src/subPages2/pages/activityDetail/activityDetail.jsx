import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView, Swiper, SwiperItem, } from '@tarojs/components'
import { getWindowHeightNoPX } from '../../../utils/style'
import { AtIcon } from 'taro-ui'
import ActivityDetailHeader from './ActivityDetailHeader'
import ActivityDetailMiddle from './ActivityDetailMiddle'
import ActivityDetailMain from './ActivityDetailMain'

import './activityDetail.scss'

export default function ActivityDetail() {

    const router = useRouter()
    const { id = 0 } = router.params

    const [activityDetail, setActivityDetail] = useState({
        id: 123,  // 活动id
        cate_id: '34567', // 活动分类id
        cate_name: '浦东1站', // 活动分类名称
        title: '7月16日周四14点花艺课小桌花',
        logo: '', // 活动logo
        banner: [
            'http://www.wxjy.com.cn/UploadFiles/xx/2013/11/201311061915178609.jpg',
            'http://www.huadongyuan.com/uploads/allimg/141031/2-1410311FF2557.jpg',
        ],
        limit_number: 10, // 活动限制名额
        price: 0, // 活动价格
        read_number: 233, // 浏览量
        mobile: '13866668888', // 联系电话
        address: '上海市浦东新区可口可乐路311号',
        coordinate: '30.5275，114.3464', // 坐标经纬度
        start_time: '2020.09.09 14:00',
        end_time: '2020.09.10 16:00',
        details: '', // 活动详情
        status: 0, // 状态
        is_enroll: 1, // 报名通道 1-开启 2-关闭
        enroll_number: 8, // 报名人数 
        is_top: 0,
        is_all: 0,
        work_hour: 2.0,
        star_number: 0, // 需要达到登记的志愿者 0-不限制 1-一星 以此类推
        create_time: 1599901136, // 创建日期 单位：秒
    })

    useEffect(() => {
        // 获取活动详情信息



    }, [])

    function goToHome() {
        Taro.switchTab({
            url: `/pages/home/home`
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
                {
                    !activityDetail || activityDetail.banner.length === 0
                        ? (
                            <View className='bannerDefault'></View>
                        ) : (
                            <Swiper
                                className='banner_swiper'
                                indicatorColor='#999'
                                indicatorActiveColor='#333'
                                current={0}
                                duration={500}
                                interval={5000}
                                circular={true}  // 是否衔接滑动
                                autoplay={true}  // 循环播放
                                indicatorDots={true}
                            >
                                {
                                    activityDetail.banner.map((item, idx) => (
                                        <SwiperItem key={'index_' + idx} >
                                            <Image
                                                src={item}
                                                className='slide_image'
                                                mode='scaleToFill'      // 缩放，不保持比例，填满Image大小
                                                lazyLoad={true}
                                            />
                                        </SwiperItem>
                                    ))
                                }
                            </Swiper>
                        )
                }
                <ActivityDetailHeader activityDetail={activityDetail} />
                <ActivityDetailMiddle activityDetail={activityDetail} />
                <ActivityDetailMain activityDetail={activityDetail} />

            </ScrollView>
            <View className='activity_detail_footer'>
                <View className='footer_left' onClick={goToHome}>
                    <AtIcon prefixClass='icon' value='home' size='16' color='#1CCEAB'></AtIcon>
                    <Text style={{ marginLeft: Taro.pxTransform(10) }}>首页</Text>
                </View>
                {/* 判断活动状态：1、未报名 2、已报名 3、活动已结束 */}
                <View className='footer_right'>活动已结束</View>
            </View>
        </View>
    )
}

ActivityDetail.config = {
    navigationBarTitleText: '活动详情',
}