import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtTextarea, AtImagePicker, AtInput } from 'taro-ui'
import { getWindowHeightNoPX } from '../../../utils/style'
import { getPublishDetail, increasePublish, editMyPublish } from '../../../actions/publish'
import { useSelector } from '@tarojs/redux'
import { Toast, ToastSuccess } from '../../../utils/toast'
import { ClUtils } from "mp-colorui/dist/weapp/lib"
import { getLocationString } from '../../../utils/location'

import './publishEdit.scss'

export default function PublishEdit() {

    const router = useRouter()
    const { target_id = 0, } = router.params

    const userInfo = useSelector(state => state.user.userInfo)

    const [cateId, setCateId] = useState(0)
    const [cateName, setCateName] = useState('')
    const [txtValue, setTxtValue] = useState() // 发布信息内容
    const [picFiles, setPicFiles] = useState([]) // 发布信息图片
    const [showUploadBtn, setShowUploadBtn] = useState(true) // 是否显示选择图片加号

    const [name, setName] = useState('') // 发布人姓名
    const [mobile, setMobile] = useState('') // 发布人电话
    const [upLoadImg, setUpLoadImg] = useState([]) // 已上传图片的数组
    const [images, setImages] = useState('')
    useEffect(() => {
        setName(userInfo.nickname || '')
        // 获取初始化数据
        async function getData() {
            const res = await getPublishDetail(target_id)
            console.log('#####')
            console.log(res)
            let detail = res.data.basic
            if (res.code === 200) {
                setCateId(detail.cate_id)
                setCateName(detail.cate_name)
                setTxtValue(detail.content)
                setMobile(detail.contact_mobile)
            } else {
                console.log(res.msg)
            }
        }
        getData()
    }, [])

    // 描述文本变化
    function handleChangeContent(value) {
        setTxtValue(value)
    }

    // files值发生变化时触发
    function onChange(files, doType, index) {
        console.log(files)
        console.log('doType=' + doType)
        console.log('index=' + index) // 删除图片的位置
        setPicFiles(files)
        if (doType === 'remove') {
            let newArray = [].concat(JSON.parse(JSON.stringify(upLoadImg)))
            console.log(newArray)
            newArray.splice(index, 1)
            setUpLoadImg(newArray)

            // let images = ''
            // for (let i = 0; i < newArray.length; i++) {
            //     if (i === 0) {
            //         images = newArray[i]
            //     } else {
            //         images = images + '|' + newArray[i]
            //     }
            // }
            // console.log(images)
            // setImages(images)
        } else {
            // 执行上传图片
            /* --------------------- */
            let picUrlArr = []
            for (let i = 0; i < files.length; i++) {
                picUrlArr.push(files[i].url)
            }
            console.log('picUrlArr')
            console.log(picUrlArr)
            uploadLoader({ path: picUrlArr, })
            /* --------------------- */
        }
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

    /* 联系人变化 */
    function handleChangeName(value) {
        setName(value)
    }
    /* 联系方式变化 */
    function handleChangeMobile(value) {
        setMobile(value)
    }

    // 图片上传函数(待封装)
    function uploadLoader(data = {}) {
        let i = data.i ? data.i : 0
        let success = data.success ? data.success : 0//上传成功的个数
        let fail = data.fail ? data.fail : 0;//上传失败的个数
        let upload = data.upload ? data.upload : []//上传成功后记录的url数组
        Taro.showLoading({
            title: `正在上传第${i + 1}张`
        })
        console.log('i=' + i)
        console.log(data.path[i])
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
            filePath: data.path[i],
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
                    upload.push(resultData.data.url)
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
                console.log('data.path.length:' + data.path.length)
                if (i === data.path.length) {
                    ToastSuccess('上传成功')
                    console.log('成功：' + success + " 失败：" + fail)

                    // 更新图片信息
                    console.log(upload)
                    setUpLoadImg(upload)

                    // 图片字符串在上传的时候再处理
                    // let images = ''
                    // for (let i = 0; i < upload.length; i++) {
                    //     if (i === 0) {
                    //         images = upload[i]
                    //     } else {
                    //         images = images + '|' + upload[i]
                    //     }
                    // }
                    // console.log(images)
                    // setImages(images)
                } else {
                    data.i = i
                    data.success = success
                    data.fail = fail
                    data.upload = upload
                    uploadLoader(data)
                }
            }
        })
    }

    /* 确认修改 */
    async function handleEdit() {
        console.log('修改')
        if (!ClUtils.rule.required(txtValue)) {
            Toast('请输入描述内容')
            return
        }
        if (!ClUtils.rule.phone(mobile)) {
            Toast('请输入您的联系方式')
            return
        }

        let images = ''
        for (let i = 0; i < upLoadImg.length; i++) {
            if (i === 0) {
                images = upLoadImg[i]
            } else {
                images = images + '|' + upLoadImg[i]
            }
        }


        const location = await getLocationString()
        let postData = {
            op: 'publish',
            cate_id: cateId,
            cate_name: cateName,
            content: txtValue,
            images: images,
            location: location || '',
            contact_name: name || '',
            contact_mobile: mobile || '',
        }
        console.log('#########')
        console.log(postData)
        const res = await editMyPublish(target_id, postData)
        if (res.code === 200) {
            console.log('编辑成功')
            Taro.showLoading({
                title: '加载中'
            })
            setTimeout(() => {
                Taro.hideLoading()
                Taro.switchTab({
                    url: `/pages/home/home`
                })
            }, 1500)
        } else {
            console.log('编辑失败:' + res.msg)
            Toast(res.msg)
        }
    }

    return (
        <View className='publish_edit_index'>
            <ScrollView
                className='edit_scrollview'
                scrollY
                scrollWithAnimation
                enableFlex={true}
                style={{ height: `${getWindowHeightNoPX() - 50}px` }}
            >
                <View className='info_top'>
                    <Text>#{cateName}#</Text>
                </View>
                <View className='info_input'>
                    <AtTextarea
                        count={true}
                        value={txtValue}
                        onChange={handleChangeContent}
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
                        editable={false}
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

            <View className='footer' onClick={handleEdit}>
                确认修改
            </View>
        </View>
    )

}
PublishEdit.config = {
    navigationBarTitleText: '编辑',
}