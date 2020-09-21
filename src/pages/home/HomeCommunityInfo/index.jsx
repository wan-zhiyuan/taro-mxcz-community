import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import './index.scss'

export default function Index(props) {

    const { } = props

    function naviToPublishCate() {
        Taro.navigateTo({
            url: '/subPages3/pages/category/category'
        })
    }

    function naviToCommunityInfo() {
        Taro.navigateTo({
            url: '/subPages2/pages/information/information'
        })
    }

    return (
        <View className='home_community_info'>
            <View className='title'>
                <Text style={{ marginLeft: '15px' }}>社区资讯</Text>
            </View>
            <View className='content'>
                <Image
                    className='content_item'
                    src={'http://source.bingu.cn/community_information_1.png'}
                    mode='scaleToFill'
                    onClick={naviToPublishCate}></Image>
                <Image
                    className='content_item'
                    src={'http://source.bingu.cn/community_information_2.png'}
                    mode='scaleToFill'
                    onClick={naviToCommunityInfo}></Image>
            </View>
        </View>
    )
}
Index.defaultProps = {

}