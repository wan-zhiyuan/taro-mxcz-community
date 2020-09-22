import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import CommunityItem from '../CommunityItem'

import './index.scss'

export default function Index(props) {

    const { list } = props

    return (
        <View className='community_list'>
            {
                list.map((item, idx) => {
                    return (
                        <CommunityItem key={'index_' + idx} community={item} />
                    )
                })
            }
        </View>
    )
}
Index.defaultProps = {
    list: []
}