import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import IconFont from '../../../../assets/iconfont'

import './index.scss'
import { isEmpty } from '../../../../utils/is'

export default function Index(props) {

    const { } = props
    const [logo, setLogo] = useState('')
    const [mobile, setMobile] = useState('')
    const [jsCode, setJsCode] = useState('')

    useEffect(() => {
        async function taroLogin() {
            const res = await Taro.login()
            if (res.errMsg == 'login:ok') {
                if (res.code) {
                    setJsCode(res.code)
                }
            }
        }
        taroLogin()
    }, [])

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

    // 获取用户手机信息回调
    function onGetPhoneNumber(e) {
        console.log('###################')
        console.log(e)
        if (e.detail.errMsg === 'getPhoneNumber:fail user deny') {
            console.log('用户拒绝微信手机号授权，请重新授权(true)')
        } else if (e.detail.errMsg === 'getPhoneNumber:ok') {
            console.log(`是否成功调用${e.detail}`);
            console.log(`是否成功调用${e.detail.errMsg}`);
            console.log(`加密算法的初始向量:${e.detail.iv}`);
            console.log(`包括敏感数据在内的完整用户信息的加密数据:${e.detail.encryptedData}`);
            let encryptedData = encodeURIComponent(e.detail.encryptedData)
            let iv = encodeURIComponent(e.detail.iv)
            // resolvePhone
        }
    }

    return (
        <View className='locate_header'>
            <View className='left'>
                {
                    isEmpty(logo)
                        ? (
                            <View className='logo_default' onClick={handleSelectLogo}>
                                <IconFont name='xiangji' size={60} />
                                <Text style={{ marginTop: Taro.pxTransform(12) }}>LOGO</Text>
                            </View>
                        ) : (
                            <Image className='logo' src={logo} mode='scaleToFill' onClick={handleSelectLogo}></Image>
                        )
                }
            </View>
            <View className='right'>
                <Text className='phone'>{mobile}</Text>
                <Button
                    className='button'
                    openType={"getPhoneNumber"}
                    onGetPhoneNumber={onGetPhoneNumber}
                >获取手机号</Button>
            </View>
        </View>
    )
}
Index.defaultProps = {

}