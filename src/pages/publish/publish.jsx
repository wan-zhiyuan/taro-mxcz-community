import Taro, { useState, } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import './publish.scss'

export default function Publish() {

    const [category, setCategory] = useState([
        { id: '1', name: '二手闲置', pic: '' },
        { id: '2', name: '健康食集', pic: '' },
        { id: '3', name: '邻里分享', pic: '' },
        { id: '4', name: '手机教学', pic: '' },
        { id: '5', name: '社区活动', pic: '' },
        { id: '6', name: '志愿者之家', pic: '' },
        { id: '7', name: '最美睡姿', pic: '' },
    ])

    return (
        <View className='publish_index'>
            <Image
                className='publish_top_banner'
                src='https://yanxuan.nosdn.127.net/bbd03799ba1e0cf7f37966966a0eb0bd.jpg' mode='widthFix'></Image>
            <View className='publish_main'>
                {
                    category.map((item, idx) => {
                        return (
                            <View key={'index_' + idx} className='publish_item'>
                                <Image className='publish_item_pic'></Image>
                                <Text className='publish_item_name'>{item.name}</Text>
                            </View>
                        )

                    })
                }
            </View>
        </View>
    )
}

Publish.config = {
    navigationBarTitleText: '发布信息',
}