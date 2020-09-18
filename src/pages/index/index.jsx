import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { getWindowHeight } from '../../utils/style'
import ListView, { LazyBlock } from "taro-listview";

import './index.scss'

export default function Index() {

    const [pageIndex, setPageIndex] = useState(1)
    const [list, setList] = useState([])
    const [isLoaded, setIsLoaded] = useState(false) // 骨架屏是否显示 仅加载第一页的时候开启
    const [hasMore, setHasMore] = useState(true)
    const [error, setError] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)

    useEffect(()=>{
        async function fetchInit() {
            const data = await getData()
            setList(data.list)
            setHasMore(data.hasMore)
            setIsLoaded(data.isLoaded)
        }
        fetchInit()
    },[])

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
        console.log(( pIndex===1))
        // 根据返回的数据判断，是否没有数据。如果还有hasMore:true 没有了hasMore:false 并且底部显示没有了Divider
        return { list:res.data.data, hasMore: true, isLoaded: pIndex===1}
    }


    async function onScrollToLower() {
        console.log('onScrollToLower()')
        let index = pageIndex + 1
        setPageIndex(index)
        const {list: newList, hasMore} = await getData(index)
        console.log(newList)
        console.log('hasMore:' + hasMore)
        setList(list.concat(newList))
        setHasMore(hasMore)
    }
    async function pullDownRefresh() {
        console.log('pullDownRefresh()')
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
        </View>
    )
}
Index.config = {
    navigationBarTitleText: '测试页面',
}