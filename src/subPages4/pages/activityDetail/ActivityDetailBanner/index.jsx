import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'

import './index.scss'

export default function Index(props) {

    const { } = props

    const activityDetail = useSelector(state => state.activity.communityActivityDetail.basic)

    return (
        <View className='activity_detail_banner'>
            {
                activityDetail.images === '' || !activityDetail
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
                                activityDetail.images.split('|').map((item, idx) => (
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
        </View>
    )
}
Index.defaultProps = {

}