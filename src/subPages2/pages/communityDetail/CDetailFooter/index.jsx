import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

export default function Index() {


    function handleCollect() {

        
    }

    function handleNavi() {
        Taro.navigateTo({
            url: '/subPages1/pages/myMap/myMap'
        })
    }

    return (
        <View className='c_detail_footer'>
            <View className='footer_left'>
                <View className='footer_item' onClick={()=>{Taro.switchTab({url:'/pages/home/home'})}}>
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

}