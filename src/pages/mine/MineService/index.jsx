import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { useSelector } from '@tarojs/redux'

import './index.scss'

export default function Index(props) {

    const { title } = props

    const userInfo = useSelector(state => state.user.userInfo)

    /* 我的社区 */
    function handleMyCommunity() {
        if (!userInfo.nickname) {
            Taro.navigateTo({
                url: '/subPages1/pages/login/login'
            })
            return
        }
        Taro.navigateTo({
            url: `/subPages1/pages/myPublish/myPublish`
        })
    }
    /* 我的报名 */
    function handleMyEnroll() {
        if (!userInfo.nickname) {
            Taro.navigateTo({
                url: '/subPages1/pages/login/login'
            })
            return
        }
        Taro.navigateTo({
            url: `/subPages1/pages/myEnroll/myEnroll`
        })
    }
    /* 我的地址 */
    function handleAddress() {
        console.log('handleGoToAddress()')
        Taro.chooseAddress({
            success: function (res) {
                console.log(res.userName)
                console.log(res.postalCode)
                console.log(res.provinceName)
                console.log(res.cityName)
                console.log(res.countyName)
                console.log(res.detailInfo)
                console.log(res.nationalCode)
                console.log(res.telNumber)
            }
        })
    }

    /* 活动核销 */
    function handleVerify() {
        Taro.navigateTo({
            url: `/subPages1/pages/verification/verification`
        })
    }

    /* 合作申请 */
    function handleCooperation() {
        Taro.navigateTo({
            url: `/subPages2/pages/cooperate/cooperate?status=1`
        })
    }

    return (
        <View className='mine_service'>
            <View className='title'>
                <View style={{ height: '100%', width: '10px' }}></View>
                <AtIcon prefixClass='icon' value='xingji' size='20' color='#EBC00F'></AtIcon>
                <Text className='title_txt'>{title}</Text>
            </View>
            <View className='middle_item' onClick={handleMyCommunity}>
                <View className='item_left'>
                    <AtIcon prefixClass='icon' value='home' size='16' color='#1CCEAB'></AtIcon>
                    <Text style={{ fontSize: '15px', lineHeight: '15px', marginLeft: '11px', color: '#333' }}>我的社区</Text>
                    <Text style={{ fontSize: '12px', lineHeight: '12px', marginLeft: '8px', color: '#333' }}>MY PUBLISH</Text>
                </View>
                <View style={{ marginRight: '10px' }}>
                    <AtIcon value='chevron-right' size='17' color='#d4d4d4'></AtIcon>
                </View>
            </View>
            <View className='middle_item' onClick={handleMyEnroll}>
                <View className='item_left'>
                    <AtIcon prefixClass='icon' value='dingdan' size='16' color='#1CCEAB'></AtIcon>
                    <Text style={{ fontSize: '15px', lineHeight: '15px', marginLeft: '11px', color: '#333' }}>我的报名</Text>
                    <Text style={{ fontSize: '12px', lineHeight: '12px', marginLeft: '8px', color: '#333' }}>MY SIGN UP</Text>
                </View>
                <View style={{ marginRight: '10px' }}>
                    <AtIcon value='chevron-right' size='17' color='#d4d4d4'></AtIcon>
                </View>
            </View>
            <View className='middle_item' onClick={() => { handleAddress() }}>
                <View className='item_left'>
                    <AtIcon prefixClass='icon' value='dingdan' size='16' color='#1CCEAB'></AtIcon>
                    <Text style={{ fontSize: '15px', lineHeight: '15px', marginLeft: '11px', color: '#333' }}>我的地址</Text>
                    <Text style={{ fontSize: '12px', lineHeight: '12px', marginLeft: '8px', color: '#333' }}>MY ADDRESS</Text>
                </View>
                <View style={{ marginRight: '10px' }}>
                    <AtIcon value='chevron-right' size='17' color='#d4d4d4'></AtIcon>
                </View>
            </View>
            {
                Number(userInfo.is_verify || 0) === 1 &&
                <View className='middle_item' onClick={() => { handleVerify() }}>
                    <View className='item_left'>
                        <AtIcon prefixClass='icon' value='dingdan' size='16' color='#1CCEAB'></AtIcon>
                        <Text style={{ fontSize: '15px', lineHeight: '15px', marginLeft: '11px', color: '#333' }}>活动核销</Text>
                        <Text style={{ fontSize: '12px', lineHeight: '12px', marginLeft: '8px', color: '#333' }}></Text>
                    </View>
                    <View style={{ marginRight: '10px' }}>
                        <AtIcon value='chevron-right' size='17' color='#d4d4d4'></AtIcon>
                    </View>
                </View>
            }
            {
                Number(userInfo.is_cooperation || 0) === 1 &&
                <View className='middle_item' onClick={() => { handleCooperation() }}>
                    <View className='item_left'>
                        <AtIcon prefixClass='icon' value='dingdan' size='16' color='#1CCEAB'></AtIcon>
                        <Text style={{ fontSize: '15px', lineHeight: '15px', marginLeft: '11px', color: '#333' }}>合作申请</Text>
                        <Text style={{ fontSize: '12px', lineHeight: '12px', marginLeft: '8px', color: '#333' }}>MY COOPERATE</Text>
                    </View>
                    <View style={{ marginRight: '10px' }}>
                        <AtIcon value='chevron-right' size='17' color='#d4d4d4'></AtIcon>
                    </View>
                </View>
            }
        </View>
    )
}

Index.defaultProps = {
    title: '',
}