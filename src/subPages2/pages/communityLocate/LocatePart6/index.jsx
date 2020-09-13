import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './index.scss'

/* 第六部分：获取手机号 */
export default function Index() {

    const [phoneNumber, setPhoneNumber] = useState('')
    const [isGetphone, setIsGetPhone] = useState(false)
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

    function resolvePhone() {
        // 去后台交换解析手机号码 需要接口

        // 获取成功设置手机号显示，并且按钮灰色

    }

    return (
        <View className='locate_part_6'>
            <View className='phone'>
                <Text className='phone_label'>手机号：</Text>
                <View className='phone_value'>
                    <Text>{phoneNumber}</Text>
                    {
                        isGetphone
                            ? <View className='phone_get'>验证成功</View>
                            : <Button
                                className="phone_btn"
                                openType={"getPhoneNumber"}
                                onGetPhoneNumber={onGetPhoneNumber}
                            >获取手机号</Button>
                    }

                </View>
            </View>
        </View>
    )
}