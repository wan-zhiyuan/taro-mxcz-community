import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

export default function Index(props) {

    const { item } = props

    function handleClick() {
        console.log('显示活动核销码页面')
    }

    return (
        <View className='enroll_item'>

        </View>
    )
}
Index.defaultProps = {
    item: {},
}