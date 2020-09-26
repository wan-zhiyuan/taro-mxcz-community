import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import IconFont from '../../../../assets/iconfont'
import { isEmpty } from '../../../../utils/is'
import { useDispatch, useSelector } from '@tarojs/redux'
import { updateServiceSiteApply } from '../../../../actions/community'
import { getUserPhone } from '../../../../actions/user'

import './index.scss'

export default function Index(props) {

    const { } = props

    const serviceSiteApply = useSelector(state => state.community.serviceSiteApply)
    const dispatch = useDispatch()

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
                const tempFilePaths = res.tempFilePaths
                setLogo(tempFilePaths)
                uploadImage(tempFilePaths)
            }
        })
    }

    /**
     * 单图片上传
     * @param {*} tempFilePaths 图片数组
     */
    function uploadImage(tempFilePaths) {
        let orzAuth5 = Taro.getStorageSync('jwt') || ''
        Taro.uploadFile({
            url: 'https://mxcz.love/api/user',
            header: {
                'content-type': 'multipart/form-data',
                'Orz-Auth-Xcx': 'true',
                'Orz-Auth5': orzAuth5,
            },
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
                'op': 'upload',
                'upload_type': 'qnoss',
            },
            success(res) {
                console.log('######')
                console.log(res)
                let resultData = JSON.parse(res.data) // json字符串 转 json对象
                if (resultData.code === 200) {
                    // 更新LOGO
                    let data = JSON.parse(JSON.stringify(serviceSiteApply))
                    data.logo = resultData.data.url
                    dispatch(updateServiceSiteApply(data))
                } else {
                    Toast(resultData.msg)
                    // 上传失败 应该清空logo的值
                    setLogo('')
                }
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
            
            resolvePhone(encryptedData, iv)
        }
    }

    async function resolvePhone(encryptedData, iv) {
        // 去后台交换解析手机号码 需要接口
        let postData = {
            op: 'user_mobile',
            js_code: jsCode,
            encrypted: encryptedData,
            iv: iv,
        }
        const res = await getUserPhone(postData)
        console.log(res)
        // 获取成功设置手机号显示
        if (res.code === 200) {
            setMobile(res.data.mobile)
            // 更新redux中的状态值
            let data = JSON.parse(JSON.stringify(serviceSiteApply))
            data.apply_mobile = res.data.mobile
            dispatch(updateServiceSiteApply(data))
        } else {
            Toast(res.msg)
        }
    }

    return (
        <View className='locate_header'>
            <View className='left'>
                {
                    isEmpty(serviceSiteApply.logo)
                        ? (
                            <View className='logo_default' onClick={handleSelectLogo}>
                                <IconFont name='xiangji' size={60} />
                                <Text style={{ marginTop: Taro.pxTransform(12) }}>LOGO</Text>
                            </View>
                        ) : (
                            <Image className='logo' src={serviceSiteApply.logo} mode='scaleToFill' onClick={handleSelectLogo}></Image>
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