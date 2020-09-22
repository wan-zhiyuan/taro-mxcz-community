import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { communityBusinessExtend } from '../../../../actions/community'
import { ToastSuccess } from '../../../../utils/toast'

import './index.scss'

export default function Index(props) {

    const { detail } = props

    /* 收藏 */
    function handleCollect() {
        let postData = {
            op: 'business_extend',
            target_id: detail.id,
            type: 4,
            content: '',
        }
        communityBusinessExtend(postData).then(res => {
            if (res.code === 200) {
                ToastSuccess('收藏成功')
            }
        })
    }

    /* 导航 */
    function handleNavi() {
        let lat = Number(detail.lat || 0)
        let lng = Number(detail.lng || 0)
        Taro.openLocation({
            latitude: lat, // 纬度，范围为-90~90，负数表示南纬
            longitude: lng, // 经度，范围为-180~180，负数表示西经
            scale: 8, // 缩放比例
            name: detail.business_name || '社区商户名称',
            address: detail.address || '社区商户地址',
            success: function (r) {
                console.log(r)
            }
        })
    }

    /* 联系我们 */
    function handlePhone() {
        Taro.makePhoneCall({
            phoneNumber: String(detail.phone)
        })
    }

    return (
        <View className='c_detail_footer'>
            <View className='footer_left'>
                <View className='footer_item' onClick={() => { Taro.switchTab({ url: '/pages/home/home' }) }}>
                    <AtIcon prefixClass='icon' value='shouye' size='26' color='#333'></AtIcon>
                    <Text className='item_txt'>首页</Text>
                </View>
                <View className='footer_item' onClick={handleCollect}>
                    <AtIcon prefixClass='icon' value='xingji' size='26' color='#333'></AtIcon>
                    <Text className='item_txt'>收藏</Text>
                </View>
                <View className='footer_item' onClick={handleNavi}>
                    <AtIcon prefixClass='icon' value='linggan' size='26' color='#333'></AtIcon>
                    <Text className='item_txt'>导航</Text>
                </View>
            </View>
            <View className='footer_right' onClick={handlePhone}>
                <Text>联系我们</Text>
            </View>
        </View>
    )
}

Index.defaultProps = {
    detail: {}
}