import Taro, { useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { getDateTypeMinutes } from '../../../utils/timer'

import './index.scss'

export default function Index(props) {

    const { publishDetail } = props

    useEffect(() => {
        console.log(publishDetail.create_time)
        console.log(getDateTypeMinutes(publishDetail.create_time))
    }, [])

    return (
        <View className='publish_detail_content'>
            <Text>{publishDetail.content}</Text>
            {
                publishDetail.images.map((item, idx) => {
                    return (
                        <Image
                            key={'index_' + idx}
                            className='content_image'
                            src={item}
                            mode='widthFix'></Image>
                    )
                })
            }
            <View className='content_read_like'>
                <View className='item_read'>
                    <AtIcon prefixClass='icon' value='liulan' size='16px' color='#333'></AtIcon>
                    <Text style={{ marginLeft: Taro.pxTransform(16), color:'#ff0044' }}>{publishDetail.read_number || 0}</Text>
                    <Text>人浏览</Text>
                </View>
                <View className='item_like'>
                    <AtIcon prefixClass='icon' value='dianzan' size='16px' color='#333'></AtIcon>
                    <Text style={{ marginLeft: Taro.pxTransform(16), color:'#ff0044' }}>{publishDetail.like_number || 0}</Text>
                    <Text>人点赞</Text>
                </View>
            </View>
            <Text className='content_publish_time'>
                {`发布时间:${getDateTypeMinutes(Number(publishDetail.create_time)) || ''}`}
            </Text>
            
        </View>
    )
}

Index.defaultProps = {
    publishDetail: {
        images: [],
        create_time: 0,
    },
}