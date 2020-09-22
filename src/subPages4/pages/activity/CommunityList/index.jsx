import Taro, { useState, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'

import './index.scss'
import { isEmpty } from '../../../../utils/is'

export default function Index() {

    const [communityList, setCommunityList] = useState([
        { cid: 1, name: '浦东1站', pic: '', },
        { cid: 2, name: '浦东2站', pic: '', },
        { cid: 3, name: '浦东3站', pic: '', },
        { cid: 4, name: '浦东4站', pic: '', },
        { cid: 5, name: '浦东5站', pic: '', },
        { cid: 6, name: '浦东1站', pic: '', },
        { cid: 7, name: '浦东2站', pic: '', },
        { cid: 8, name: '浦东3站', pic: '', },
        { cid: 9, name: '浦东4站', pic: '', },
        { cid: 10, name: '浦西5站', pic: '', },
        { cid: 10, name: '浦西5站', pic: '', },
        { cid: 10, name: '浦西5站', pic: '', },
    ])

    function handleCommunity(item) {
        Taro.navigateTo({
            url: `/subPages4/pages/activitySub/activitySub?cid=${item.cid}&name=${item.name}`
        })
    }

    return (
        <View className='community_list'>
            {
                communityList.map((item,idx)=>{
                    return (
                        <View key={'index_'+idx} 
                        className='community_item'
                        onClick={()=>{handleCommunity(item)}}
                        >
                            {
                                isEmpty(item.pic)
                                ? <Image className='item_pic_default'></Image>
                                : <Image className='item_pic' src={item.pic} mode='scaleToFill'></Image>
                            }
                            <Text className='item_name'>{item.name}</Text>
                        </View>
                    )
                })
            }
        </View>
    )
}
