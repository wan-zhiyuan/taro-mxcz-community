import Taro, { useState } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { ClGrid } from "mp-colorui";
import Goods1 from '../../../images/goods_1.jpg'
import Goods2 from '../../../images/goods_2.jpg'
import Goods3 from '../../../images/goods_3.jpg'
import GoodsItem from './GoodsItem'

import './index.scss'

export default function Index(props) {

    const { } = props

    const [goods, setGoods] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    return (
        <View className='mall_list'>
            <View className='bg_1'></View>
            <View className='bg_2'></View>
            <View className='goods_list'>
                {
                    goods.map((item, idx) => {
                        return (
                            <GoodsItem goods={item} key={'index_' + idx} />
                        )
                    })
                }
            </View>
        </View>
    )
}
Index.defaultProps = {

}