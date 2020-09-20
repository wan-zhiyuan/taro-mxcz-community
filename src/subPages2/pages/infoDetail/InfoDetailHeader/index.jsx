import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'
import { getDateTypeMinutes } from '../../../../utils/timer'

import './index.scss'

export default function Index(props) {

    const {  } = props

    const infoDetail = useSelector(state => state.publish.informationDetail.basic)

    return (
        <View className='info_detail_header'>
            <View className='header_box1'>
                <Text className='title'>{infoDetail.title || ''}</Text>
                <View className='msg'>
                    <Text className='read'>{infoDetail.read_number || 0}阅读量</Text>
                    <Text className='comment'>{infoDetail.comment_number || 0}评论</Text>
                    <Text className='cate_name'>{infoDetail.cate_name || ''}</Text>
                </View>
            </View>
            <View className='header_box2'>
                <Text className='activity'>梦想成真社区活动</Text>
                <Text className='create_time'>{getDateTypeMinutes(infoDetail.create_time || 0)} 发布</Text>
            </View>
        </View>
    )
}
Index.defaultProps = {

}