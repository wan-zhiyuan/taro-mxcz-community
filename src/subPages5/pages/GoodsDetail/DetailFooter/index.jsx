import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
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
        if (resOrder.code == 491) {
            // 需要跳转登录页面
            Taro.navigateTo({
                url: '/subPages1/pages/login/login'
            })
            return
        }

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
                        Taro.showModal({
                            title: '提示',
                            content: '购买成功',
                            success: function (res) {
                              if (res.confirm) {
                                console.log('用户点击确定')
                                Taro.redirectTo({
                                    url: `/subPages5/pages/orderDetail/orderDetail?oid=${oid}`
                                })
                              } else if (res.cancel) {
                                console.log('用户点击取消')
                              }
                            }
                          })
                    },
                    fail: function (res) {
                        console.log('########################支付失败')
                        console.log(res)
                        Toast('支付失败')
                        Taro.redirectTo({
                            url: `/subPages5/pages/order/order`
                        })
                    }
                })
            }
        }
    }

    return (
        <View className='detail_footer'>
            <View className='footer_left'>
                <View className='footer_item' onClick={() => { Taro.switchTab({ url: '/pages/home/home' }) }}>
                    <IconFont name='home' size={52} color='#333' />
                    <Text className='item_txt'>首页</Text>
                </View>
                {/* <View className='footer_item' onClick={() => { Taro.switchTab({ url: '/pages/home/home' }) }}>
                    <IconFont name='liuyan' size={52} color='#333' />
                    <Text className='item_txt'>留言</Text>
                </View>
                <View className='footer_item' onClick={() => { Taro.switchTab({ url: '/pages/home/home' }) }}>
                    <IconFont name='weishoucang' size={50} color='#333' />
                    <Text className='item_txt'>收藏</Text>
                </View> */}
            </View>
            <View className='footer_right' onClick={handlePay}>
                <Text>我要买</Text>
            </View>
        </View>
    )
}
Index.defaultProps = {

}