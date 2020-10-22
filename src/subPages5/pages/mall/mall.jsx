import Taro, { useState } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import MallNav from './MallNav'
import MallSearch from './MallSearch'
import MallList from './MallList'
import ListView, { LazyBlock } from "taro-listview";
import { getWindowHeightNoPX, getCustomNavHeight } from '../../../utils/style'

import './mall.scss'

export default function Mall() {

    const [pIndex, setPIndex] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [isLoaded, setIsLoaded] = useState(true)

    /* 上拉加载 */
    async function onScrollToLower() {
        console.log('onScrollToLower()')

    }
    /* 下拉刷新 */
    async function pullDownRefresh() {
        console.log('pullDownRefresh()')
    }

    return (
        <View className='mall_index'>
            <MallNav />
            <MallSearch />

            {/* <ListView
                className='list_view'
                style={{ height: `${getWindowHeightNoPX() - getCustomNavHeight()}px` }}
                lazy
                hasMore={hasMore}
                isLoaded={isLoaded}
            // onPullDownRefresh={pullDownRefresh}
            // onScrollToLower={onScrollToLower}
            >
                <View className='bg_1'></View>
                <View className='bg_2'></View>
                <MallList />

            </ListView> */}
            <ScrollView
                className='scrollview_mall'
                style={{ height: `${getWindowHeightNoPX() - getCustomNavHeight()}px` }}
                scrollY
                scrollWithAnimation
            >
                {/* <View className='bg_1'></View>
                <View className='bg_2'></View> */}
                <MallList />
            </ScrollView>
        </View>
    )

}
Mall.config = {
    navigationBarTitleText: '商城',
    navigationStyle: 'custom',
    disableScroll: true,
}