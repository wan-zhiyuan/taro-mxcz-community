import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import InformationItem from '../InformationItem'

import './index.scss'

export default function Index(props) {

    const { list } = props

    return (
        <View className='info_list'>
            {
                list.map((item, idx) => {
                    return (
                        <InformationItem key={'index_' + idx} item={item} />
                    )
                })
            }
        </View>
    )
}
Index.defaultProps = {
    list: []
}
