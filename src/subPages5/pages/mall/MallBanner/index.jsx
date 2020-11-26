import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'

import './index.scss'
import { isEmpty } from '../../../../utils/is'

export default function Index(props) {

    const { } = props

    const mallBanner = useSelector(state => state.mall.goodsList.banner)

    // function handleClickBanner(item) {
    //     if (isEmpty(item.href)) {
    //         return
    //     }
    //     Taro.navigateTo({
    //         url: `/subPages1/pages/webview/webview?url=${item.href}&title=${item.title}`
    //     })
    // }

    function handleBanner(href) {
        console.log('href:' + href)
        if ((href == '#') || isEmpty(href)) {
            return
        }
        Taro.navigateTo({
            url: `/subPages1/pages/ad/ad?url=${href}`
        })
    }

    return (
        <View className='mall_banner'>
            {
                !mallBanner || mallBanner.length === 0
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
                                mallBanner.map((item, idx) => (
                                    <SwiperItem key={'index_' + idx} >
                                        <Image
                                            src={item.image || ''}
                                            className='slide_image'
                                            mode='scaleToFill'      // 缩放，不保持比例，填满Image大小
                                            lazyLoad={true}
                                            onClick={()=>{handleBanner(item.href)}}
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