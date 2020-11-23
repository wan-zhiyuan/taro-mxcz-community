import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
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
                {/* <Text className='detail_txt'>陆地冲浪板转向支架C7桥 弹簧桥 特价处理几套国产顶级的陆地冲浪板支架。特点转向幅度大，很轻松。目前国产转向支架里面最好的。现在特价230包邮。支架全新。淘宝里面最低价是400。用过不满意直接推给我。</Text> */}
                <Text className='detail_txt'>{goodsDetail.describe || ''}</Text>
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
                <View className='detail_extend'>
                    <Text>369人想要.</Text>
                    <Text>超赞40.</Text>
                    <Text>浏览6682</Text>
                </View>
            </View>

        </View>
    )
}
Index.defaultProps = {

}