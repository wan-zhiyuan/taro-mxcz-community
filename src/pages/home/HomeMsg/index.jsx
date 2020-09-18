import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

export default function Index(props) {

    const { } = props

    return (
        <View className='home_msg'>
            <View className='msg_data'>
                <AtIcon value='analytics' size='12px' color='#333'></AtIcon>
                <View style={{ marginLeft: '12px' }}>
                    <Text>浏览：</Text>
                    <Text style={{ color: '#ff0044' }}>2.19万</Text>
                </View>
                <View style={{ marginLeft: '20px' }}>
                    <Text>分享：</Text>
                    <Text style={{ color: '#ff0044' }}>93</Text>
                </View>
            </View>
            <View className='msg_weather'>
                天气：晴
                    </View>
        </View>
    )
}
Index.defaultProps = {

}