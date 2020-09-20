import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'
import CommentList from '../../../components/CommentList'

import './index.scss'

export default function Index(props) {

    const comment = useSelector(state => state.publish.publishDetail.comment)

    /* 处理评论文本 */
    function handleComment() {
        // 仅显示100个评论，剩余显示省略号
    }

    return (
        <View className='publish_detail_comment'>
            <CommentList commentList={comment} />
        </View>
    )
}
Index.defaultProps = {}