import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { getDateTypeMinutes } from '../../utils/timer'

import './index.scss'

export default function Index(props) {

    const { item } = props

    function handleInfoItem() {
        Taro.navigateTo({
            url: `/subPages3/pages/infoDetail/infoDetail?target_id=${item.id}`
        })
    }

    return (
        <View className='info_list_item' onClick={handleInfoItem}>
            <View className='item_box'>
                <Text className='item_title'>{item.title || ''}</Text>
                <View className='item_detail'>
                    <View className='detail_left'>
                        <Text>梦想成真社区活动</Text>
                        <View className='detail_time'>
                            <AtIcon prefixClass='icon' value='lishi' size='14' color='#00D8A0'></AtIcon>
                            <Text style={{ marginLeft: Taro.pxTransform(6) }}>{getDateTypeMinutes(item.create_time || 0)}发布</Text>
                        </View>
                    </View>
                    <Text className='detail_read'>{item.read_number || 0}阅读</Text>
                </View>
            </View>
        </View>
    )
}
Index.defaultProps = {
    item: {}
}