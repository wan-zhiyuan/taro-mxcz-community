import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

export default function Index(props) {

    const { } = props

    return (
        <View className='info_list_item'>
            <View className='item_box'>
                <Text className='item_title'>上海市浦东新区志愿者服务队捐款活动</Text>
                <View className='item_detail'>
                    <View className='detail_left'>
                        <Text>梦想成真社区活动</Text>
                        <View className='detail_time'>
                            <AtIcon prefixClass='icon' value='lishi' size='14' color='#00D8A0'></AtIcon>
                            <Text style={{marginLeft:Taro.pxTransform(6)}}>2020-08-07 13:13发布</Text>
                        </View>
                    </View>
                    <Text className='detail_read'>222阅读</Text>
                </View>
            </View>
        </View>
    )
}
Index.defaultProps = {

}