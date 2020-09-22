import Taro, { useState, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtTextarea, AtImagePicker, AtForm, AtInput, AtButton } from 'taro-ui'
import { getWindowHeightNoPX } from '../../../utils/style'
import { Toast, ToastSuccess } from '../../../utils/toast'
import { isEmpty } from '../../../utils/is'
import { useDispatch, useSelector } from '@tarojs/redux'
import { updatePublishApply, increasePublish } from '../../../actions/publish'

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

    function handlePublish() {
        console.log('确认发布')
        Toast('确认发布')

        if (isEmpty(txtValue)) {
            Toast('请输入描述内容')
            return
        }
        if (picFiles.length <= 0) {
            Toast('请点击+号选择图片')
            return
        }
        if (isEmpty(name)) {
            Toast('请输入您的姓名')
            return
        }
        if (isEmpty(mobile)) {
            Toast('请输入您的联系方式')
            return
        }

        // 先上传图片，图片上传成功后再调用发布接口
        let url = '' // 服务器地址
        uploadLoader(url, picFiles)


        // const uploadTask = Taro.uploadFile({
        //     url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        //     filePath: picFiles[0],
        //     name: 'file',
        //     formData: {
        //         'user': 'test'
        //     },
        //     success: function (res) {
        //         var d = res.data
        //         //do something
        //     }
        // })
        // uploadTask.progress((res) => {
        //     console.log('上传进度', res.progress)
        //     console.log('已经上传的数据长度', res.totalBytesSent)
        //     console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
        // })
    }

    // 上传图片代码
    function uploadLoader(data) {
        let i = data.i ? data.i : 0
        let success = data.success ? data.success : 0//上传成功的个数
        let fail = data.fail ? data.fail : 0;//上传失败的个数
        Taro.showLoading({
            title: `正在上传第${i + 1}张`
        })
        // 发起上传
        Taro.uploadFile({
            url: data.url,
            header: {
                'content-type': 'multipart/form-data',
            },
            name: 'file',
            filePath: data.picFiles[i],
            success: (res) => {
                console.log('success:' + res)
                // 图片上传成功，图片上传成功的变量+1
                let resultData = JSON.parse(resp.data)
                if (resultData.code === 200) {
                    success++
                    // 上传成功的数据放入upLoadImg后面提交发布的时候使用
                    upLoadImg.push(resultData.data)
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
                if (i === data.picFiles.length) {
                    ToastSuccess('上传成功')
                    console.log('成功：' + success + " 失败：" + fail)
                    // 这里可以放入提交发布的函数代码

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
        let location = ''
        try {
            const res = await Taro.getLocation({
                type: 'gcj02',
            })
            location = latitude + ',' + longitude
        } catch (err) {
            location = ''
        }

        let postData = {
            op: 'publish',
            cate_id: 1,
            cate_name: '二手闲置',
            content: '今天天气真好，我要出去郊游～',
            images: '',
            location: location,
            contact_name: '华晨宇',
            contact_mobile: '13589890606',
        }
        increasePublish(postData)
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
