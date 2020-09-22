import Taro, { useState, } from '@tarojs/taro'
import { View } from '@tarojs/components'
import MyRichText from '../../../../components/MyRichText'
import { useSelector } from '@tarojs/redux'

import './index.scss'

/* 社区的详情模块 */
export default function Index(props) {

    const detail = useSelector(state => state.community.businessDetail)

    function goToLocate() {
        Taro.navigateTo({
            url: `/subPages2/pages/communityLocate/communityLocate`
        })
    }

    return (
        <View className='tab_main'>
            <View className='memo'>
                <MyRichText richText={detail.memo} />
            </View>
            <View className='want_locate' onClick={goToLocate}>
                <View className='locate_btn'>我是商家，我要入驻</View>
            </View>
        </View>
    )
}

Index.defaultProps = {
    
}