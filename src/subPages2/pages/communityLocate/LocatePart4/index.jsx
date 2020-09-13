import Taro, { useState } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtImagePicker } from 'taro-ui'

import './index.scss'

export default function Index() {

    const [picFiles, setPicFiles] = useState([])
    const [showUploadBtn, setShowUploadBtn] = useState(true)

    // files值发生变化时触发
    function onChange(files, doType, index) {
        console.log(files)
        console.log('doType=' + doType)
        console.log('index=' + index) // 删除图片的位置
        setPicFiles(files)
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

    return (
        <View className='locate_part_4'>
            <View className='title'>
                商家轮播图（建议：690*370）
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