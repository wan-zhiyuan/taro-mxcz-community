import Taro, { useState, } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import MyRichText from '../../../../components/MyRichText'

import './index.scss'

/* 社区的详情模块 */
export default function Index(props) {

    const { community } = props

    function goToLocate() {
        Taro.navigateTo({
            url: `/subPages2/pages/communityLocate/communityLocate`
        })
    }

    return (
        <View>
            <MyRichText richText={community.detail} />
            <View className='want_locate' onClick={goToLocate}>
                <View className='locate_btn'>我是商家，我要入驻</View>
            </View>
        </View>
    )
}

Index.defaultProps = {
    community:{}
}