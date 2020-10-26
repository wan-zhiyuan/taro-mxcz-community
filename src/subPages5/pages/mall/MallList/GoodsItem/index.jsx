import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Goods1 from '../../../../images/goods_1.jpg'
import Goods2 from '../../../../images/goods_2.jpg'
import Goods3 from '../../../../images/goods_3.jpg'

import './index.scss'

function Index(props) {

    const { goods } = props

    function handleClick() {
        console.log('点击了商品，跳转商品详情')
        Taro.navigateTo({
            url: `/subPages5/pages/goodsDetail/goodsDetail`
        })
    }

    return (
        <View className='goods_item' onClick={handleClick}>
            <Image className='goods_img' src={Goods1} mode='aspectFill'></Image>
            <View className='goods_info'>
                <View className='info_box1'>
                    <View className='goods_name'>{'tempo的包抽纸餐巾抽纸tempo的包抽纸餐巾抽纸tempo的包抽纸餐巾抽纸tempo的包抽纸餐巾抽纸tempo的包抽纸餐巾抽纸tempo的包抽纸餐巾抽纸tempo的包抽纸餐巾抽纸'}</View>
                </View>
                <View className='info_box2'>
                    <Text className='goods_price'>￥49.90</Text>
                </View>
                <View className='info_box3'>
                    <Image className='user_avatar' src={Goods3} mode='scaleToFill'></Image>
                    <Text className='user_name'>麻利麻利哄</Text>
                </View>
            </View>
        </View>
    )
}
export default Taro.memo(Index,areEqual)
function areEqual(prevProps, nextProps) {
    /* 返回 true 时，不会触发 render，如果返回 false，则会 */
    return JSON.stringify(prevProps.goods) === JSON.stringify(nextProps.goods)
}
Index.defaultProps = {
    goods:{}
}