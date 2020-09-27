import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import EnrollItem from '../EnrollItem'

import './index.scss'

export default function Index(props) {

    const { list } = props

    return (
        <View className='enroll_list'>
            {
                list.map((item, idx) => {
                    return (
                        <EnrollItem key={'index_' + idx} item={item} />
                    )
                })
            }
        </View>
    )
}
Index.defaultProps = {
    list: [],
}