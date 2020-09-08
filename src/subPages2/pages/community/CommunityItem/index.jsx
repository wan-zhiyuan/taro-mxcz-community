import Taro, { useState, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtIcon, AtRate } from 'taro-ui'

import './index.scss'

export default function Index(props) {

    const { community } = props

    /* 跳转社区详情 */
    function handleCommunityItem(e) {
        Taro.navigateTo({
            url: `/subPages2/pages/communityDetail/communityDetail?cid=${community.cid}`
        })
        e.stopPropagation() // 阻止点击事件继续冒泡
    }

    /* 打电话 */
    function handleCommunityPhone(e) {
        Taro.makePhoneCall({
            phoneNumber: String(community.phone)
        })
        e.stopPropagation() // 阻止点击事件继续冒泡
    }

    return (
        <View className='community_item' onClick={handleCommunityItem}>
            {
                community.pic
                    ? <Image className='community_pic' src={community.pic} mode='aspectFill'></Image> //只保证图片的短边能完全显示出来
                    : <Image className='community_pic_default'></Image>
            }
            <View className='community_right'>
                <View className='community_msg'>
                    <View className='msg_name'>
                        <Text className='community_name'>{community.name}</Text>
                        <Text className='community_address'>{community.address}</Text>
                    </View>

                    <View className='msg_other'>
                        <AtRate value={community.rate} size={10} />
                        <Text style={{ fontSize: '10px', lineHeight: '10px', color: '#666' }}>人气 {community.popul}</Text>
                    </View>
                </View>
                {
                    !!community.phone &&
                    <View className='community_phone' onClick={handleCommunityPhone}>
                        <AtIcon prefixClass='icon' value='dianhua' size='28' color='#00D8A0'></AtIcon>
                    </View>
                }
            </View>
        </View>
    )
}

Index.defaultProps = {
    community: {},
}
