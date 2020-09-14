import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

export default function Index(props) {

    const { commentList, comment_number } = props

    /* 处理评论文本 */
    function handleComment() {
        // 仅显示100个评论，剩余显示省略号
    }

    return (
        <View className='publish_detail_comment'>
            <View className='title'>
                <Text>评论</Text>
                <Text className='comment_num'>{`(${comment_number})`}</Text>
            </View>
            <View className='main'>
                {
                    commentList.map((item,idx)=>{
                        return (
                            <View className='comment_item' key={'index_'+idx}>
                                <View className='item_left'>
                                    <Image className='avatar'></Image>
                                </View>
                                <View className='item_right'>
                                    <View className='right_box1'>
                                        <Text className='realname'>游客</Text>
                                        <Text>2020.09.09 12:00</Text>
                                    </View>
                                    <Text className='right_box2'>
                                        <Text className='content'>
                                            这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论
                                        </Text>
                                    </Text>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}

Index.defaultProps = {
    commentList: [],
    comment_number: 0,
}