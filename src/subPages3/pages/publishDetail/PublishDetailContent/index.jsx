import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { useDispatch, useSelector } from '@tarojs/redux'
import { publishExtend, dispatchPublishDetail } from '../../../../actions/publish'
import { Toast, ToastSuccess } from '../../../../utils/toast'
import { getDateTypeMinutes } from '../../../../utils/timer'

import './index.scss'

export default function Index(props) {

    const { target_id } = props

    const isLike = useSelector(state => state.publish.publishDetail.is_like)
    const publishDetail = useSelector(state => state.publish.publishDetail.basic)
    const dispatch = useDispatch()

    async function handleLike() {
        if (Number(isLike) === 0) {
            // 喜欢+1
            let postData = {
                op: 'publish_extend',
                target_id,
                type: 1, // 0-阅读 1-点赞 2-评论
                content: ''
            }
            const res = await publishExtend(postData)
            if (res.code === 200) {
                ToastSuccess('点赞成功')
                dispatch(dispatchPublishDetail(target_id))
            } else {
                Toast('点赞失败')
            }
        }
    }

    return (
        <View className='publish_detail_content'>
            <Text className='content_txt'>{publishDetail.content}</Text>
            {
                publishDetail.images !== '' &&
                <View>
                    {
                        publishDetail.images.split('|').map((item, idx) => {
                            return (
                                <Image
                                    key={'index_' + idx}
                                    className='content_image'
                                    src={item}
                                    mode='widthFix'></Image>
                            )
                        })
                    }
                </View>
            }
            <View className='content_read_like'>
                <View className='item_read'>
                    <AtIcon prefixClass='icon' value='liulan' size='16px' color='#333'></AtIcon>
                    <Text style={{ marginLeft: Taro.pxTransform(16), color: '#ff0044' }}>{publishDetail.read_number || 0}</Text>
                    <Text>人浏览</Text>
                </View>
                <View className='item_like' onClick={handleLike}>
                    {
                        Number(isLike) === 0
                            ? <AtIcon prefixClass='icon' value='dianzan' size='16px' color='#333'></AtIcon>
                            : <AtIcon prefixClass='icon' value='dianzan' size='16px' color='#00D8A0'></AtIcon>
                    }

                    <Text style={{ marginLeft: Taro.pxTransform(16), color: '#ff0044' }}>{publishDetail.likes_number || 0}</Text>
                    <Text>人点赞</Text>
                </View>
            </View>
            <Text className='content_publish_time'>
                {`发布时间:${getDateTypeMinutes(Number(publishDetail.create_time || 0))}`}
            </Text>

        </View>
    )
}
Index.defaultProps = {
    target_id: 0
}