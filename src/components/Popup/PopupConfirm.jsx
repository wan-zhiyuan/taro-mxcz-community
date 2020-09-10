import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import PopupWrap from '../PopupWrap'

import './index.scss'

export function PopupConfirm(props) {

    const { isOpened, } = props

    return (
        <PopupWrap isOpened={isOpened}>
            <View className='popup_box'>

            </View>
        </PopupWrap>
    )
}
PopupConfirm.defaultProps = {
    isOpened: false
}