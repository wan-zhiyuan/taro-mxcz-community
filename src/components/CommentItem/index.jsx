import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import './index.scss'

export default function Index(props) {

    const { item } = props

    return (
        <View className='comment_item'>
            <View className='item_left'>
                <Image className='avatar'></Image>
            </View>
            <View className='item_right'>
                <View className='right_box1'>
                    <View className='name_time'>
                        <Text className='realname'>游客</Text>
                        <Text className='create_time'>2020-09-09 12:00:43</Text>
                    </View>
                    <View className='reply'>
                        <Text>回复</Text>
                    </View>
                </View>
                <Text className='right_box2'>
                    <Text className='content'>
                        这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论
                    </Text>
                </Text>
            </View>
        </View>
    )
}
Index.defaultProps = {
    item: {}
}