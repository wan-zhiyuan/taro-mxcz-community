import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

export default function Index(props) {

    const {  } = props

    return (
        <View className='locate_footer'>
            <View className='footer_box'>
                <Text style={{marginLeft:Taro.pxTransform(24)}}>入驻社区服务站</Text>
            </View>
            <View className='locate_btn'>
                <Text>申请入驻</Text>
            </View>
        </View>
    )
}
Index.defaultProps = {

}