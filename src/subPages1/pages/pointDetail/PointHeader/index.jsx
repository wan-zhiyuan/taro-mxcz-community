import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import IconGift from '../../../images/icon_gift.png'

import './index.scss'

export default function Index(props) {

    const { } = props

    return (
        <View className='point_header'>
            <Text className='my_point'>我的积分</Text>
            <View className='header_box1'>
                <Image className='icon' src={IconGift} mode='scaleToFill'></Image>
                {/* <AtIcon prefixClass='icon' value='liwu' size='36'></AtIcon> */}
                <Text className='point'>66</Text>
            </View>
        </View>
    )
}
Index.defaultProps = {

}