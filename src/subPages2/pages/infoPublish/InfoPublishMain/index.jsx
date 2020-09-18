import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtTextarea, AtImagePicker } from 'taro-ui'

import './index.scss'

export default function Index(props) {

    const { } = props

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [images, setImages] = useState([])
    const [showUploadBtn, setShowUploadBtn] = useState(true)
    const [videoUrl, setVideoUrl] = useState('')

    function handleChangeTitle(v) {
        setTitle(v)
    }
    function handleChangeContent(v) {
        setContent(v)
    }

    // files值发生变化时触发
    function onChange(files, doType, index) {
        console.log(files)
        console.log('doType=' + doType)
        console.log('index=' + index) // 删除图片的位置
        setImages(files)
        if (files.length === 8) {
            setShowUploadBtn(false)
        } else {
            setShowUploadBtn(true)
        }
        if (doType === 'remove') {
            
        } else {
            
        }
    }

    function handleChangeUrl(v) {
        setVideoUrl(v)
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
                    value={title}
                    onChange={handleChangeTitle}
                />
            </View>
            <View className='content'>
                <AtTextarea
                    value={content}
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
                    files={images}
                    mode="scaleToFill"
                    onChange={onChange}
                    // onFail={onFail}
                    // onImageClick={onImageClick}
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
                    value={videoUrl}
                    onChange={handleChangeUrl}
                />
            </View>
        </View>
    )
}
Index.defaultProps = {

}
