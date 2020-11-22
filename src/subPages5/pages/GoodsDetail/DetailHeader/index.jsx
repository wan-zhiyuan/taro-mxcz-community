import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'

import './index.scss'

export default function Index(props) {

    const { } = props

    const goodsDetail = useSelector(state => state.mall.goodsDetail)
    const userInfo = useSelector(state => state.user.userInfo)

    return (
        <View className='detail_header'>
            <View className='header_left'>
                {
                    !!goodsDetail.avatar
                        ? <Image className='sale_avatar' src={goodsDetail.avatar || ''} mode='scaleToFill'></Image>
                        : <View className='sale_avatar_default'></View>
                }

            </View>
            <View className='header_right'>
                <Text className='sale_name'>{goodsDetail.sale_name || ''}</Text>
                <Text className='sale_msg'>2小时前来过 发布于韶关</Text>
            </View>
        </View>
    )
}
Index.defaultProps = {

}