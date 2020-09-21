import Taro, { useState, useEffect, useShareAppMessage } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { getWindowHeight } from '../../utils/style'
import ListView, { LazyBlock } from "taro-listview";
import { getLocationString } from '../../utils/location'
import { getPointList, getCollectList } from '../../actions/user'
import { sign, signRankingTime, signRankingTotal, } from '../../actions/signIn'
import {
    increasePublish, increaseInfo, publishExtend, informationExtend, getPublish, getInformation,
    getPublishDetail, getInformationDetail,
} from '../../actions/publish'
import Share from '../../components/ShareComponent'

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