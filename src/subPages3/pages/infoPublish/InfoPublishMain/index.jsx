import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtTextarea, AtImagePicker } from 'taro-ui'
import { useDispatch, useSelector } from '@tarojs/redux'
import { updateInformationApply } from '../../../../actions/publish'
import { ToastSuccess } from '../../../../utils/toast'

import './index.scss'

export default function Index(props) {

    const { } = props

    const informationApply = useSelector(state => state.publish.informationApply)
    const dispatch = useDispatch()

    const [picFiles, setPicFiles] = useState([])
    const [showUploadBtn, setShowUploadBtn] = useState(true)
    const [upLoadImg, setUpLoadImg] = useState([])
    const [videoUrl, setVideoUrl] = useState('')

    /* 标题 */
    function handleChangeTitle(v) {
        let data = JSON.parse(JSON.stringify(informationApply))
        data.title = v
        dispatch(updateInformationApply(data))
    }
    /* 内容 */
    function handleChangeContent(v) {
        let data = JSON.parse(JSON.stringify(informationApply))
        data.content = v
        dispatch(updateInformationApply(data))
    }

    // files值发生变化时触发
    function onChange(files, doType, index) {
        console.log(files)
        console.log('doType=' + doType)
        console.log('index=' + index) // 删除图片的位置
        setPicFiles(files)
        if (doType === 'remove') {
            // 删除已上传的图片地址
            let newArray= [].concat(JSON.parse(JSON.stringify(upLoadImg))); // 深拷贝数组
            newArray.splice(index, 1)
            let images = ''
            for (let i = 0; i < newArray.length; i++) {
                if (i === 0) {
                    images = newArray[i]
                } else {
                    images = images + '|' + newArray[i]
                }
            }
            // 更新数据
            let data = JSON.parse(JSON.stringify(informationApply))
            data.images = images
            dispatch(updateInformationApply(data))

        } else {
            // 执行上传图片
            /* --------------------- */
            let picUrlArr = []
            for (let i = 0; i < files.length; i++) {
                picUrlArr.push(files[i].url)
            }
            console.log('picUrlArr')
            console.log(picUrlArr)
            uploadLoader({ path: picUrlArr })
            /* --------------------- */
        }

        if (files.length === 8) {
            setShowUploadBtn(false)
        } else {
            setShowUploadBtn(true)
        }

    }

    /* 视频链接 */
    function handleChangeUrl(v) {
        let data = JSON.parse(JSON.stringify(informationApply))
        data.video_url = v
        dispatch(updateInformationApply(data))
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
                if (i === data.path.length) {
                    ToastSuccess('上传成功')
                    console.log('成功：' + success + " 失败：" + fail)
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
                    // 更新数据
                    let data = JSON.parse(JSON.stringify(informationApply))
                    data.images = images
                    dispatch(updateInformationApply(data))

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
        <View className='info_publish_main'>
            <View className='title'>
                <AtInput
                    name='title'
                    title=''
                    type='text'
                    maxLength={50}
                    placeholder='标题'
                    border={false}
                    value={informationApply.title || ''}
                    onChange={handleChangeTitle}
                />
            </View>
            <View className='content'>
                <AtTextarea
                    value={informationApply.content || ''}
                    onChange={handleChangeContent}
                    maxLength={1000}
                    height={300}
                    placeholder='请输入资讯内容'
                />
            </View>
            <View className='images'>
                <AtImagePicker
                    multiple={true}
                    length={4} // 单行图片数量
                    count={8} // 最多可选图片数量
                    files={picFiles}
                    mode="scaleToFill"
                    onChange={onChange}
                    showAddBtn={showUploadBtn} //是否显示添加图片按钮
                />
            </View>
            <View className='video_url'>
                <AtInput
                    name='video_url'
                    title=''
                    type='text'
                    maxLength={100}
                    placeholder='视频链接'
                    border={false}
                    value={informationApply.video_url || ''}
                    onChange={handleChangeUrl}
                />
            </View>
        </View>
    )
}
Index.defaultProps = {

}
