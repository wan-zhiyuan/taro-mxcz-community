import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'
import IconFont from '../../../../components/iconfont'

import './index.scss'
import { getDateTypeMinutes } from '../../../../utils/timer'

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
                        : 
                        // <View className='sale_avatar_default'></View>
                        <IconFont name='touxiang' size={70} />
                }
            </View>
            <View className='header_right'>
                <View className='right_box1'>
                    <Text className='sale_name'>{goodsDetail.sale_name || ''}</Text>
                    <Text className='sale_mobile'>{goodsDetail.sale_mobile || ''}</Text>
                </View>
                <Text className='update_time'>最后更新于 {getDateTypeMinutes(goodsDetail.update_time || 0)}</Text>
            </View>
        </View>
    )
}
Index.defaultProps = {

}