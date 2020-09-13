import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

export default function Index(props) {

    function handleCollect() {

    }
    function handleRepost() {

    }

    return (
        <View className='publish_detail_footer'>
            <View className='footer_left'>
                <View className='footer_item' onClick={() => { Taro.switchTab({ url: '/pages/home/home' }) }}>
                    <AtIcon prefixClass='icon' value='shouye' size='26' color='#333'></AtIcon>
                    <Text className='item_txt'>首页</Text>
                </View>
                <View className='footer_item' onClick={handleCollect}>
                    <AtIcon prefixClass='icon' value='xingji' size='26' color='#333'></AtIcon>
                    <Text className='item_txt'>收藏</Text>
                </View>
                <View className='footer_item' onClick={handleRepost}>
                    <AtIcon prefixClass='icon' value='linggan' size='26' color='#333'></AtIcon>
                    <Text className='item_txt'>转发</Text>
                </View>
            </View>
            <View className='footer_right'>
                我要评论
                </View>
        </View>
    )
}