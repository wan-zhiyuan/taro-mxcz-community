import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon, AtRate } from 'taro-ui'

import './index.scss'

export default function Index(props) {

    const { detail } = props

    function handlePhone() {
        Taro.makePhoneCall({
            phoneNumber: String(detail.contact_phone)
        })
    }

    return (
        <View className='detail_header'>
            <View className='community_box1'>
                <View className='box1_left'>
                    <Text className='community_name'>{detail.business_name}</Text>
                    <Text className='community_address'>{detail.address}</Text>
                </View>
                <View className='box1_right' onClick={handlePhone}>
                    <AtIcon prefixClass='icon' value='dianhua' size='28' color='#00D8A0'></AtIcon>
                </View>
            </View>

            <View className='community_box2'>
                <AtRate value={detail.star_number || 0} size={14} />
                <Text className='box2_right'>{`分享：${detail.share_number || 0} 浏览量：${detail.read_number || 0}`}</Text>
            </View>
        </View>
    )
}
Index.defaultProps = {
    detail: {},
}