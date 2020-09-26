import Taro, { useState, useEffect, useRouter, useDidShow, useDidHide } from '@tarojs/taro'
import { View, Text, ScrollView, } from '@tarojs/components'
import HomeNavbar from './HomeNavbar'
import { getWindowHeightNoPX, getCustomNavHeight } from '../../utils/style'
import { judgeTarget } from '../../utils/navTool'
import HomeBanner from './HomeBanner'
import HomeMsg from './HomeMsg'
import HomeCommunityInfo from './HomeCommunityInfo'
import HomePublish from './HomePublish'
import HomeGrid from './HomeGrid'
import { useDispatch, useSelector } from '@tarojs/redux'
import { dispatchHomeIndex } from '../../actions/home'
import { dispatchUser, updateCity } from '../../actions/user'
import { getPublish } from '../../actions/publish'
import ListView, { LazyBlock } from "taro-listview";
import PopupLogin from '../../components/PopupLogin'
import { get as getGlobalData, set as setGlobalData } from '../../global_data'
import { getLocationString } from '../../utils/location'
import { reverseGeocoderString } from '../../utils/geocoder'

import './home.scss'

export default function Home() {

    const router = useRouter()
    const userInfo = useSelector(state => state.user.userInfo)
    const dispatch = useDispatch()

    // 用户是否登陆
    const [isLogin, setIsLogin] = useState(true)
    const [scrollTop, setScrollTop] = useState(-1)

    const [publishList, setPublishList] = useState([])
    const [publishAll, setPublishAll] = useState([])
    const [pIndex, setPIndex] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)
    // const [error, setError] = useState(false)
    // const [isEmpty, setIsEmpty] = useState(false)

    useEffect(() => {
        // 判断路由参数
        judgeTarget(router.params)

        // 初始化数据
        getInit()
    }, [])

    useDidShow(() => {
        // 获取发布信息数据
        getData()
    })

    async function getInit() {
        // 获取用户信息
        // await dispatch(dispatchUser())
        // 获取首页信息
        await dispatch(dispatchHomeIndex())
    }

    async function getData() {
        // 获取首页展示的发布信息
        getPublishData(0)
    }

    async function getPublishData(index = pIndex) {
        if (index = 0) setIsLoaded(false) // 初次加载 数据请求前 不显示页面
        // cate_id:0 全部 location:'' 使用用户当前定位 is_near:0 不按照附近排序 
        let location = getGlobalData('location') || ''
        const { data: listData } = await getPublish(0, location, 0)
        // const { data: listData } = await getPublish(0, location, 0)
        // if (res.code === 200) {
        setPublishAll(listData)
        let newIndex = index + 10
        setPIndex(newIndex)
        if (newIndex >= Number(listData.length)) {
            setHasMore(false)
        } else {
            setHasMore(true)
        }
        let newArr = listData.slice(0, newIndex)
        console.log(newArr)
        setPublishList(newArr)
        // }
        setIsLoaded(true) // 初次加载 数据请求后 显示页面
    }

    /* 上拉加载 */
    async function onScrollToLower() {
        console.log('onScrollToLower()')
        Taro.showLoading({
            title: '加载中'
        })
        let newIndex = pIndex + 10 // 每次多加载10项
        setPIndex(newIndex)
        let newArr = publishAll.slice(0, newIndex)
        setTimeout(() => {
            console.log(newArr)
            setPublishList(newArr)
            Taro.hideLoading()
        }, 500)
        // 判断是否还有新数据
        if (newIndex >= Number(publishAll.length)) {
            setHasMore(false)
        }
    }
    /* 下拉刷新 */
    async function pullDownRefresh() {
        console.log('pullDownRefresh()')
        // 下拉刷新：重新请求首页信息，重制pIndex=10
        getData()
    }

    return (
        <View className='home_index lazy-view'>
            {/* 登录弹窗模块 */}
            {
                !userInfo.nickname &&
                <PopupLogin />
            }
            <HomeNavbar />
            <ListView
                style={{ height: `${getWindowHeightNoPX() - getCustomNavHeight()}px` }}
                lazy
                hasMore={hasMore}
                isLoaded={isLoaded}
                // isError={error}
                // isEmpty={isEmpty}
                onPullDownRefresh={pullDownRefresh}
                onScrollToLower={onScrollToLower}
                scrollTop={scrollTop}
            >
                {/* 导航模块 */}
                <HomeGrid />
                {/* banner模块 */}
                <HomeBanner />
                {/* 信息模块（天气、浏览、入驻、分享等） analytics */}
                <HomeMsg />
                {/* 社区资讯模块 */}
                <HomeCommunityInfo />
                {/* 社区发布模块 */}
                <HomePublish publishList={publishList} hasMore={hasMore} />
            </ListView>
        </View>
    )
}

Home.config = {
    navigationBarTitleText: '首页',
    navigationStyle: 'custom',
    disableScroll: true,
}