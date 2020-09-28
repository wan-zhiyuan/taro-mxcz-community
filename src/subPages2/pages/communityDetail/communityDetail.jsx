import Taro, { useState, useEffect, useRouter, useShareAppMessage, useDidShow } from '@tarojs/taro'
import { View, ScrollView, Image, Swiper, SwiperItem, } from '@tarojs/components'
import { getWindowHeightNoPX } from '../../../utils/style'
import PopupQRcode from './../../../components/Popup/PopupQRcode'
import { useSelector, useDispatch } from '@tarojs/redux'
import DetailTab from './DetailTab'
import DetailHeader from './DetailHeader'
import DetailFooter from './DetailFooter'
import DetailRight from './DetailRight'
import { hidePopQr, getBusinessDetail, dispatchBusinessDetail, communityBusinessExtend } from '../../../actions/community'

import './communityDetail.scss'

export default function CommunityDetail() {

    const router = useRouter()
    const { target_id = 0 } = router.params

    const isOpenedPopQr = useSelector(state => state.community.isOpenedPopQr)
    const detail = useSelector(state => state.community.businessDetail.basic)
    const dispatch = useDispatch()


    useEffect(() => {
        // 阅读数+1
        businessExtend(0, '')
    }, [])

    useDidShow(() => {
        // 获取社区商户详情(包含评论后返回详情页更新数据)
        dispatch(dispatchBusinessDetail(target_id))
    })

    // 分享配置
    useShareAppMessage(res => {
        if (res.from === 'button') {
            console.log('来自页面内转发按钮')
            let eData = res.target.dataset.share
            console.log(res.target)
            console.log(eData)
            // 分享数+1 (type=3分享)
            businessExtend(3, '')
            return {
                title: `盟享诚珍-${detail.business_name || ''}`,
                path: `/pages/home/home?target=communityDetail&target_id=${target_id}`,
                imageUrl: ''
            }
        }
        return {
            title: '盟享诚珍社区', // 分享卡片展示的标题
            path: '/pages/home/home', // 分享卡片的路径
            imageUrl: '',
        }
    })

    /* 阅读、点赞、评论、分享、收藏 */
    function businessExtend(type = 0, content = '') {
        let postData = {
            op: 'business_extend',
            target_id,
            type,
            content,
        }
        communityBusinessExtend(postData)
    }


    return (
        <View className='community_detail_index'>
            <PopupQRcode
                isOpened={isOpenedPopQr}
                title={detail.business_name}
                // qrTxt={detail.wechat_pic} 
                pic={detail.wechat_pic}
                onClose={() => { dispatch(hidePopQr()) }}></PopupQRcode>
            {/* 右侧悬浮模块 */}
            <DetailRight target_id={target_id} />
            <ScrollView
                style={{ height: `${(getWindowHeightNoPX() - 60)}px` }}
                scrollY
                scrollWithAnimation
            >
                {/* 头部banner */}
                {
                    detail.images === ''
                        ? <View className='banner_default'></View>
                        : <Swiper
                            className='detail_banner_swiper'
                            indicatorColor='#999'
                            indicatorActiveColor='#333'
                            current={0}
                            duration={500}
                            interval={5000}
                            circular={true}  // 是否衔接滑动
                            autoplay={true}  // 循环播放
                            indicatorDots={false}
                        >
                            {
                                detail.images.split('|').map((item, idx) => (
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
                }
                {/* 头部模块 */}
                <DetailHeader detail={detail} />
                {/* 社区详情主内容 */}
                <DetailTab />
            </ScrollView>
            {/* 底部模块 */}
            <DetailFooter target_id={target_id}/>
        </View>
    )
}

CommunityDetail.config = {
    navigationBarTitleText: '社区',
}