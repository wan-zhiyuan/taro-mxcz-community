import Taro, { Component } from '@tarojs/taro'
import { View, Text, Canvas } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import PopupWrap from '../PopupWrap'
import { Barcode, QRCode } from 'taro-code'

import './index.scss'

export function PopupQRcode(props) {

    const { isOpened, title, qrTxt, size, onClose, pic } = props

    return (
        <PopupWrap isOpened={isOpened} onClose={onClose}>
            <View className='popup_qr_box'>
                <Text className='popup_qr_title'>{title}</Text>
                {/* 显示二维码 */}
                {/* <QRCode
                    text={qrTxt}
                    size={size}
                    scale={4}
                    errorCorrectLevel='M'
                    typeNumber={2}
                /> */}
                {/* 显示二维码图片 */}
                <View>
                    {
                        pic === ''
                            ? <View className='pic_default'></View>
                            : <Image className='pic' src={pic} mode='scaleToFill'></Image>
                    }
                </View>
            </View>
        </PopupWrap>
    )
}
PopupQRcode.defaultProps = {
    isOpened: false,
    title: '标题',
    qrText: '二维码内容',
    size: 180,
    pic: '',
}
