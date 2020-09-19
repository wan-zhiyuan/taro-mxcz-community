import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { getDateTypeSeconds } from '../../../../utils/timer'

import './index.scss'

export default function Index(props) {

    const { item, index, type, } = props

    function isIcon() {
        if (index <= 2) {
            return true
        }
        return false
    }

    function judgeIconValue() {
        switch (index) {
            case 0: return 'first'
            case 1: return 'second'
            case 2: return 'third'
            default: return 'third'
        }
    }
    function judgeIconColor() {
        switch (index) {
            case 0: return 'gold'
            case 1: return '#c0c0c0'
            case 2: return '#603912'
            default: return '#603912'
        }
    }

    return (
        <View className='rank_item'>
            <View className='left'>
                <View className='icon'>
                    {
                        isIcon()
                            ? <AtIcon prefixClass='icon' value={judgeIconValue()} size='20' color={judgeIconColor()}></AtIcon>
                            : <Text>{index + 1}</Text>
                    }
                </View>
                <Image className='avatar' src={item.avatar} mode='scaleToFill'></Image>
                <Text className='realname'>{item.nickname || ''}</Text>
            </View>
            <View className='right'>
                {
                    type==='total'
                    ? <Text>累计签到{item.signed_number || 0}次</Text>
                    : <Text>今天 {getDateTypeSeconds(item.create_time).substring(11)}</Text>
                }
            </View>
        </View>
    )
}

Index.defaultProps = {
    item: {},
    index: -1,
    type: 'time',// 默认显示手速榜样式 'time':手速榜 'total':总榜
}