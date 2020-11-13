import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import GoodsDetailImg1 from '../../../images/goods_detail_img.jpg'

import './index.scss'

export default function Index(props) {

    const { } = props

    const [detailPic, setDetailPic] = useState([
        GoodsDetailImg1,
        GoodsDetailImg1,
    ])

    return (
        <View className='detail_content'>
            <View className='goods_price'>
                <Text className='price_1'>￥</Text>
                <Text className='price_2'>230</Text>
                <Text className='price_3'>$600</Text>
                <Text className='price_4'>包邮</Text>
            </View>
            <View className='goods_detail'>
                <Text className='detail_txt'>陆地冲浪板转向支架C7桥 弹簧桥 特价处理几套国产顶级的陆地冲浪板支架。特点转向幅度大，很轻松。目前国产转向支架里面最好的。现在特价230包邮。支架全新。淘宝里面最低价是400。用过不满意直接推给我。</Text>
                {
                    (detailPic && detailPic.length > 0) &&
                    <View className='detail_img'>
                        {
                            detailPic.map((item, idx) => {
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