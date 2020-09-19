import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PointListItem from '../PointListItem'
import Divider from '../../../../components/DividerComponent'

import './index.scss'

export default function Index(props) {

    const { pointList, hasMore } = props

    return (
        <View className='point_list'>
            {
                pointList.map((item, idx) => {
                    return (
                        <PointListItem key={'index_' + idx} item={item} value={item} />
                    )
                })
            }
            {
                !hasMore &&
                <Divider content='NO MORE' />
            }

        </View>
    )
}
Index.defaultProps = {
    pointList: [],
}