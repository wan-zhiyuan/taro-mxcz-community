import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { getDateTypeSeconds } from '../../utils/timer'

import './index.scss'

/* 评论项 */
export default function Index(props) {

    // 优化点：内容闲置显示字数，大于最大数的使用省略号显示
    const { item } = props

    return (
        <View className='comment_item'>
            <View className='item_left'>
                {
                    item.avatar
                        ? <Image className='avatar' src={item.avatar} mode='scaleToFill'></Image>
                        : <Image className='avatar_default'></Image>
                }
            </View>
            <View className='item_right'>
                <View className='right_box1'>
                    <View className='name_time'>
                        <Text className='realname'>{item.nickname || ''}</Text>
                        <Text className='create_time'>{getDateTypeSeconds(item.create_time || 0)}</Text>
                    </View>
                    <View className='reply' style={{ display: 'none' }}>
                        <Text>回复</Text>
                    </View>
                </View>
                <Text className='right_box2'>
                    <Text className='content'>{item.content || ''}</Text>
                </Text>
            </View>
        </View>
    )
}
Index.defaultProps = {
    item: {}
}