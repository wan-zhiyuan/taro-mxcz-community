import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

export default function Index(props) {

    const { orderItem } = props

    return (
        <View className='order_list_item'>
            <View className='header'>
                <View className='header_left'>
                    <AtIcon prefixClass='icon' value='dingdan' size='15' color='#FEBB40'></AtIcon>
                    <Text className='title'>订单详情</Text>
                </View>
                <Text className='order_id'>{ orderItem.id }</Text>
            </View>
        </View>
    )
}
Index.defaultProps = {

}