import Taro, { useState } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem, } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'

import './index.scss'

export default function Index(props) {

    const homeBanner = useSelector(state => state.home.homeIndex.banner)

    return (
        <View className='home_banner'>
            {
                !homeBanner || homeBanner.length === 0
                    ? (
                        <View className='bannerDefault'></View>
                    ) : (
                        <Swiper
                            className='home_banner_swiper'
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
                                homeBanner.map((item, idx) => (
                                    <SwiperItem key={'index_' + idx} >
                                        <Image
                                            src={item.image || ''}
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