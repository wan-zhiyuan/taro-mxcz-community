import Taro, { useState } from '@tarojs/taro'
import { View, RichText } from '@tarojs/components'
import GoodsDetailImg1 from '../../../images/goods_detail_img.jpg'
import { useSelector } from '@tarojs/redux'

import './index.scss'

export default function Index(props) {

    const { } = props

    const goodsDetail = useSelector(state => state.mall.goodsDetail)

    const [detailPic, setDetailPic] = useState([
        GoodsDetailImg1,
        GoodsDetailImg1,
    ])

    function calGoodsPrice() {
        switch (Number(goodsDetail.pay_type)) {
            case 1:
                return `${goodsDetail.point_price || 0}积分`
            case 2:
                return `¥ ${goodsDetail.pay_price || 0}`
            case 4:
                return `¥ ${goodsDetail.pay_price || 0} + ${goodsDetail.point_price || 0}积分`
            default:
                return '未知购买类型'
        }
    }

    return (
        <View className='detail_content'>
            <View className='goods_price'>
                <Text className='price_1'>{calGoodsPrice()}</Text>
                <Text className='price_2'>市场价：￥{goodsDetail.market_price || 0}</Text>
            </View>
            <View className='goods_detail'>
                {/* <Text className='detail_txt'>{goodsDetail.describe || ''}</Text> */}
                <RichText className='detail_txt' nodes={goodsDetail.describe || ''} />
                {
                    goodsDetail &&
                    <View className='detail_img'>
                        {
                            goodsDetail.images.split('|').map((item, idx) => {
                                return (
                                    <Image className='detail_img_item' src={item} mode='widthFix' key={'index_' + idx} />
                                )
                            })
                        }
                    </View>
                }
            </View>

        </View>
    )
}
Index.defaultProps = {

}