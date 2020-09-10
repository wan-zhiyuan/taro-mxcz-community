import Taro, { Component } from '@tarojs/taro'
import { View, Text, Canvas } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import PopupWrap from '../PopupWrap'
import { Barcode, QRCode } from 'taro-code'

import './index.scss'

export function PopupQRcode(props) {

    const { isOpened, title, qrTxt, size, onClose } = props

    return (
        <PopupWrap isOpened={isOpened} onClose={onClose}>
            <View className='popup_qr_box'>
                <Text className='popup_qr_title'>{title}</Text>
                <QRCode
                    text={qrTxt}
                    size={size}
                    scale={4}
                    errorCorrectLevel='M'
                    typeNumber={2}
                />
            </View>
        </PopupWrap>
    )
}
PopupQRcode.defaultProps = {
    isOpened: false,
    title: '标题',
    qrText: '二维码内容',
    size: 180,
}
