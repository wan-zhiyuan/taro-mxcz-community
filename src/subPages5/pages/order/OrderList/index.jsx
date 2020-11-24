import Taro from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import OrderListItem from '../OrderListItem'

import './index.scss'

export default function Index(props) {

    const { list } = props

    return (
        <View className='order_list'>
            {
                list.length === 0
                    ?
                    null
                    :
                    <ScrollView
                        style={{ height: `100vh` }}
                        scrollY
                        scrollWithAnimation
                    >
                        {
                            list.map((item, idx) => {
                                return (
                                    <OrderListItem key={'index_' + idx} orderItem={item} />
                                )
                            })
                        }
                        <View style={{width:'100%',height:'66px'}}></View>
                    </ScrollView>
            }

        </View>
    )
}
Index.defaultProps = {
    list: []
}