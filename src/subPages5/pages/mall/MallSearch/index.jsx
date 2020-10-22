import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

export default function Index(props) {

    const { } = props

    return (
        <View className='mall_search'>
            <AtIcon value='search' size='14px' color='#666'></AtIcon>
            <Text style={{ marginLeft: '4px' }}>请输入您想要搜索的内容</Text>
        </View>
    )
}
Index.defaultProps = {

}