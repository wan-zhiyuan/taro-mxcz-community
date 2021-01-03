import Taro, { useState, useRouter, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtTextarea, AtImagePicker, AtForm, AtInput, AtButton } from 'taro-ui'
import { getWindowHeightNoPX } from '../../../utils/style'
import { Toast, ToastSuccess } from '../../../utils/toast'
import { isEmpty } from '../../../utils/is'
import { useDispatch, useSelector } from '@tarojs/redux'
import { updatePublishApply, increasePublish } from '../../../actions/publish'
import { get as getGlobalData } from '../../../global_data'
import { getLocationString } from '../../../utils/location'
import { ClUtils } from "mp-colorui/dist/weapp/lib"

import './publishConfirm.scss'

/* 用户社区发布交流信息的页面-对于个人用户的功能板块 */
export default function PublishConfirm() {

    const router = useRouter()
    const { cate_id = -1, cate_name = '' } = router.params

    const publishApply = useSelector(state => state.publish.publishApply)
    const dispatch = useDispatch()

    const [txtValue, setTxtValue] = useState() // 发布信息内容
    const [picFiles, setPicFiles] = useState([]) // 发布信息图片
    const [showUploadBtn, setShowUploadBtn] = useState(true) // 是否显示选择图片加号

    const [name, setName] = useState('') // 发布人姓名
    const [mobile, setMobile] = useState('') // 发布人电话
    const [upLoadImg, setUpLoadImg] = useState([]) // 已上传图片的数组

    useEffect(() => {
        console.log('cate_id=' + cate_id)
        console.log('cate_name=' + cate_name)
        // 判断是否存在publishInfo的值，如果有，直接设置name和mobile值
        Taro.getStorage({
            key: 'publishInfo',
            success: function (res) {
                setName(res.data.name || '')
                setMobile(res.data.mobile || '')
            }
        })
        
    }, [])

    // 描述文本变化
    function handleChange(value) {
        setTxtValue(value)
        console.log(value)
    }

    // files值发生变化时触发
    function onChange(files, doType, index) {
        console.log(files)
        console.log('doType=' + doType)
        console.log('index=' + index) // 删除图片的位置
        setPicFiles(files)
        if (files.length === 9) {
            setShowUploadBtn(false)
        } else {
            setShowUploadBtn(true)
        }
    }
    // 选择图片失败时触发
    function onFail(mes) {
        console.log(mes)
    }
    // 点击图片时触发（一般用于实现图片预览）
    function onImageClick(index, file) {
        console.log(index, file)
    }

    function handleChangeName(value) {
        setName(value)
    }
    function handleChangeMobile(value) {
        setMobile(value)
    }

    /* 发布 */
    function handlePublish() {
        if (!ClUtils.rule.required(txtValue)) {
            Toast('请输入描述内容')
            return
        }
        // if (picFiles.length <= 0) {
        //     Toast('请点击+号选择图片')
        //     return
        // }
        if (!ClUtils.rule.required(name)) {
            Toast('请输入您的姓名')
            return
        }
        // if (!ClUtils.rule.phone(mobile)) {
        //     Toast('请输入您的联系方式')
        //     return
        // }
        if (picFiles.length === 0) {
            console.log('用户未选择图片，直接发布')
            confirmPublish()
        } else {
            console.log('用户选择了图片，先上传图片再发布')
            // 先上传图片，图片上传成功后再调用发布接口
            uploadLoader()
        }
    }

    // 上传图片代码
    function uploadLoader(data = {}) {
        let i = data.i ? data.i : 0
        let success = data.success ? data.success : 0//上传成功的个数
        let fail = data.fail ? data.fail : 0;//上传失败的个数
        Taro.showLoading({
            title: `正在上传第${i + 1}张`
        })
        console.log('i=' + i)
        console.log(picFiles[i])
        console.log(picFiles[i].url)
        let orzAuth5 = Taro.getStorageSync('jwt') || ''
        // 发起上传
        Taro.uploadFile({
            url: 'https://mxcz.love/api/user', // 服务器地址
            header: {
                'content-type': 'multipart/form-data',
                'Orz-Auth-Xcx': 'true',
                'Orz-Auth5': orzAuth5,
            },
            name: 'file',
            filePath: picFiles[i].url,
            formData: {
                'op': 'upload',
                'upload_type': 'qnoss',
            },
            success: (res) => {
                console.log(res)
                // 图片上传成功，图片上传成功的变量+1
                let resultData = JSON.parse(res.data) // json字符串 转 json对象
                if (resultData.code === 200) {
                    success++
                    // 上传成功的数据放入upLoadImg后面提交发布的时候使用
                    upLoadImg.push(resultData.data.url)
                } else {
                    fail++
                }
            },
            fail: () => {
                fail++ // 图片上传失败，图片上传失败的变量+1
            },
            complete: () => {
                Taro.hideLoading()
                i++ // 此图片执行完上传后，开始上传下一张
                console.log('i=' + i)
                console.log('picFiles.length:' + picFiles.length)
                if (i === picFiles.length) {
                    ToastSuccess('上传成功')
                    console.log('成功：' + success + " 失败：" + fail)

                    // 提交发布的函数代码
                    confirmPublish()
                } else {
                    data.i = i
                    data.success = success
                    data.fail = fail
                    uploadLoader(data)
                }
            }
        })
    }

    async function confirmPublish() {
        console.log('开始发布请求')
        console.log(upLoadImg)
        let images = ''
        for (let i = 0; i < upLoadImg.length; i++) {
            if (images === '') {
                images = upLoadImg[i]
            } else {
                images = images + '|' + upLoadImg[i]
            }
        }
        console.log('images:' + images)
        const location = await getLocationString()
        let postData = {
            op: 'publish',
            cate_id: cate_id,
            cate_name: cate_name,
            content: txtValue,
            images: images,
            location: location || '',
            contact_name: name || '',
            contact_mobile: mobile || '',
        }

        const res = await increasePublish(postData)
        if (res.code === 200) {
            console.log('发布成功')
            Taro.showLoading({
                title: ''
            })

            // 更新storage中的publishInfo
            try {
                await Taro.setStorage({
                    key: 'publishInfo',
                    data: {
                        name,
                        mobile,
                    },
                })
            } catch (err) {
                console.log('setStorage ERR: ', err)
            }


            setTimeout(() => {
                Taro.hideLoading()
                Taro.switchTab({
                    url: `/pages/home/home`
                })
            }, 1500)
        } else {
            console.log('发布失败:' + res.msg)
            Toast(res.msg)
        }
    }

    return (
        <View className='publish_confirm_index'>
            <ScrollView
                className='info_scrollview'
                scrollY
                scrollWithAnimation
                enableFlex={true}
                style={{ height: `${getWindowHeightNoPX() - 75}px` }}
            >
                <View className='info_top'>
                    <Text>#{cate_name}#</Text>
                </View>
                <View className='info_input'>
                    <AtTextarea
                        count={true}
                        value={txtValue}
                        onChange={handleChange}
                        maxLength={450}
                        placeholder='请输入发布信息的内容描述'
                    // fixed={true}
                    />
                </View>
                <View className='info_pic'>
                    <AtImagePicker
                        multiple={true}
                        length={3} // 单行图片数量
                        count={9} // 最多可选图片数量
                        files={picFiles}
                        mode="scaleToFill"
                        onChange={onChange}
                        onFail={onFail}
                        onImageClick={onImageClick}
                        showAddBtn={showUploadBtn} //是否显示添加图片按钮
                    />
                </View>
                <View className='info_msg'>
                    <AtInput
                        name='value'
                        title='联系人：'
                        type='text'
                        placeholder='请输入您的姓名'
                        value={name}
                        onChange={handleChangeName}
                    />
                    <AtInput
                        name='value'
                        title='联系方式：'
                        type='text'
                        placeholder='请输入您的联系方式'
                        value={mobile}
                        onChange={handleChangeMobile}
                    />
                </View>
                <Text className='info_tips'>tips:联系方式选填</Text>
            </ScrollView>


            <View className='info_bottom'>
                <View className='info_rules'>
                    <Text style={{ color: '#333' }}>发布即表示您已阅读并确认同意</Text>
                    <Text style={{ color: '#ff0044' }}>《发布须知》</Text>
                </View>
                <View
                    className='info_btn'
                    onClick={handlePublish}
                >确认发布</View>
            </View>

        </View>
    )
}

PublishConfirm.config = {
    navigationBarTitleText: '发布信息',
}

// 测试图片上传代码
        // console.log(picFiles)
        // console.log(picFiles[0])
        // let orzAuth5 = Taro.getStorageSync('jwt') || ''
        // const uploadTask = Taro.uploadFile({
        //     url: 'https://mxcz.love/api/user', //仅为示例，非真实的接口地址
        //     // header: {
        //     //     'content-type': 'multipart/form-data',
        //     //     'Orz-Auth-Xcx': 'true',
        //     //     'Orz-Auth5': orzAuth5,
        //     //     // 'method': 'POST',
        //     // },
        //     // method: 'POST',
        //     filePath: picFiles[0].url,
        //     name: 'file',
        //     // formData: {
        //     //     'op':'upload',
        //     //     'upload_type': 'qnoss',
        //     // },
        //     success: function (res) {
        //         var d = res.data
        //         //do something
        //         console.log(res)
        //     }
        // })
        // uploadTask.progress((res) => {
        //     console.log('上传进度', res.progress)
        //     console.log('已经上传的数据长度', res.totalBytesSent)
        //     console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
        // })
