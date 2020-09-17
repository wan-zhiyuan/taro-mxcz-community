import Taro, { useState } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtTextarea, AtImagePicker } from 'taro-ui'
import { getWindowHeight } from '../../../utils/style'
import InfoPublishHeader from './InfoPublishHeader'
import InfoPublishMain from './InfoPublishMain'

import './infoPublish.scss'

export default function InfoPublish() {

    const[category, setCategory] = useState(['语文课','数学课','英语课','政治课','语文课','数学课','英语课','政治课','美术课','体育课','心理课','自习课'])
    const[currentCate, setCurrentCate] = useState(0)

    function changeCurrentCate(idx) {
        setCurrentCate(idx)
    }

    return (
        <View className='info_publish_index'>
            {/* <InfoPublishHeader /> */}
            <View className='info_publish_header'>
                <Text className='title'>选择主题分类</Text>
                <View className='publish_category'>
                    <ScrollView
                        className='category_scroll'
                        scrollX
                        scrollWithAnimation
                        enableFlex={true}
                    >
                        {
                            category.map((item,idx)=>{
                                return (
                                    <View 
                                    className='item_category' 
                                    key={'index_'+idx}
                                    style={(currentCate===idx)?{color:'#ff0044',borderColor:'#ff0044'}:{}}
                                    onClick={()=>{changeCurrentCate(idx)}}
                                    >
                                        {item}
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>

            {/* 发布信息主要内容：标题、内容、图片、视频链接 */}
            <InfoPublishMain />
        </View>
    )

}
InfoPublish.config = {
    navigationBarTitleText: '资讯发布',
}