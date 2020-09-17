import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, Text, ScrollView, Image, Swiper, SwiperItem, } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import HomeNavbar from './HomeNavbar'
import Infor1 from '../../assets/images/community_information_1.png'
import Infor2 from '../../assets/images/community_information_2.png'
import LastPubishDefault from '../../assets/images/last_publish_pic_default.jpg'
import { getWindowHeightNoPX, getCustomNavHeight } from '../../utils/style'
import { judgeTarget } from '../../utils/navTool'
import HomeBanner from './HomeBanner'
import HomePublish from './HomePublish'
import HomeGrid from './HomeGrid'
import { createHttp } from '../../service/servers'
import { useDispatch, useSelector } from '@tarojs/redux'
import { dispatchHomeIndex } from '../../actions/home'
import { signMain, signRankingTime, signRankingTotal, pointList, collectList } from '../../actions/user'
import ListView, { LazyBlock } from "taro-listview";


import './home.scss'

export default function Home() {

    const router = useRouter()

    const dispatch = useDispatch()

    // 最新发布数据
    const [lastPublish, setLastPublish] = useState([
        1, 2, 3, 4, 5,
    ])
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [error, setError] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)


    useEffect(() => {
        judgeTarget(router.params)

        // let page = 1
        // let pagesize = 10
        // dispatch(dispatchHomeIndex(page,pagesize))
        signMain()
        signRankingTotal(1,10)
        signRankingTime(1,10)
        pointList()
        collectList()
    }, [])

    // 下拉刷新相关代码
    // const [triggered, setTriggered] = useState(true)
    // function onRefresh() {
    //     setTriggered(true)
    //     // 下拉刷新 3秒后关闭
    //     setTimeout(() => {
    //         setTriggered(false)
    //     }, 3000)
    // }

    function naviToInformation() {
        Taro.navigateTo({
            url: '/subPages2/pages/information/information'
        })
    }

    async function onScrollToLower() {

    }
    async function pullDownRefresh() {
        
    }

    return (
        <View className='home_index'>
            <HomeNavbar />
            {/* <ListView
                // autoHeight
                style={{ height: `${getWindowHeightNoPX() - getCustomNavHeight()}px` }}
                lazy
                isLoaded={isLoaded}
                isError={error}
                hasMore={hasMore}
                isEmpty={isEmpty}
                onPullDownRefresh={pullDownRefresh}
                onScrollToLower={onScrollToLower}
            > */}

            
            <ScrollView
                className='home_scrollview'
                scrollWithAnimation
                scrollY={true}
                // 优化点
                // 设置后ios会存在布局异常，未解决，暂时使用margin: 0 auto处理
                // enableFlex={true} // 设置flex之后，里面的元素宽度不允许设置100%
                style={{ height: `${getWindowHeightNoPX() - getCustomNavHeight()}px` }}
            >
                {/* 导航模块 */}
                <HomeGrid />
                {/* banner模块 */}
                <HomeBanner />
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
                        <Image className='content_item' src={Infor1} mode='scaleToFill' onClick={() => { }}></Image>
                        <Image className='content_item' src={Infor2} mode='scaleToFill' onClick={naviToInformation}></Image>
                    </View>
                </View>
                {/* 社区论坛模块 */}
                <HomePublish />

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
            {/* </ListView> */}
        </View>
    )
}

Home.config = {
    navigationBarTitleText: '首页',
    navigationStyle: 'custom',
    disableScroll: true,
}