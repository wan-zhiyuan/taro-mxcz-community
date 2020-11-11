import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

export default function Index(props) {

    const { } = props

    return (
        <View className='detail_header'>
            <View className='header_left'>
                <Image className='user_avatar'></Image>
            </View>
            <View className='header_right'>
                <Text className='user_name'></Text>
            </View>
        </View>
    )
}
Index.defaultProps = {

}