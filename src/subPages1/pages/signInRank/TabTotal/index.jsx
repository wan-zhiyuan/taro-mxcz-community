import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import RankItem from '../RankItem'
import { signRankingTotal } from '../../../../actions/signIn'
import ListView, { LazyBlock } from "taro-listview";

import './index.scss'

export default function Index(props) {

    const { height } = props

    const [rankList, setRankList] = useState([])
    const [pageIndex, setPageIndex] = useState(1)
    const [isLoaded, setIsLoaded] = useState(false) // 骨架屏是否显示 仅加载第一页的时候开启
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        async function getInit() {
            const data = await getData()
            setRankList(data.list)
            setHasMore(data.hasMore)
            setIsLoaded(data.isLoaded)
        }
        getInit()
    }, [])

    async function getData(pIndex = pageIndex) {
        if (pIndex === 1) {
            setIsLoaded(false)
        }
        const res = await signRankingTotal(pIndex, 20)
        // 根据返回的数据判断，是否没有数据。如果还有hasMore:true 没有了hasMore:false 并且底部显示没有了Divider
        let hasMore = true
        let listNum = rankList.length + res.data.list.length
        if (listNum >= Number(res.data.total)) {
            console.log('没有更多数据')
            hasMore = false
        }
        return { list: res.data.list, hasMore: hasMore, isLoaded: pIndex === 1 }
    }

    async function onScrollToLower() {
        console.log('onScrollToLower()')
        let index = pageIndex + 1
        setPageIndex(index)
        const { list: newList, hasMore } = await getData(index)
        console.log(newList)
        console.log('hasMore:' + hasMore)
        setRankList(list.concat(newList))
        setHasMore(hasMore)
    }

    return (
        <View className='tab_total'>
            <ListView
                className='tab_total_listview'
                style={{ height: height }}
                lazy
                isLoaded={isLoaded}
                hasMore={hasMore}
                onScrollToLower={onScrollToLower}
            >
                {
                    rankList.map((item, idx) => {
                        return (
                            <RankItem key={'index_' + idx} item={item} index={idx} type='total' />
                        )
                    })
                }
            </ListView>
        </View>

    )

}
Index.defaultProps = {
    height: 500,
    generalList: [1, 2, 3]
}