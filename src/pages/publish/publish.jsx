import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import Icon1 from './../../assets/images/icon1.png'
import Icon2 from './../../assets/images/icon2.png'
import Icon3 from './../../assets/images/icon3.png'
import Icon4 from './../../assets/images/icon4.png'
import Icon5 from './../../assets/images/icon5.png'
import Icon6 from './../../assets/images/icon6.png'
import Icon7 from './../../assets/images/icon7.png'
import { isEmpty } from '../../utils/is'
import { getPublishCate } from '../../actions/publish'

import './publish.scss'

export default function Publish() {

    const [category, setCategory] = useState([
        { cate_id: '1', cate_name: '二手闲置', pic: Icon1 },
        { cate_d: '2', cate_name: '健康食集', pic: Icon2 },
        { cate_id: '3', cate_name: '邻里分享', pic: Icon3 },
        { cate_id: '4', cate_name: '手机教学', pic: Icon4 },
        { cate_id: '5', cate_name: '社区活动', pic: Icon5 },
        { cate_id: '6', cate_name: '志愿者之家', pic: Icon6 },
        { cate_id: '7', cate_name: '最美睡姿', pic: Icon7 },
    ])

    useEffect(()=>{
        getPublishCate()
    },[])

    function handlePublishSubItem(item) {
        Taro.navigateTo({
            url: `/subPages3/pages/publishConfirm/publishConfirm?cate_id=${item.cate_id}&cate_name=${item.cate_name}`
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
                                className='publish_sub_item'
                                onClick={() => { handlePublishSubItem(item) }}
                            >
                                {
                                    isEmpty(item.pic)
                                    ? <Image className='publish_item_pic_default' ></Image>
                                    : <Image className='publish_item_pic' src={item.pic} mode='scaleToFill'></Image>
                                }
                                
                                <Text className='publish_item_name'>{item.cate_name}</Text>
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