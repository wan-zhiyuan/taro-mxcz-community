import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import CommentList from '../../../../components/CommentList'
import { useSelector } from '@tarojs/redux'

import './index.scss'

export default function Index(props) {

    const comment = useSelector(state => state.publish.informationDetail.comment)

    return (
        <View className='info_detail_comment'>
            <CommentList commentList={comment}/>
        </View>
    )
}
Index.defaultProps = {

}