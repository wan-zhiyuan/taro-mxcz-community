import Taro, { useState } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useDispatch, useSelector } from '@tarojs/redux'
import { updateBusinessApply } from '../../../../actions/community'
import { Toast } from '../../../../utils/toast'

import './index.scss'

export default function Index() {

    const businessApply = useSelector(state => state.community.businessApply)
    const dispatch = useDispatch()

    const [logo, setLogo] = useState('')
    const [weixinPic, setWeixinPic] = useState('')

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
                uploadImage(tempFilePaths, 'logo')
            }
        })
    }

    /**
     * 单图片上传
     * @param {*} tempFilePaths 图片数组
     */
    function uploadImage(tempFilePaths, type) {
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
                    // 更新商家LOGO
                    let data = JSON.parse(JSON.stringify(businessApply))
                    if (type === 'logo') {
                        data.logo = resultData.data.url
                    } else {
                        data.wechat_pic = resultData.data.url
                    }
                    dispatch(updateBusinessApply(data))
                } else {
                    Toast(resultData.msg)
                    // 上传失败 应该清空logo weixinPic的值
                    if (type === 'logo') {
                        setLogo('')
                    } else {
                        setWeixinPic('')
                    }
                }
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
                const tempFilePaths = res.tempFilePaths
                setWeixinPic(tempFilePaths)
                uploadImage(tempFilePaths, 'wechat_pic')
            }
        })
    }

    return (
        <View className='locate_part_3'>
            <View className='left'>
                <View className='select_btn' onClick={handleSelectLogo}>选择图片</View>
                {
                    // 如果想加快显示图片的速度，可以选择本地的图片显示
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