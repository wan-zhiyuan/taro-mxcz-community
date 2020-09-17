import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

export default function Index(props) {

    const { item, value } = props

    return (
        <View className='point_list_item'>
            <View className='left'>
                <Text className='title'>每日签到</Text>
                <Text className='time'>2020-09-11 01:44:15</Text>
            </View>
            <View className='right'>
                <Text className='point_num'>{`+${value}`}</Text>
                <Text className='point_fen'>分</Text>
            </View>
        </View>
    )
}
Index.defaultProps = {
    item: {},
}