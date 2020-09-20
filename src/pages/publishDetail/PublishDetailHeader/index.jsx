import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'

import './index.scss'

export default function Index() {

    const publishDetail = useSelector(state => state.publish.publishDetail.basic)

    return (
        <View className='publish_detail_header'>
            {
                true
                    ? <Image className='user_avatar' src={publishDetail.avatar} mode='scaleToFill'></Image>
                    : <Image className='user_avatar_default'></Image>
            }
            <View className='header_box'>
                <Text className='user_realname'>{publishDetail.nickname || ''}</Text>
                <View className='cate_name'>{publishDetail.cate_name || ''}</View>
            </View>
        </View>
    )
}

Index.defaultProps = {}