import Taro, { useState, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtTextarea, AtImagePicker, AtForm, AtInput, AtButton } from 'taro-ui'
import { getWindowHeightNoPX } from '../../utils/style'
import { Toast } from '../../utils/toast'

import './publishInformation.scss'

export default function PublishInformation() {

    const router = useRouter()
    const { category = '' } = router.params

    const [txtValue, setTxtValue] = useState()
    const [picFiles, setPicFiles] = useState([])
    const [showUploadBtn, setShowUploadBtn] = useState(true)

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

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
    function handleChangePhone(value) {
        setPhone(value)
    }

    function handlePublish() {
        console.log('确认发布')
        Toast('确认发布')
    }

    return (
        <View className='publish_information_index'>
            <ScrollView
                className='info_scrollview'
                scrollY
                scrollWithAnimation
                enableFlex={true}
                style={{ height: `${getWindowHeightNoPX() - 75}px` }}
            >
                <View className='info_top'>
                    <Text>#{category}#</Text>
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
                        value={phone}
                        onChange={handleChangePhone}
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

PublishInformation.config = {
    navigationBarTitleText: '发布信息',
}
