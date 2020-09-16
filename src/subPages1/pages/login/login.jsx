import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'

import './login.scss'

export default function Login() {

    const [isLogin, setIsLogin] = useState(false)
    const [jsCode, setJsCode] = useState('')

    useEffect(() => {
        console.log('Login.useEffect()')

        async function taroLogin() {
            Taro.showLoading({
                title: '加载中',
            })
            const res = await Taro.login()
            if (res.errMsg == 'login:ok') {
                if (res.code) {
                    setJsCode(res.code)
                }
            } else {

            }
            Taro.hideLoading()
        }
        taroLogin()

    }, [])

    // 获取用户信息回调
    async function onGetUserInfo(e) {
        console.log('###################')
        console.log('登录页-获取userinfo')
        console.log(e)
        setIsLogin(true)

        if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
            console.log('用户拒绝用户信息授权，请重新授权(true)')
            setIsLogin(false)
        } else if (e.detail.errMsg === 'getUserInfo:ok') {
            setIsLogin(false)
            const { avatarUrl, nickName } = e.detail.userInfo
            try {
                await Taro.setStorage({
                    key: 'userInfo',
                    data: {
                        avatar: avatarUrl,
                        nickName
                    },
                })
            } catch (err) {
                console.log('setStorage ERR: ', err)
            }
            // dispatch(updateUserInfoAction(avatarUrl, nickName))


            let encryptedData = encodeURIComponent(e.detail.encryptedData)
            let iv = encodeURIComponent(e.detail.iv)
            goToLoginInit(encryptedData, iv)
        }

        // 用户登录初始化
        async function goToLoginInit(encryptedData, iv) {
            let postData = { js_code: jsCode, encryptedData, iv, }
            // 以下是登录的请求

            // 成功


            // 失败
        }

    }

    const handleCancel = () => {
        if (isLogin) {
            return
        }
        goBack()
    }
    function goBack() {
        console.log('goBack 返回上一级')
        Taro.navigateBack({
            delta: 1 // 返回上一级页面
        })
    }

    return (
        <View className='login_index'>
            <View>
                <Button
                    className="userbutton-login"
                    openType={"getUserInfo"}
                    onGetUserInfo={onGetUserInfo}
                    loading={isLogin}
                >用户登录</Button>
            </View>
            <View className='login_cancel' onClick={handleCancel}>取消</View>
        </View>
    )
}
Login.config = {
    navigationBarTitleText: '登录',
}