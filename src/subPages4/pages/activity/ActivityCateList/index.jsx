import Taro, { useState } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { isEmpty } from '../../../../utils/is'

import './index.scss'

export default function Index(props) {

    const { activityCate } = props

    function handleCommunity(item) {
        Taro.navigateTo({
            url: `/subPages4/pages/activitySub/activitySub?cid=${item.id}&title=${item.title}`
        })
    }

    return (
        <View className='cate_list'>
            {
                activityCate.map((item,idx)=>{
                    return (
                        <View key={'index_'+idx} 
                        className='cate_item'
                        onClick={()=>{handleCommunity(item)}}
                        >
                            {
                                isEmpty(item.image)
                                ? <Image className='item_pic_default'></Image>
                                : <Image className='item_pic' src={item.image} mode='scaleToFill'></Image>
                            }
                            <Text className='item_name'>{item.title}</Text>
                        </View>
                    )
                })
            }
        </View>
    )
}
Index.defaultProps = {
    activityCate: []
}
