import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, Text, ScrollView, Image, } from '@tarojs/components'
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
import { getCollectList, dispatchUser } from '../../actions/user'
import {
    increasePublish, increaseInfo, publishExtend, informationExtend, getPublish, getInformation,
    getPublishDetail, getInformationDetail,
} from '../../actions/publish'

import {
    getCommunityBusiness, getCommunityServiceSite, 
    createCommunityServiceSite, createCommunityBusiness, communityBusinessExtend,
    getServiceSiteDetail, getBusinessDetail, 
} from '../../actions/community'
import {
    getCommunityActivity, getCommunityActivityDetail,
} from '../../actions/activity'
import ListView, { LazyBlock } from "taro-listview";
import PopupLogin from '../../components/PopupLogin'


import './home.scss'

export default function Home() {

    const router = useRouter()

    const userInfo = useSelector(state => state.user.userInfo)
    const dispatch = useDispatch()

    // 最新发布数据
    const [isLogin, setIsLogin] = useState(true)

    const [lastPublish, setLastPublish] = useState([
        1, 2, 3, 4, 5,
    ])
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [error, setError] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)


    useEffect(() => {
        // 判断路由参数
        judgeTarget(router.params)
        // 初始化数据
        initData()


        // getCollectList()

        // testIncreasePublish() // 新增发布信息
        // testincreaseInfo() // 新增资讯信息
        

        // 社区服务站 社区（商家） 社区活动相关
        // testGetCommunityBusiness()
        // testGetCommunityServiceSite()
        // testGetCommunityActivity(0,1,10)

        // testCreateCommunityBusiness() // 申请创建社区
        // testCreateCommunityServiceSite() // 申请创建社区服务站
        

        // testGetServiceSiteDetail(1)
        // testGetBusinessDetail(1)
        // testGetCommunityActivityDetail(1)
    }, [])

    async function initData() {
        const res = await dispatch(dispatchUser())
        if (!!res.data.nickname) {
            console.log('用户已登陆')
        } else {
            console.log('用户未登陆')
            setIsLogin(false)
        }

        let page = 1
        let pagesize = 10
        dispatch(dispatchHomeIndex(page, pagesize))
    }

    function testGetCommunityActivityDetail(target_id) {
        getCommunityActivityDetail(target_id)
    }

    function testGetBusinessDetail(target_id) {
        getBusinessDetail(target_id)
    }

    function testGetServiceSiteDetail(target_id) {
        getServiceSiteDetail(target_id)
    }

    async function testCreateCommunityBusiness() {
        const location = await getLocation()
        let postData = {
            op: 'business',
            location,
            business_name: '浦东新区中心街道社区',
            apply_mobile: '13698984545', // 申请手机号
            address: '上海市浦东新区可口可乐路111号',
            keyword: '零售', // 行业关键此
            industry: '浦东新区', // 行业分类
            memo: '我们要做大做强', // 商家简介
            contact_phone: '13585643944', // 联系电话
            notice: '可乐管够', // 商家公告
            logo: '',
            wechat_pic: '',
            banner: '', // 商家轮播图 以 | 做分割符号
            details: '',  // 商家详情图 以 | 做分割符号
        }
        createCommunityBusiness(postData)
    }

    async function testCreateCommunityServiceSite() {
        const location = await getLocation()
        let postData = {
            op: 'service_site',
            location,
            logo: '',
            apply_mobile: '13485856969',
            address: '上海市浦东新区浦三路3060号',
            company_name: '上海三三有限公司',
            company_phone: '13878912345',
            industry: '社区养老',
            memo: '好好好',
        }
        createCommunityServiceSite(postData)
    }

    async function testGetCommunityBusiness() {
        const location = await getLocation()
        getCommunityBusiness(location, '', 0)
    }

    async function testGetCommunityServiceSite() {
        const location = await getLocation()
        getCommunityServiceSite(location, '', 0,)
    }

    function testGetCommunityActivity(cate_id, page, pagesize) {
        getCommunityActivity(cate_id, page, pagesize)
    }



    function testincreaseInfo() {
        let postData = {
            op: 'information',
            cate_id: 1,
            cate_name: '演唱会',
            title: '华晨宇演唱会3',
            content: '今天天气真好，我要出去郊游～3',
            video_url: '',
            images: 'http://0.rc.xiniu.com/g1/M00/A7/89/CgAGTFjLml-AK0u8AAOlv9Gxors475.jpg|' +
                'http://0.rc.xiniu.com/g1/M00/A7/89/CgAGTFjLmlyALvzuAAMlwfOz4ms167.jpg|' +
                'http://0.rc.xiniu.com/g1/M00/A7/89/CgAGTFjLml2AY1iGAAM3svfTX_E935.jpg',
        }
        increaseInfo(postData)
    }

    async function testIncreasePublish() {
        const location = await getLocation()
        let postData = {
            op: 'publish',
            cate_id: 1,
            cate_name: '二手闲置',
            content: '今天天气真好，我要出去郊游～',
            images: '',
            location: location,
            contact_name: '华晨宇',
            contact_mobile: '13589890606',
        }
        increasePublish(postData)
    }

    async function getLocation() {
        let location = ''
        try {
            const res = await Taro.getLocation({
                type: 'gcj02',
            })
            console.log(res)
            location = res.latitude + ',' + res.longitude
            console.log(location)
        } catch (err) {
            location = ''
        }
        return location
    }

    async function onScrollToLower() {

    }
    async function pullDownRefresh() {

    }

    return (
        <View className='home_index lazy-view'>
            {/* 登录弹窗模块 */}
            {
                !isLogin &&
                <PopupLogin />
            }
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
                <HomeMsg />
                {/* 社区资讯模块 */}
                <HomeCommunityInfo />
                {/* 社区发布模块 */}
                <HomePublish />

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