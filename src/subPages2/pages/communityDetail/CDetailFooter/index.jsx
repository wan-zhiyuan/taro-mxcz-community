import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

export default function Index(props) {


    const { community } = props

    function handleCollect() {


    }

    function handleNavi() {
        

        // 1、先使用腾讯位置服务逆解析出经纬度
        // 2、在使用openLocation打开微信自带位置导航页面
        
        Taro.openLocation({
            latitude: 31, // 纬度，范围为-90~90，负数表示南纬
            longitude: 121, // 经度，范围为-180~180，负数表示西经
            scale: 8, // 缩放比例
            name: "测试",
            address: "测试详细地址",
            success: function (r) {
                console.log(r)
            }
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
            <View className='footer_right'>
                <Text>联系我们</Text>
            </View>
        </View>
    )
}

Index.defaultProps = {
    community: {}
}