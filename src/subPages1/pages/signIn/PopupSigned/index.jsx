import Taro, { Component } from '@tarojs/taro'
import { View, Text, } from '@tarojs/components'
import PopupWrap from '../../../../components/PopupWrap'

import './index.scss'

export function Index(props) {

    const { signData, isOpened, onClose } = props

    return (
        <PopupWrap isOpened={isOpened} >
            <View className='popup_signed_box'>
                <View className='signed_msg'>
                <View className='signed_days'>
                        <Text>已连续签到</Text>
                        <Text style={{ color: '#ff0044',marginLeft:Taro.pxTransform(8) }}>{`${signData.cumulative_days}天`}</Text>
                    </View>
                    <Text className='signed_success'>签到成功</Text>
                    <View className='signed_point'>
                        <Text>积分</Text>
                        <Text style={{ color: '#ff0044',marginLeft:Taro.pxTransform(8) }}>{`+${signData.number}`}</Text>
                    </View>
                </View>


                <View className='signed_ok' onClick={onClose}>
                    <Text>好的</Text>
                </View>
            </View>
        </PopupWrap>
    )
}
Index.defaultProps = {
    signData: {},
    isOpened: false,
    onClose: ()=>{},
}