import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import MallNav from './MallNav'
import MallSearch from './MallSearch'
import MallBanner from './MallBanner'
import MallList from './MallList'
import ListView, { LazyBlock } from "taro-listview";
import { getWindowHeightNoPX, getCustomNavHeight } from '../../../utils/style'
import { useDispatch } from '@tarojs/redux'
import { dispatchGoodsList, getGoodsDetail, getOrderList, getOrderDetail, postOrder, postPay, emptyGoodsList } from '../../../actions/mall'

import './mall.scss'

export default function Mall() {

    const router = useRouter()
    const { id = 0 } = router.params

    const dispatch = useDispatch()

    const [pIndex, setPIndex] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [isLoaded, setIsLoaded] = useState(true)

    useEffect(() => {
        async function getInit() {
            await dispatch(dispatchGoodsList(1, 1000, 0, id))
        }
        getInit()
        return () => {
            console.log('mall页面销毁')
            dispatch(emptyGoodsList())
        }
    }, [])

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
            {/* <MallSearch /> */}
            <ScrollView
                className='scrollview_mall'
                style={{ height: `${getWindowHeightNoPX() - getCustomNavHeight()}px` }}
                scrollY
                scrollWithAnimation
            >
                <View className='bg_2'></View>
                <MallBanner />
                <MallList id={id}/>
            </ScrollView>
        </View>
    )

}
Mall.config = {
    navigationBarTitleText: '商城',
    navigationStyle: 'custom',
    disableScroll: true,
}