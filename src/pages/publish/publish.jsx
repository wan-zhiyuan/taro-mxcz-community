import Taro, { useState, } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import Icon1 from './../../assets/images/icon1.png'
import Icon2 from './../../assets/images/icon2.png'
import Icon3 from './../../assets/images/icon3.png'
import Icon4 from './../../assets/images/icon4.png'
import Icon5 from './../../assets/images/icon5.png'
import Icon6 from './../../assets/images/icon6.png'
import Icon7 from './../../assets/images/icon7.png'
import { isEmpty } from '../../utils/is'

import './publish.scss'

export default function Publish() {

    const [category, setCategory] = useState([
        { id: '1', name: '二手闲置', pic: Icon1 },
        { id: '2', name: '健康食集', pic: Icon2 },
        { id: '3', name: '邻里分享', pic: Icon3 },
        { id: '4', name: '手机教学', pic: Icon4 },
        { id: '5', name: '社区活动', pic: Icon5 },
        { id: '6', name: '志愿者之家', pic: Icon6 },
        { id: '7', name: '最美睡姿', pic: Icon7 },
    ])

    function handlePublishItem(item) {
        Taro.navigateTo({
            url: `/pages/publishInformation/publishInformation?category=${item.name}`
        })
    }

    return (
        <View className='publish_index'>
            <Image
                className='publish_top_banner'
                src='https://yanxuan.nosdn.127.net/bbd03799ba1e0cf7f37966966a0eb0bd.jpg' mode='widthFix'></Image>
            <View className='publish_main'>
                {
                    category.map((item, idx) => {
                        return (
                            <View
                                key={'index_' + idx}
                                className='publish_item'
                                onClick={() => { handlePublishItem(item) }}
                            >
                                {
                                    isEmpty(item.pic)
                                    ? <Image className='publish_item_pic_default' ></Image>
                                    : <Image className='publish_item_pic' src={item.pic} mode='scaleToFill'></Image>
                                }
                                
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