import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

export default function Index(props) {

    const { commentList, comment_number } = props

    return (
        <View className='publish_detail_comment'>
            <View>
                <Text>评论</Text>
                <Text>{`(${comment_number})`}</Text>
            </View>
        </View>
    )
}

Index.defaultProps = {
    commentList: [],
    comment_number: 0,
}