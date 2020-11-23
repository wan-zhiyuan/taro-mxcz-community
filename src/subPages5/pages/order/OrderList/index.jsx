import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import OrderListItem from '../OrderListItem'

import './index.scss'

export default function Index(props) {

    const { list } = props

    return (
        <View className='order_list'>
            {
                list.map((item,idx)=>{
                    return (
                        <OrderListItem key={'index_'+idx}/>
                    )
                })
            }
        </View>
    )
}
Index.defaultProps = {
    list:[]
}