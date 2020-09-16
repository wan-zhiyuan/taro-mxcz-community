import Taro, { useState } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import RankItem from '../RankItem'

import './index.scss'

export default function Index(props) {

    const { height, generalList } = props

    return (
        <ScrollView
            className='tab_general_scroll'
            scrollY
            scrollWithAnimation
            style={{ height: height }}
        >
            {
                generalList.map((item,idx)=>{
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
    generalList: [1,2,3]
}