import Taro, { useState } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem, } from '@tarojs/components'
import PublishItem from '../HomePublishItem'
import { isEmpty } from '../../../utils/is'

import './index.scss'

export default function Index(props) {

    const [homeBanner, sethomeBanner] = useState([
        'https://yanxuan.nosdn.127.net/bbd03799ba1e0cf7f37966966a0eb0bd.jpg',
        'https://yanxuan.nosdn.127.net/c4d2e4ad4fb2ce5ebe8e11f927198be1.jpg',
        'https://yanxuan.nosdn.127.net/0ecde204ff8fa5ae1a699d63e95b048a.jpg',
        'https://yanxuan.nosdn.127.net/f52b77ae677017256aed881c93f6f0a7.jpg',
    ])

    return (
        <View className='home_banner'>
            {
                isEmpty(homeBanner) || homeBanner.length === 0
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