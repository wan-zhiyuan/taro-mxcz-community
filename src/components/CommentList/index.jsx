import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import CommentItem from '../CommentItem'
import Divider from '../DividerComponent'
import IconFont from '../iconfont'

import './index.scss'

/* 评论列表 */
export default function Index(props) {

    const { commentList, needTitle } = props

    return (
        <View className='comment'>
            {
                needTitle &&
                <View className='comment_title'>
                    <View className='placeholder'></View>
                    <Text style={{ marginLeft: Taro.pxTransform(12) }}>全部评论</Text>
                    <Text className='comment_num'>{`(${commentList.length})`}</Text>
                </View>
            }
            <View className='comment_list'>
                {
                    commentList.length > 0
                        ?
                        <View>
                            {
                                commentList.map((item, idx) => {
                                    return (<CommentItem key={'index_' + idx} item={item} />)
                                })
                            }
                        </View>
                        :
                        <View className='empty'>
                            <IconFont name='meiyoushuju' size={100} color='#ccc' />
                            <Text className='empty_txt'>暂无评论</Text>
                        </View>
                }

            </View>
            <Divider />
        </View>

    )
}
Index.defaultProps = {
    commentList: [],
    needTitle: true,
}