import Taro, { useState, useEffect, useDidShow, useRouter, useShareAppMessage, useDidHide } from '@tarojs/taro'
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
        
    },[])

    useDidShow(()=>{
        async function getInit() {
            // 获取商品详情
            const res = await dispatch(dispatchGoodsDetail(mid))
        }
        getInit()
    })

    useShareAppMessage(res => {
        return {
            title: `盟享诚珍`,
            path: `/pages/home/home?target=goodsDetail&mid=${mid}`,
            imageUrl: ''
        }
    })

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