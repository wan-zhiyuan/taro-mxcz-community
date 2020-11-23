import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, OpenData } from '@tarojs/components'
import { getLogin } from '../../../actions/login'
import { getUserPhone, dispatchUser } from '../../../actions/user'
import { dispatchHomeIndex } from '../../../actions/home'
import { useDispatch } from '@tarojs/redux'

import './login.scss'
import { Toast } from '../../../utils/toast'
import { isEmpty } from '../../../utils/is'

export default function Login() {

    const dispatch = useDispatch()

    const [isShowUserInfoBtn, setIsShowUserInfoBtn] = useState(true)
    const [isShowPhoneBtn, setIsShowPhoneBtn] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [jsCode, setJsCode] = useState('')

    useEffect(() => {
        console.log('Login.useEffect()')

        async function taroLogin() {
            Taro.showLoading({
                title: '加载中',
            })
            const res = await Taro.login()
            console.log(res)
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

            let encryptedData = encodeURIComponent(e.detail.encryptedData)
            let iv = encodeURIComponent(e.detail.iv)
            goToLogin(encryptedData, iv)
        }

        // 用户登录初始化
        async function goToLogin(encryptedData, iv) {
            let postData = { js_code: jsCode, encrypted: encryptedData, iv, op: 'authorize' }
            // 以下是登录的请求
            const res = await getLogin(postData)
            console.log(res)
            // 成功
            if (res.code !== 200) {
                return
            }
            await Taro.setStorageSync('jwt', res.data.jwt)
            const resUser = await dispatch(dispatchUser())
            if (resUser.code !== 200) {
                return
            }
            if (isEmpty(resUser.data.mobile)) {
                console.log('未获取用户手机号，需要用户手机号登录')
                setIsShowUserInfoBtn(false)
                setIsShowPhoneBtn(true)
            } else {
                console.log('已存在用户手机号，登录成功')
                userLogined()
            }
        }
    }

    async function userLogined() {
        // 请求user数据 判断是否登录成功
        Taro.showLoading({
            title: '请稍等'
        })

        const res = await dispatch(dispatchUser())
        if (!res.data.nickname) {
            console.log('未找到用户信息，请重新登陆')
            Toast('未找到用户信息，请重新登陆')
            Taro.hideLoading()
            return
        }
        await dispatch(dispatchHomeIndex())

        setTimeout(() => {
            Taro.hideLoading()
            goBack()
        }, 1000)
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

    // 获取用户手机信息回调
    function onGetPhoneNumber(e) {
        console.log('###################')
        console.log('登录页-获取phoneNumber')
        console.log(e)
        setIsLogin(true)
        if (e.detail.errMsg === 'getPhoneNumber:fail user deny') {
            console.log('用户拒绝微信手机号授权，请重新授权(true)')
            setIsLogin(false)
        } else if (e.detail.errMsg === 'getPhoneNumber:ok') {
            setIsLogin(false)
            console.log(`是否成功调用${e.detail}`);
            console.log(`是否成功调用${e.detail.errMsg}`);
            console.log(`加密算法的初始向量:${e.detail.iv}`);
            console.log(`包括敏感数据在内的完整用户信息的加密数据:${e.detail.encryptedData}`);
            let encryptedData = encodeURIComponent(e.detail.encryptedData)
            let iv = encodeURIComponent(e.detail.iv)
            getPhoneNumber(encryptedData, iv)
        }
    }

    async function getPhoneNumber(encryptedData, iv) {
        let postData = { js_code: jsCode, encrypted: encryptedData, iv, op: 'user_mobile' }
        // 以下是登录的请求
        const res = await getUserPhone(postData)
        console.log(res)
        // 成功
        if (res.code === 200) {
            userLogined()
        } else {
            Toast('用户注册失败')
            console.log('用户注册失败')
        }
    }

    return (
        <View className='login_index'>
            <View className='avatar'>
                <OpenData type='userAvatarUrl' />
            </View>
            <View style={isShowUserInfoBtn ? {} : { display: 'none' }}>
                <Button
                    className="userbutton-login"
                    openType={"getUserInfo"}
                    onGetUserInfo={onGetUserInfo}
                    loading={isLogin}
                >用户登录</Button>
            </View>
            <View style={(isShowPhoneBtn && !isShowUserInfoBtn) ? {} : { display: 'none' }}>
                <Button
                    className="userbutton-login"
                    openType={"getPhoneNumber"}
                    onGetPhoneNumber={onGetPhoneNumber}
                    loading={isLogin}
                >手机号一键登录</Button>
            </View>
            <View className='login_cancel' onClick={handleCancel}>取消</View>
        </View>
    )
}
Login.config = {
    navigationBarTitleText: '登录',
}