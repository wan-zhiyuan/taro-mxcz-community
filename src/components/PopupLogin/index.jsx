import Taro, { Component } from '@tarojs/taro'
import { View, Text, } from '@tarojs/components'
import PopupWrap from '../PopupWrap'

import './index.scss'

export function Index(props) {

    const { isOpened, onClose } = props

    function handleLogin() {
        Taro.navigateTo({
            url: '/subPages1/pages/login/login'
        })
    }

    return (
        <PopupWrap isOpened={isOpened} onClose={onClose}>
            <View className='popup_login_box'>
                <View className='data'>
                    <Text className='title'>公告</Text>
                    <Text className='content'>登陆后体验丰富多才的社区生活吧～</Text>
                </View>
                <View className='button' onClick={handleLogin}>我知道了</View>
            </View>
        </PopupWrap>
    )
}
Index.defaultProps = {
    isOpened: true,
    onClose: ()=>{},
}