import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtTextarea, AtImagePicker } from 'taro-ui'
import { getWindowHeight } from '../../../utils/style'
import InfoPublishHeader from './InfoPublishHeader'
import InfoPublishMain from './InfoPublishMain'
import { useDispatch, useSelector } from '@tarojs/redux'
import { increaseInfo, updateInformationApply } from '../../../actions/publish'
import { ClUtils } from "mp-colorui/dist/weapp/lib"

import './infoPublish.scss'
import { Toast, ToastSuccess } from '../../../utils/toast'

export default function InfoPublish() {

    const informationApply = useSelector(state => state.publish.informationApply)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            console.log('InfoPublish页面销毁')
            dispatch(updateInformationApply()) // 清空数据
        }
    }, [])

    async function handlePublish() {
        console.log('发布')
        let data = JSON.parse(JSON.stringify(informationApply))
        // 判断数据
        if (!ClUtils.rule.required(data.cate_name || '')) {
            Toast('请选择主题分类')
            return
        }
        if (!ClUtils.rule.required(data.title || '')) {
            Toast('请输入标题')
            return
        }
        if (!ClUtils.rule.required(data.content || '')) {
            Toast('请输入资讯内容')
            return
        }
        if (ClUtils.rule.required(data.video_url || '') && !ClUtils.rule.url(data.video_url || '')) { //video_url有内容并且是不合法的url时
            Toast('视频链接不合法')
            return
        }
        data.op = 'information'
        const res = await increaseInfo(data)
        if (res.code === 200) {
            console.log('资讯信息发布成功')
            ToastSuccess('资讯信息发布成功')

            Taro.showLoading()
            setTimeout(() => {
                Taro.hideLoading()
                Taro.switchTab({
                    url: `/pages/home/home`
                })
            }, 1500)
        } else {
            Toast(res.msg)
        }
    }

    return (
        <View className='info_publish_index'>
            <InfoPublishHeader />
            {/* 发布信息主要内容：标题、内容、图片、视频链接 */}
            <InfoPublishMain />
            {/* 发布按钮 */}
            <View className='publish_button' onClick={handlePublish}>发  布</View>
        </View>
    )

}
InfoPublish.config = {
    navigationBarTitleText: '资讯发布',
}