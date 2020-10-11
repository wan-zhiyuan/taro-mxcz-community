import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import ActivityItem from '../ActivityItem'
import Divider from '../DividerComponent'
import IconFont from '../../components/iconfont'

import './index.scss'

export default function Index(props) {

    const { list, from, } = props

    return (
        <View className='activity_list'>
            {
                list.length === 0
                    ?
                    <View className='empty'>
                        <IconFont name='meiyoushuju' size={200} color='#666' />
                        <Text className='empty_txt'>暂无数据</Text>
                    </View>
                    :
                    <View className='list'>
                        {
                            list.map((item, idx) => {
                                return (
                                    <ActivityItem key={'index_' + idx} item={item} from={from} />
                                )
                            })
                        }
                    </View>
            }
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
