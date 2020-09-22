import Taro, { useState, useEffect, useRouter, useShareAppMessage } from '@tarojs/taro'
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

    const [community, setCommunity] = useState({
        cid: '1', name: '上海市浦东新区人民政府潍坊新村街道办事处', address: '上海市浦东新区福山路317号', rate: 5, popul: 120, phone: 68757800, range: '15.4km',
        pic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3607787663,2825710095&fm=26&gp=0.jpg',
        detail: `<p style="text-align:center;">	<img src="http://static.ibarrel.top/userimages/prd/202009/01/2020090108584587449.jpg" alt="" /></p><p style="text-align:center;">	<img src="http://static.ibarrel.top/userimages/prd/202008/24/2020082412422073796.jpg" alt="" /></p>`,
    })


    useEffect(() => {
        // 阅读数+1
        businessExtend(0, '')
        // 获取社区商户详情
        dispatch(dispatchBusinessDetail(target_id))
    }, [])

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
                    detail.banner === ''
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
                                detail.banner.split('|').map((item, idx) => (
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
                <DetailHeader detail={detail}/>
                {/* 社区详情主内容 */}
                <DetailTab />
            </ScrollView>
            {/* 底部模块 */}
            <DetailFooter detail={detail} />
        </View>
    )
}

CommunityDetail.config = {
    navigationBarTitleText: '社区',
}