import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import DetailHeader from './DetailHeader'
import DetailContent from './DetailContent'
import DetailComment from './DetailComment'
import DetailFooter from './DetailFooter'
import { useDispatch } from '@tarojs/redux'
import { dispatchGoodsDetail } from '../../../actions/mall'

import './goodsDetail.scss'

export default function GoodsDetail() {

    const router = useRouter()
    const { mid = 0 } = router.params

    console.log('mid=' + mid)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(dispatchGoodsDetail(mid))
    },[])

    return (
        <View className='goods_detail_index'>
            <DetailHeader />
            <DetailContent />
            {/* <DetailComment /> */}
            <View style={{width:'100%',height:'70px'}}></View>
            <DetailFooter />
        </View>
    )

}
GoodsDetail.config = {
    navigationBarTitleText: '商品详情',
}