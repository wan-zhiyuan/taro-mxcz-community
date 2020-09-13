import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

export default function Index(props) {

    const { publishDetail } = props

    return (
        <View className='publish_detail_content'>

        </View>
    )
}

Index.defaultProps = {
    publishDetail: {},
}