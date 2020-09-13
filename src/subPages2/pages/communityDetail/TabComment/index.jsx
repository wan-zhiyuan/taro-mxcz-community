import Taro, { useState, } from '@tarojs/taro'
import { View, MovableArea, MovableView } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

/* 对社区的评论模块 */
export default function Index(props) {

    const[comment, setComment] = useState([1,2,3,4,5])

    return (
        <View className='comment_list'>

        </View>
    )
}