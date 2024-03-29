import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { useSelector } from '@tarojs/redux'
import { Toast } from '../../../utils/toast'

import './index.scss'

export default function Index(props) {

    const {  title } = props

    const userInfo = useSelector(state => state.user.userInfo)

    function handleMerchant() {
        Toast('此功能暂不开放')
    }

    function handleMall() {
        if (!userInfo.nickname) {
            Taro.navigateTo({
                url: '/subPages1/pages/login/login'
            })
            return
        }
        // Taro.navigateTo({
        //     url: '/subPages5/pages/mall/mall'
        // })
        Taro.navigateTo({
            url: '/subPages5/pages/goodsServiceStation/goodsServiceStation'
        })
    }

    function handleOrder() {
        if (!userInfo.nickname) {
            Taro.navigateTo({
                url: '/subPages1/pages/login/login'
            })
            return
        }
        Taro.navigateTo({
            url: '/subPages5/pages/order/order'
        })
    }

    return (
        <View className='mine_service'>
            <View className='title'>
                <View style={{ height: '100%', width: '10px' }}></View>
                <AtIcon prefixClass='icon' value='xingji' size='20' color='#EBC00F'></AtIcon>
                <Text className='title_txt'>{title}</Text>
            </View>
            
            <View className='middle_item' onClick={handleMall}>
                <View className='item_left'>
                    <AtIcon prefixClass='icon' value='goumai' size='16' color='#1CCEAB'></AtIcon>
                    <Text style={{ fontSize: '15px', lineHeight: '15px', marginLeft: '11px', color: '#333' }}>积分商城</Text>
                    <Text style={{ fontSize: '12px', lineHeight: '12px', marginLeft: '8px', color: '#333' }}>MALL</Text>
                </View>
                <View style={{ marginRight: '10px' }}>
                    <AtIcon value='chevron-right' size='17' color='#d4d4d4'></AtIcon>
                </View>
            </View>
            <View className='middle_item' onClick={handleOrder}>
                <View className='item_left'>
                    <AtIcon prefixClass='icon' value='dingdan' size='16' color='#1CCEAB'></AtIcon>
                    <Text style={{ fontSize: '15px', lineHeight: '15px', marginLeft: '11px', color: '#333' }}>我的订单</Text>
                    <Text style={{ fontSize: '12px', lineHeight: '12px', marginLeft: '8px', color: '#333' }}>MY ORDER</Text>
                </View>
                <View style={{ marginRight: '10px' }}>
                    <AtIcon value='chevron-right' size='17' color='#d4d4d4'></AtIcon>
                </View>
            </View>
        </View>
    )
}

Index.defaultProps = {
    title: '',
}