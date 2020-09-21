import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import IconFont from '../../../../assets/iconfont'

import './index.scss'

export default function Index(props) {

    const { detail } = props

    return (
        <View className='site_detail_content'>
            <View className='phone_address'>
                <View className='phone'>
                    <Text className='phone_label'>电话</Text>
                    <Text className='phone_value'>{detail.company_phone || 0}</Text>
                </View>
                <View className='address'>
                    <View className='address_left'>
                        <IconFont name='dingwei' size={30} />
                        <Text style={{ marginLeft: Taro.pxTransform(8) }}>{detail.address || ''}</Text>
                    </View>
                    <View className='address_right'>导航</View>
                </View>
            </View>
            <View className='memo'>
                <View className='memo_title'>
                    <Text className='title'>商家介绍</Text>
                </View>
                <View className='memo_content'>
                    <Text className='content' space="nbsp" decode={true}>{'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + detail.memo || ''}</Text>
                </View>
            </View>
        </View>
    )
}
Index.defaultProps = {
    detail: {}
}