import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

export default function Index(props) {

    const { publishDetail } = props

    return (
        <View className='publish_detail_header'>
            {
                true
                    ? <Image className='user_avatar'></Image>
                    : <Image className='user_avatar_default'></Image>
            }
            <View className='header_box'>
                <Text className='user_realname'>姚弛</Text>
                <View className='cate_name'>{publishDetail.cate_name || ''}</View>
            </View>
        </View>
    )
}

Index.defaultProps = {
    publishDetail: {},
}