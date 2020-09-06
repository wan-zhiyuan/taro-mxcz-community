import Taro, { useState } from '@tarojs/taro'
import { View, Button, Text, ScrollView, Image, Swiper, SwiperItem, } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import HomeNavbar from './HomeNavbar'
import { isEmpty } from '../../utils/is'
import Infor1 from '../../assets/images/community_information_1.png'
import Infor2 from '../../assets/images/community_information_2.png'
import LastPubishDefault from '../../assets/images/last_publish_pic_default.jpg'
import { getWindowHeightNoPX, getCustomNavHeight } from '../../utils/style'

import './home.scss'

export default function Home() {

    const [gridData, setGridData] = useState([
        { id: '1', name: '社区助餐', pic: '' },
        { id: '2', name: '社区通', pic: '' },
        { id: '3', name: '每日签到', pic: '' },
        { id: '4', name: '活动报名', pic: '' },
        { id: '5', name: '积分商城', pic: '' },
    ])
    const [homeBanner, sethomeBanner] = useState([
        'https://yanxuan.nosdn.127.net/bbd03799ba1e0cf7f37966966a0eb0bd.jpg',
        'https://yanxuan.nosdn.127.net/c4d2e4ad4fb2ce5ebe8e11f927198be1.jpg',
        'https://yanxuan.nosdn.127.net/0ecde204ff8fa5ae1a699d63e95b048a.jpg',
        'https://yanxuan.nosdn.127.net/f52b77ae677017256aed881c93f6f0a7.jpg',
    ])
    // 最新发布数据
    const [lastPublish, setLastPublish] = useState([
        1, 2, 3, 4, 5,
    ])
    const [triggered, setTriggered] = useState(true)

    function onRefresh() {
        setTriggered(true)

        // 下拉刷新 3秒后关闭
        setTimeout(() => {
            setTriggered(false)
        }, 3000)
    }

    return (
        <View className='home_index'>
            <HomeNavbar />
            <ScrollView
                className='home_scrollview'
                style={{ height: `${getWindowHeightNoPX() - getCustomNavHeight()}px` }}
                scrollWithAnimation
                scrollY={true}
                enableFlex={true}
            // refresherEnabled={true} // 开启
            // refresherThreshold={100} // 阀值
            // refresherDefaultStyle='white' // 三个点颜色
            // refresherBackground='lightgreen' // 下拉区域背景色
            // refresherTriggered={triggered} // 控制下拉刷新状态
            // onRefresherRefresh={onRefresh} // 开始下拉刷新时触发
            >
                <View className='home_grid'>
                    <View className='home_grid_bg'></View>
                    <View className='grid'>
                        {
                            gridData.map((item, idx) => {
                                return (
                                    <View key={'index_' + idx} className='grid_item'>
                                        {
                                            isEmpty(item.pic)
                                                ? <View className='grid_item_pic_default'></View>
                                                : <Image className='grid_item_pic' src={item.pic} mode='scaleToFill'></Image>
                                        }
                                        <Text className='grid_item_name'>{item.name}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
                {/* banner模块 */}
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
                {/* 信息模块（天气、浏览、入驻、分享等） analytics */}
                <View className='home_msg'>
                    <View className='msg_data'>
                        <AtIcon value='analytics' size='12px' color='#333'></AtIcon>
                        <View style={{ marginLeft: '12px' }}>
                            <Text>浏览：</Text>
                            <Text style={{ color: '#ff0044' }}>2.19万</Text>
                        </View>
                        <View style={{ marginLeft: '20px' }}>
                            <Text>分享：</Text>
                            <Text style={{ color: '#ff0044' }}>93</Text>
                        </View>
                    </View>
                    <View className='msg_weather'>
                        天气：晴
                    </View>
                </View>
                {/* 社区资讯模块 */}
                <View className='home_community_information'>
                    <View className='title'>
                        <Text style={{ marginLeft: '15px' }}>社区资讯</Text>
                    </View>
                    <View className='content'>
                        <Image className='content_item' src={Infor1} mode='scaleToFill'></Image>
                        <Image className='content_item' src={Infor2} mode='scaleToFill'></Image>
                    </View>
                </View>

                <View className='home_last_publish'>
                    <View className='title'>
                        <Text style={{ marginLeft: '15px' }}>最新发布</Text>
                    </View>
                    <View className='content'>
                        {
                            lastPublish.map((item, idx) => {
                                return (
                                    <View key={'index_' + idx} className='last_publish_item'>
                                        <Image className='item_img' src={LastPubishDefault} mode='scaleToFill'></Image>
                                        <View className='item_msg'>
                                            <View className='msg_box1'>
                                                <Text className='title'>9月18日周五16点花艺小课堂</Text>
                                                <Text className='desc'>浦东杨思站</Text>
                                            </View>
                                            <View className='msg_box2'>
                                                <View>
                                                    <Text className='tag'>免费</Text>
                                                    <Text className='state'>已结束</Text>
                                                </View>
                                                <View style={{ marginRight: '20px' }}>
                                                    <Text className='people'>22</Text>
                                                    <Text style={{ fontSize: '11px', lineHeight: '11px', color: '#333' }}>已报名</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

Home.config = {
    navigationBarTitleText: '首页',
    navigationStyle: 'custom',
    disableScroll: true,
}