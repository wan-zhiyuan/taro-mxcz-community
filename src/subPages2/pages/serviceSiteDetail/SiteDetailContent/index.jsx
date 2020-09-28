import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import IconFont from '../../../../components/iconfont'

import './index.scss'

export default function Index(props) {

    const { detail } = props

    function handleNavi() {
        let lat = Number(detail.lat || 0)
        let lng = Number(detail.lng || 0)
        Taro.openLocation({
            latitude: lat, // 纬度，范围为-90~90，负数表示南纬
            longitude: lng, // 经度，范围为-180~180，负数表示西经
            scale: 8, // 缩放比例
            name: detail.company_name || '公司名称',
            address: detail.address || '公司地址',
            success: function (r) {
                console.log(r)
            }
        })
    }

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
                    <View className='address_right' onClick={handleNavi}>导航</View>
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