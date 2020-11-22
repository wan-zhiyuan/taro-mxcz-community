import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import IconFont from '../../../../components/iconfont'
import { useSelector } from '@tarojs/redux'
import { postOrder, postPay } from '../../../../actions/mall'

import './index.scss'
import { isEmpty } from '../../../../utils/is'
import { Toast } from '../../../../utils/toast'

export default function Index(props) {

    const { } = props

    const goodsDetail = useSelector(state => state.mall.goodsDetail)

    async function handlePay() {
        let postDataOrder = { mid: goodsDetail.id, num: 1 }
        const resOrder = await postOrder(postDataOrder)
        if (resOrder.code !== 200) {
            return
        }
        let oid = resOrder.data.oid
        let postDataPay = { oid }
        const resPay = await postPay(postDataPay)
        if (resPay.code !== 200) {
            return
        }
        const dPay = resPay.data.data
        console.log('#############')
        console.log(dPay)
        console.log('pay_type:' + goodsDetail.pay_type)

        if (goodsDetail.pay_type === 1) {
            Toast('购买成功')
        } else {
            if (isEmpty(dPay)) {
                console.log('支付失败')
                Toast('支付失败')
            } else {
                Taro.requestPayment({
                    timeStamp: dPay.timeStamp,
                    nonceStr: dPay.nonceStr,
                    package: dPay.package,
                    signType: dPay.signType,
                    paySign: dPay.paySign,
                    success: function (res) {
                        console.log('########################支付成功')
                        console.log(res)
                        Toast('支付成功')
                    },
                    fail: function (res) {
                        console.log('########################支付失败')
                        console.log(res)
                        Toast('支付失败')
                    }
                })
            }
        }
    }

    return (
        <View className='detail_footer'>
            <View className='footer_left'>
                <View className='footer_item' onClick={() => { Taro.switchTab({ url: '/pages/home/home' }) }}>
                    <IconFont name='dianzan' size={52} color='#333' />
                    <Text className='item_txt'>点赞</Text>
                </View>
                <View className='footer_item' onClick={() => { Taro.switchTab({ url: '/pages/home/home' }) }}>
                    <IconFont name='liuyan' size={52} color='#333' />
                    <Text className='item_txt'>留言</Text>
                </View>
                <View className='footer_item' onClick={() => { Taro.switchTab({ url: '/pages/home/home' }) }}>
                    <IconFont name='weishoucang' size={50} color='#333' />
                    <Text className='item_txt'>收藏</Text>
                </View>
            </View>
            <View className='footer_right' onClick={handlePay}>
                <Text>我想要</Text>
            </View>
        </View>
    )
}
Index.defaultProps = {

}