import Taro, { useState } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './index.scss'

export default function Index() {

    const[logo, setLogo] = useState('')
    const[weixinPic, setWeixinPic] = useState('')

    /* 选择商家LOGO */
    function handleSelectLogo() {
        Taro.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'cemera'],
            success: function (res) {
                console.log(res.tempFilePaths)
                setLogo(res.tempFilePaths)
            }
        })
    }
    /* 选择商家微信 */
    function handleSelectWeixin() {
        Taro.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'cemera'],
            success: function (res) {
                console.log(res.tempFilePaths)
                setWeixinPic(res.tempFilePaths)
            }
        })
    }

    return (
        <View className='locate_part_3'>
            <View className='left'>
                <View className='select_btn' onClick={handleSelectLogo}>选择图片</View>
                {
                    !!logo
                    ? <Image className='select_pic' src={logo} mode='scralToFill' ></Image>
                    : <Image className='select_pic_default'></Image>
                }
                <Text className='select_txt'>商家LOGO(200*200)</Text>
            </View>
            <View className='right'>
                <View className='select_btn' onClick={handleSelectWeixin}>选择图片</View>
                {
                    !!weixinPic
                    ? <Image className='select_pic' src={weixinPic} mode='scaleToFill'></Image>
                    : <Image className='select_pic_default'></Image>
                }
                <Text className='select_txt'>微信(200*200)</Text>
            </View>
        </View>
    )
}