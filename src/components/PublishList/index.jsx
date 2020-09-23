import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PublishItem from '../PublishItem'
import Divider from '../DividerComponent'
import IconFont from '../../assets/iconfont'

import './index.scss'

/* 发布信息列表 */
export default function Index(props) {

    const { list, hasMore } = props

    return (
        <View>
            <View
                className='publish_list'
                style={list.length === 0
                    ? { backgroundColor: '#fff' }
                    : { backgroundColor: '#f2f2f2' }}>
                {
                    list.length === 0
                        ? <View className='empty'>
                            <IconFont name='meiyoushuju' size={200} />
                        </View>
                        : <View>
                            {
                                list.map((item, idx) => {
                                    return (
                                        <PublishItem key={'index_' + idx} publishItem={item} />
                                    )
                                })
                            }
                        </View>
                }
            </View>
            {
                // 默认因为hasMore为true所以是不显示的
                (list.length > 0 && !hasMore) &&
                <Divider />
            }
        </View>

    )
}

Index.defaultProps = {
    list: [],
    hasMore: true,
}