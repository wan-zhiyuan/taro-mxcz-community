import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import CommentItem from '../CommentItem'
import Divider from '../DividerComponent'

import './index.scss'

/* 评论列表 */
export default function Index(props) {

    const { commentList } = props

    return (
        <View className='comment'>
            <View className='comment_title'>
                <View className='placeholder'></View>
                <Text style={{ marginLeft: Taro.pxTransform(12) }}>全部评论</Text>
                <Text className='comment_num'>{`(${commentList.length})`}</Text>
            </View>
            <View className='comment_list'>
                {
                    commentList.map((item, idx) => {
                        return (<CommentItem key={'index_' + idx} item={item} />)
                    })
                }
            </View>
            <Divider />
        </View>

    )
}
Index.defaultProps = {
    commentList: []
}