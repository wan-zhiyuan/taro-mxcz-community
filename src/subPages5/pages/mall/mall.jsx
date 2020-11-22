import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import MallNav from './MallNav'
import MallSearch from './MallSearch'
import MallList from './MallList'
import ListView, { LazyBlock } from "taro-listview";
import { getWindowHeightNoPX, getCustomNavHeight } from '../../../utils/style'
import { useDispatch } from '@tarojs/redux'
import { dispatchGoodsList, getGoodsDetail, getOrderList, getOrderDetail, postOrder, postPay } from '../../../actions/mall'

import './mall.scss'
import { isEmpty } from '../../../utils/is'

export default function Mall() {

    const dispatch = useDispatch()

    const [pIndex, setPIndex] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [isLoaded, setIsLoaded] = useState(true)

    useEffect(()=>{
        async function getInit() {
            await dispatch(dispatchGoodsList())
        }
        getInit()
    },[])

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
            <ScrollView
                className='scrollview_mall'
                style={{ height: `${getWindowHeightNoPX() - getCustomNavHeight()}px` }}
                scrollY
                scrollWithAnimation
            >
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