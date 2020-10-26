import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import IconFont from '../../../../components/iconfont'

import './index.scss'

export default function Index(props) {

    const { } = props

    return (
        <View className='detail_footer'>
            <View className='footer_left'>
                <View className='footer_item' onClick={() => { Taro.switchTab({ url: '/pages/home/home' }) }}>
                    <IconFont name='dianzan' size={52} color='#333'/>
                    <Text className='item_txt'>点赞</Text>
                </View>
                <View className='footer_item' onClick={() => { Taro.switchTab({ url: '/pages/home/home' }) }}>
                    <IconFont name='liuyan' size={52} color='#333'/>
                    <Text className='item_txt'>留言</Text>
                </View>
                <View className='footer_item' onClick={() => { Taro.switchTab({ url: '/pages/home/home' }) }}>
                    <IconFont name='weishoucang' size={50} color='#333'/>
                    <Text className='item_txt'>收藏</Text>
                </View>
            </View>
            <View className='footer_right'>
                <Text>我想要</Text>
            </View>
        </View>
    )
}
Index.defaultProps = {

}