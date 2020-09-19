import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { getWindowHeight } from '../../../utils/style'
import PointHeader from './PointHeader'
import PointList from './PointList'
import { getPointList } from '../../../actions/user'
import ListView, { LazyBlock } from "taro-listview";

import './pointDetail.scss'

export default function PointDetail() {

    const [pageIndex, setPageIndex] = useState(1)
    const [list, setList] = useState([])
    const [isLoaded, setIsLoaded] = useState(false) // 骨架屏是否显示 仅加载第一页的时候开启
    const [hasMore, setHasMore] = useState(true)
    const [pointNumber, setPointNumber] = useState(0)

    useEffect(() => {
        async function getInit() {
            const data = await getData()
            setList(data.list)
            setHasMore(data.hasMore)
            setIsLoaded(data.isLoaded)
            setPointNumber(data.pointNumber)
        }
        getInit()
    }, [])

    // 因为首次获取数据 和 后续分页获取数据后 对于list的处理不同，所以把获取数据的方法提取出来
    async function getData(pIndex = pageIndex) {
        if (pIndex === 1) {
            setIsLoaded(false)
        }
        const res = await getPointList(pIndex, 10)
        let hasMore = true
        let listNum = list.length + res.data.point_list.length
        if (listNum >= Number(res.data.total)) {
            hasMore = false
        }
        return { list: res.data.point_list, hasMore: hasMore, isLoaded: pIndex === 1, pointNumber: res.data.point_number }
    }

    /* 上拉加载 */
    async function onScrollToLower() {
        let index = pageIndex + 1
        setPageIndex(index)
        const { list: newList, hasMore } = await getData(index)
        setList(list.concat(newList))
        setHasMore(hasMore)
    }

    return (
        <View className='point_detail_index'>
            <ListView
                className='point_detail_listview'
                style={{ height: getWindowHeight() }}
                lazy
                isLoaded={isLoaded}
                hasMore={hasMore}
                onScrollToLower={onScrollToLower}
            >
                <PointHeader pointNumber={pointNumber}/>
                <PointList pointList={list} hasMore={hasMore} />
            </ListView>
            {/* <ScrollView
                className='point_detail_scroll'
                scrollY
                scrollWithAnimation
                style={{ height: getWindowHeight() }}
            >
                <PointHeader />
                <PointList />

            </ScrollView> */}
        </View>
    )

}
PointDetail.config = {
    navigationBarTitleText: '积分明细',
}