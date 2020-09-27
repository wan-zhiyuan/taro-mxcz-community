import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import IconFont from '../iconfont'
import CommunityItem from '../CommunityItem'

import './index.scss'

export default function Index(props) {

    const { list } = props

    return (
        <View className='community_list'>
            {
                list.length === 0
                    ? (
                        <View className='empty'>
                            <IconFont name='meiyoushuju' size={200} />
                        </View>
                    ) : (
                        <View>
                            {
                                list.map((item, idx) => {
                                    return (
                                        <CommunityItem key={'index_' + idx} item={item} />
                                    )
                                })
                            }
                        </View>
                    )
            }
        </View>
    )
}
Index.defaultProps = {
    list: []
}