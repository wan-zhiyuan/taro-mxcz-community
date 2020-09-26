import Taro, { useState } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import { AtImagePicker, AtDivider, AtTextarea } from 'taro-ui'
import { useDispatch, useSelector } from '@tarojs/redux'
import { updateBusinessApply } from '../../../../actions/community'
import { Toast, ToastSuccess } from '../../../../utils/toast'

import './index.scss'

/* 第五部分：商家介绍 商家详情图 */
export default function Index() {

    const businessApply = useSelector(state => state.community.businessApply)
    const dispatch = useDispatch()

    const [intrTxt, setIntrTxt] = useState('')
    const [picFiles, setPicFiles] = useState([])
    const [showUploadBtn, setShowUploadBtn] = useState(true)
    const [upLoadImg, setUpLoadImg] = useState([])

    // files值发生变化时触发
    function onChange(files, doType, index) {
        console.log(files)
        console.log('doType=' + doType)
        console.log('index=' + index) // 删除图片的位置
        setPicFiles(files)
        if (doType === 'remove') {
            // 删除已上传的图片地址(只能操作upLoadImg 注意使用深拷贝数组)
            let newArray = [].concat(JSON.parse(JSON.stringify(upLoadImg))); // 深拷贝数组
            console.log(newArray)
            newArray.splice(index, 1)
            let images = ''
            for (let i = 0; i < newArray.length; i++) {
                if (i === 0) {
                    images = newArray[i]
                } else {
                    images = images + '|' + newArray[i]
                }
            }
            console.log(images)
            // 更新商家轮播图
            let data = JSON.parse(JSON.stringify(businessApply))
            data.details = images
            dispatch(updateBusinessApply(data))
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
        if (files.length === 8) {
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

    function handleIntrChange(v) {
        setIntrTxt(v)
    }
    function handleIntrBlur(v) {
        let data = JSON.parse(JSON.stringify(businessApply))
        data.memo = v.detail.value
        dispatch(updateBusinessApply(data))
    }

    // 图片上传函数
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

                    // 优化点：如何封装 图片数组题提交函数，需要把成功处理 和 失败处理的函数传入进去
                    // 更新提交信息
                    console.log(upload)
                    let images = ''
                    for (let i = 0; i < upload.length; i++) {
                        if (i === 0) {
                            images = upload[i]
                        } else {
                            images = images + '|' + upload[i]
                        }
                    }
                    console.log(images)
                    setUpLoadImg(upload)
                    // 更新商家轮播图
                    let data = JSON.parse(JSON.stringify(businessApply))
                    data.details = images
                    dispatch(updateBusinessApply(data))

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

    return (
        <View className='locate_part_5'>
            <View className='title'>
                商家介绍
            </View>
            <View className='introduction'>
                <AtTextarea
                    value={intrTxt}
                    onChange={handleIntrChange}
                    maxLength={1000}
                    placeholder='请输入商家介绍'
                    onBlur={handleIntrBlur}
                />
            </View>
            {/* 分割线 */}
            <View className='divider'>
                {/* <AtDivider content='' lineColor='#ccc' /> */}
            </View>
            <View className='title'>
                商家详情图（690*370）
            </View>
            <View className='select_pic'>
                <AtImagePicker
                    multiple={true}
                    length={4} // 单行图片数量
                    count={8} // 最多可选图片数量
                    files={picFiles}
                    mode="scaleToFill"
                    onChange={onChange}
                    onFail={onFail}
                    onImageClick={onImageClick}
                    showAddBtn={showUploadBtn} //是否显示添加图片按钮
                />
            </View>
        </View>
    )
}