import Taro, { useState, useEffect, useShareAppMessage } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { getWindowHeight } from '../../../utils/style'
import ListView, { LazyBlock } from "taro-listview";
import { getLocationString } from '../../../utils/location'
import { getPointList, getCollectList } from '../../../actions/user'
import { sign, signRankingTime, signRankingTotal, } from '../../../actions/signIn'
import {
    increasePublish, increaseInfo, publishExtend, 
    informationExtend, getPublish, getInformation,
    getPublishDetail, getInformationDetail,
} from '../../../actions/publish'
import {
    getCommunityBusiness, getCommunityServiceSite,
    createCommunityServiceSite, createCommunityBusiness, communityBusinessExtend,
    getServiceSiteDetail, getBusinessDetail,
} from '../../../actions/community'
import Share from '../../../components/ShareComponent'

import './index.scss'

export default function Index() {

    const [pageIndex, setPageIndex] = useState(1)
    const [list, setList] = useState([])
    const [isLoaded, setIsLoaded] = useState(false) // 骨架屏是否显示 仅加载第一页的时候开启
    const [hasMore, setHasMore] = useState(true)
    const [error, setError] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)

    useEffect(() => {
        async function fetchInit() {
            const data = await getData()
            setList(data.list)
            setHasMore(data.hasMore)
            setIsLoaded(data.isLoaded)
        }
        fetchInit()

        // 接口单元测试
        testInit()
    }, [])

    function testInit() {
        // sign()
        // 完成
        // signRankingTotal(1,10)
        // 完成
        // signRankingTime(1,10)

        // 完成
        // testGetPublish(0) // 获取发布信息列表 0-全部 其他-表示对应的分类ID
        // testGetInformation(0) // 获取资讯信息列表 0-全部 其他-表示对应的cate_id
        // 完成
        // testGetPublishDetail(1) // 获取发布信息详情
        // testGetInformationDetail(1) // 获取资讯信息详情
        // 完成
        // getPointList(1,20)

        // 完成
        // testCommunityBusinessExtend(1,2,'123') // 社区（商家）的阅读、点赞、评论、分享、收藏等操作
        // testPublishExtend(2) // 发布信息阅读、点赞、评论
        // testInformationExtend(2) // 资讯信息阅读、点赞、评论 0-阅读 2-评论    

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
    }

    async function testGetPublish(cate_id) {
        const location = await getLocationString()
        getPublish(cate_id, location)
    }
    function testGetInformation(cate_id, page, pagesize) {
        getInformation(cate_id, page, pagesize)
    }

    function testGetPublishDetail(target_id) {
        getPublishDetail(target_id)
    }
    function testGetInformationDetail(target_id) {
        getInformationDetail(target_id)
    }

    function testCommunityBusinessExtend(target_id, type, content) {
        let postData = {
            op: 'business_extend',
            target_id,
            type,
            content,
        }
        communityBusinessExtend(postData)
    }
    function testPublishExtend(type) {
        let postData = {
            op: 'publish_extend',
            target_id: 23,
            type: type, // 0-阅读 1-点赞 2-评论
            content: '评论测试评论测试123123苹果香蕉'
        }
        publishExtend(postData)
    }
    function testInformationExtend(type) {
        let postData = {
            op: 'information_extend',
            target_id: 13,
            type: type,
            content: '这是评论，'
        }
        informationExtend(postData)
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


    async function getData(pIndex = pageIndex) {
        // 数据加载前 鱼骨屏不开启
        if (pIndex === 1) {
            setIsLoaded(false)
        }
        const res = await Taro.request({
            url: 'https://cnodejs.org/api/v1/topics',
            data: {
                limit: 10,
                page: pIndex
            }
        })
        console.log(res)
        console.log(res.data)
        console.log((pIndex === 1))
        // 根据返回的数据判断，是否没有数据。如果还有hasMore:true 没有了hasMore:false 并且底部显示没有了Divider
        return { list: res.data.data, hasMore: true, isLoaded: pIndex === 1 }
    }

    async function onScrollToLower() {
        console.log('onScrollToLower()')
        let index = pageIndex + 1
        setPageIndex(index)
        const { list: newList, hasMore } = await getData(index)
        console.log(newList)
        console.log('hasMore:' + hasMore)
        setList(list.concat(newList))
        setHasMore(hasMore)
    }
    async function pullDownRefresh() {
        console.log('pullDownRefresh()')
    }


    /* 分享相关方法 */
    const [isOpenedShare, setIsOpenedShare] = useState(false) // 测试的时候设置默认值为true
    useShareAppMessage(res => {
        console.log(res)
        if (res.from === 'button') {


            return
        }
        return
    })
    function handleClose() {
        setIsOpenedShare(false)
    }
    function handleShare() {
        setIsOpenedShare(false)
    }
    function handleBill() {
        setIsOpenedShare(false)
    }

    return (
        <View>
            <ListView
                // autoHeight
                style={{
                    height: getWindowHeight(),
                    backgroundColor: '#f2f2f2'
                }}
                lazy
                isLoaded={isLoaded}
                isError={error}
                hasMore={hasMore}
                isEmpty={isEmpty}
                onPullDownRefresh={pullDownRefresh}
                onScrollToLower={onScrollToLower}
            >
                {
                    list.map((item, idx) => {
                        return (
                            <View className='test1' key={'index_' + idx}>
                                {item.title}
                            </View>
                        )
                    })
                }
            </ListView>
            <Share isOpened={isOpenedShare} onClose={handleClose} />
        </View>
    )
}
Index.config = {
    navigationBarTitleText: '测试页面',
}