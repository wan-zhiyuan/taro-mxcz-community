import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { useSelector } from '@tarojs/redux'

import './index.scss'

export default function Index() {

    // 优化点：闲置显示最多的点赞用户数
    const like = useSelector(state => state.publish.informationDetail.like)

    return (
        <View className='info_detail_like'>
            <View className='like'>
                <View className='left'>
                    <AtIcon prefixClass='icon' value='dianzan' size='20' color='#00D8A0'></AtIcon>
                </View>
                <View className='right'>
                    {
                        like.map((item, idx) => {
                            return (
                                <View className='item_like' key={'index_' + idx}>
                                    <Image className='like_avatar' src={item.avatar} mode='scaleToFill'></Image>
                                </View>
                            )
                        })
                    }
                </View>
            </View>

        </View>
    )
}