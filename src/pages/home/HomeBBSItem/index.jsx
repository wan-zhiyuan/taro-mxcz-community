import Taro, { useState } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'

import './index.scss'

export default function Index(props) {

    const { bbsItem } = props

    return (
        <View className='bbs_item'>
            <View className='item_top'>
                <View className='item_user'>
                    {
                        bbsItem.avatar
                        ? <Image className='user_avatar' src={bbsItem.avatar} mode='scaleToFill'></Image>
                        : <Image className='user_avatar_default'></Image>
                    }
                    <View className='item_user_right'>
                        <Text className='user_name'>楽</Text>
                        <Text className='item_cate'>二手闲置</Text>
                    </View>
                </View>
                <View className='item_detail'>{`查看详情>>`}</View>
            </View>
            <View className='item_desc'></View>
            {/* 最多只显示四张 */}
            <View className='item_pic'></View>
            <View className='item_msg'>
                <Text className='item_time'></Text>
                <View className='item_readnum'></View>
                <View className='item_praise'></View>
            </View>
        </View>
    )
}

Index.defaultProps = {
    bbsItem: {}
}