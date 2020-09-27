import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import ActivityItem from '../ActivityItem'
import Divider from '../DividerComponent'

import './index.scss'

export default function Index(props) {

    const { list, from, } = props

    return (
        <View className='activity_list'>
            {
                list.map((item, idx) => {
                    return (
                        <ActivityItem key={'index_' + idx} item={item} from={from}/>
                    )
                })
            }
            {/* no mores */}
            {/* <View className='divider'>
                <Divider />
            </View> */}
        </View>
    )
}
Index.defaultProps = {
    list: [],
    from: ''
}
