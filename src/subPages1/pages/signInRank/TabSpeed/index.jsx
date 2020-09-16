import Taro, { useState } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import RankItem from '../RankItem'

import './index.scss'

export default function Index(props) {

    const { height, speedList } = props

    return (
        <ScrollView
            className='tab_speed_scroll'
            scrollY
            scrollWithAnimation
            style={{ height: height }}
        >
            {
                speedList.map((item,idx)=>{
                    return (
                        <RankItem key={'index_'+idx} item={item} index={idx} />
                    )
                })
            }
        </ScrollView>
    )

}
Index.defaultProps = {
    height: 500,
    speedList: [1,2,3,4,5],
}