import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import IconFont from '../../../../../components/iconfont'

import './index.scss'

function Index(props) {

    const { goods } = props

    function handleClick() {
        console.log('点击了商品，跳转商品详情')
        Taro.navigateTo({
            url: `/subPages5/pages/goodsDetail/goodsDetail?mid=${goods.id}`
        })
    }

    function calGoodsPrice() {
        switch (Number(goods.pay_type)) {
            case 1:
                return `${goods.point_price || 0}积分`
            case 2:
                return `¥ ${goods.pay_price || 0}`
            case 4:
                return `¥ ${goods.pay_price || 0} + ${goods.point_price || 0}积分`
            default:
                return '未知购买类型'
        }
    }

    return (
        <View className='goods_item' onClick={handleClick}>
            <Image className='goods_img' src={goods.logo} mode='aspectFill'></Image>
            <View className='goods_info'>
                <View className='info_box1'>
                    <View className='goods_name'>{goods.title}</View>
                </View>
                <View className='info_box2'>
                    <Text className='goods_price'>{calGoodsPrice()}</Text>
                </View>
                <View className='info_box3'>
                    <View className='box3_left'>
                        {
                            // 有用户头像就显示用户头像，没有即显示灰色或者社区统一头像
                            goods.avatar
                                ? <Image className='user_avatar' src={goods.avatar} mode='scaleToFill'></Image>
                                : 
                                // <Image className='user_avatar_default' ></Image>
                                <IconFont name='touxiang' size={36} />
                        }
                        <Text className='user_name'>{goods.sale_name || ''}</Text>
                    </View>
                    <View className='box3_right'>
                        <Text className='cate_name'>{goods.cate_title}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
export default Taro.memo(Index, areEqual)
function areEqual(prevProps, nextProps) {
    /* 返回 true 时，不会触发 render，如果返回 false，则会 */
    return JSON.stringify(prevProps.goods) === JSON.stringify(nextProps.goods)
}
Index.defaultProps = {
    goods: {}
}