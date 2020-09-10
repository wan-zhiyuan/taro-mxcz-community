import Taro, { useState, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'

import './communityComment.scss'

export default function CommunityComment() {

    return (
        <View className='community_comment_index'>
            社区评论页面
        </View>
    )
}
CommunityComment.config = {
    navigationBarTitleText: '评论',
}