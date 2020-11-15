import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import CommentList from '../../../../components/CommentList'

import './index.scss'

export default function Index(props) {

    const { comment } = props

    return (
        <View className='detail_comment'>
            <CommentList commentList={comment} />
        </View>
    )
}
Index.defaultProps = {
    comment: [],
}