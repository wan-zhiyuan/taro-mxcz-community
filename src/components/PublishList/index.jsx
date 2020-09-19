import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PublishItem from '../PublishItem'

import './index.scss'

/* 发布信息列表 */
export default function Index(props) {

    const { list } = props

    return (
        <View classNam='publist_list'>
            {
                list.map((item, idx) => {
                    return (
                        <PublishItem key={'index_' + idx} publishItem={item} />
                    )
                })
            }
        </View>
    )
}

Index.defaultProps = {
    list: []
}