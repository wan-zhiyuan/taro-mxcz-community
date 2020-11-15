import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'

import './index.scss'

export default function Index(props) {

    const { } = props

    const userInfo = useSelector(state => state.user.userInfo)

    return (
        <View className='detail_header'>
            <View className='header_left'>
                {
                    !!userInfo.nickname
                    ? <Image className='user_avatar' src={userInfo.avatar || ''} mode='scaleToFill'></Image>
                    : <View className='user_avatar_default'></View>
                }
                
            </View>
            <View className='header_right'>
                <Text className='user_name'>mx8787878787</Text>
                <Text className='user_msg'>2小时前来过 发布于韶关</Text>
            </View>
        </View>
    )
}
Index.defaultProps = {

}