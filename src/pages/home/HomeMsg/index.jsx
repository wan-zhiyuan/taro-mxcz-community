import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { useSelector } from '@tarojs/redux'

import './index.scss'

export default function Index(props) {

    const { } = props

    const homeIndex = useSelector(state => state.home.homeIndex)

    function caleBrowseNumber() {
        console.log('caleBrowseNumber()')
        let num = Number(homeIndex.browse_number || 0)
        if (num >= 10000) {
            return `${num/10000}万`
        } else {
            return num
        }
    }
    function caleCommunityNumber() {
        let num = Number(homeIndex.community_number || 0)
        if (num >= 10000) {
            return `${num/10000}万`
        } else {
            return num
        }
    }

    return (
        <View className='home_msg'>
            <View className='msg_data'>
                <AtIcon value='analytics' size='12px' color='#333'></AtIcon>
                <View style={{ marginLeft: '12px' }}>
                    <Text>浏览量：</Text>
                    <Text style={{ color: '#ff0044' }}>{caleBrowseNumber()}</Text>
                </View>
                <View style={{ marginLeft: '20px' }}>
                    <Text>商户数：</Text>
                    <Text style={{ color: '#ff0044' }}>{caleCommunityNumber()}</Text>
                </View>
            </View>
            <View className='msg_weather'>
                天气：晴
                    </View>
        </View>
    )
}
Index.defaultProps = {

}