import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'
import CommentList from '../../../../components/CommentList'
import IconFont from '../../../../assets/iconfont'

import './index.scss'

/* 对社区的评论模块 */
export default function Index(props) {

    const commentList = useSelector(state => state.community.businessDetail.comment)

    return (
        <View className='comment_list'>
            {
                commentList.length === 0
                    ? <View className='comment_empty'>
                        <Text style={{marginBottom:Taro.pxTransform(30)}}>暂无评论</Text>
                        <IconFont name='meiyoushuju' size={200} />
                    </View>
                    : <CommentList commentList={commentList} needTitle={false} />
            }
        </View>
    )
}