import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

export default function Index(props) {

    const {  } = props

    return (
        <View className='info_detail_header'>
            <View className='header_box1'>
                <Text className='title'>李荣浩的演唱会</Text>
                <View className='msg'>
                    <Text className='read'>386阅读量</Text>
                    <Text className='comment'>8评论</Text>
                    <Text className='cate_name'>演唱会</Text>
                </View>
            </View>
            <View className='header_box2'>
                <Text className='activity'>梦想成真社区活动</Text>
                <Text className='create_time'>2020-09-30 12:00 发布</Text>
            </View>
        </View>
    )
}
Index.defaultProps = {

}