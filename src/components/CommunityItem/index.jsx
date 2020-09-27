import Taro, { useState, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtIcon, AtRate } from 'taro-ui'

import './index.scss'

export default function Index(props) {

    const { item } = props

    /* 跳转社区详情 */
    function handleCommunityItem(e) {
        Taro.navigateTo({
            url: `/subPages2/pages/communityDetail/communityDetail?target_id=${item.id}`
        })
        e.stopPropagation() // 阻止点击事件继续冒泡
    }

    /* 打电话 */
    function handleCommunityPhone(e) {
        Taro.makePhoneCall({
            phoneNumber: String(item.contact_phone)
        })
        e.stopPropagation() // 阻止点击事件继续冒泡
    }

    return (
        <View className='community_item' onClick={handleCommunityItem}>
            {
                item.logo
                    ? <Image className='community_pic' src={item.logo} mode='aspectFill'></Image> //只保证图片的短边能完全显示出来
                    : <Image className='community_pic_default'></Image>
            }
            <View className='community_right'>
                <View className='community_msg'>
                    <View className='msg_name'>
                        <Text className='community_name'>{item.business_name}</Text>
                        <Text className='community_address'>{item.address}</Text>
                    </View>

                    <View className='msg_other'>
                        <AtRate value={item.star_number} size={10} />
                        <Text style={{ fontSize: '10px', lineHeight: '10px', color: '#666' }}>人气 {item.read_number}</Text>
                    </View>
                </View>
                {
                    !!item.contact_phone &&
                    <View className='community_phone' onClick={handleCommunityPhone}>
                        <AtIcon prefixClass='icon' value='dianhua' size='28' color='#00D8A0'></AtIcon>
                    </View>
                }
            </View>
        </View>
    )
}

Index.defaultProps = {
    item: {},
}
