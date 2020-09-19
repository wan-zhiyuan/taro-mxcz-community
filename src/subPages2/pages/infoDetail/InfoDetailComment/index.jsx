import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import CommentItem from '../../../../components/CommentItem'
import Divider from '../../../../components/DividerComponent'

import './index.scss'

export default function Index(props) {

    const { } = props
    const [comment, setComment] = useState([1, 2, 3, 4, 5])

    return (
        <View className='info_detail_comment'>
            <View className='comment_title'>
                <View className='placeholder'></View>
                <Text style={{ marginLeft: Taro.pxTransform(12) }}>全部评论</Text>
            </View>
            <View className='comment_content'>
                {
                    comment.map((item, idx) => {
                        return (
                            <CommentItem key={'indx_' + idx} item={item} />
                        )
                    })
                }
            </View>
            {/* 分割线 */}
            <Divider />
        </View>
    )
}
Index.defaultProps = {

}