import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { getDateTypeSeconds } from '../../../../utils/timer'

import './index.scss'

export default function Index(props) {

    const { item, value } = props

    return (
        <View className='point_list_item'>
            <View className='left'>
                <Text className='title'>{item.type_name || 'type_name'}</Text>
                <Text className='time'>{getDateTypeSeconds(item.create_time || 0)}</Text>
            </View>
            <View className='right'>
                <Text className='point_num'>{`+${item.number || 0}`}</Text>
                <Text className='point_fen'>分</Text>
            </View>
        </View>
    )
}
Index.defaultProps = {
    item: {},
}