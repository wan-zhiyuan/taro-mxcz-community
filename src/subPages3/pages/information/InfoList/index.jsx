import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import InfoListItem from '../InfoListItem'

import './index.scss'

export default function Index(props) {

    const { infoList } = props

    return (
        <View className='info_list'>
            {
                infoList.map((item, idx) => {
                    return (
                        <InfoListItem key={'index_' + idx} item={item} />
                    )
                })
            }
        </View>
    )
}
Index.defaultProps = {
    infoList: []
}
