import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { getDateTypeMinutes } from '../../utils/timer'

import './index.scss'

/* 活动列表展示时每一项item */
export default function Index(props) {

    const { publishItem } = props

    function onImageClick(item) {
        Taro.previewImage({
            urls: [item]
            // urls: [getImagePath(item)]
        })
    }

    function naviToPublishDetail() {
        Taro.navigateTo({
            url: `/pages/publishDetail/publishDetail?target_id=${publishItem.id}`
        })
    }

    /* 计算距离字符串 */
    function caleDistance() {
        if (publishItem.distance <= 100) {
            return `<100m`
        } else if (publishItem.distance <= 1000) {
            return `距离${publishItem.distance}m`
        } else {
            return `距离${publishItem.distance / 1000}km`
        }
    }

    return (
        <View className='activity_item'>
            <View className='activity_item_box'>
                <View className='item_top'>
                    <View className='item_user'>
                        {
                            publishItem.avatar
                                ? <Image className='user_avatar' src={publishItem.avatar} mode='scaleToFill'></Image>
                                : <Image className='user_avatar_default'></Image>
                        }
                        <View className='item_user_right'>
                            <Text className='user_name'>{publishItem.nickname || ''}</Text>
                            <Text className='item_cate'>{publishItem.cate_name}</Text>
                        </View>
                    </View>
                    <View className='detail_distance'>
                        <View className='item_detail' onClick={naviToPublishDetail}>{`查看详情>>`}</View>
                        <Text className='item_distance'>{caleDistance()}</Text>
                    </View>

                </View>
                <View className='item_desc'>{publishItem.content || ''}</View>
                {/* 最多只显示四张 */}
                {
                    publishItem.images !== '' &&
                    <View className='item_pic'>
                        {
                            publishItem.images.split('|').map((item, idx) => {
                                return (
                                    <Image
                                        key={'index_' + idx}
                                        className='bbs_pic'
                                        src={item}
                                        mode='scaleToFill'
                                        lazyLoad={true}
                                        onClick={() => { onImageClick(item) }}
                                    ></Image>
                                )
                            })
                        }
                    </View>
                }
                <View className='item_msg'>
                    <Text className='item_time'>{getDateTypeMinutes(publishItem.create_time || 0)}发布</Text>
                    <View className='msg_right'>
                        <View className='item_read'>
                            <AtIcon prefixClass='icon' value='liulan' size='12px' color='#333'></AtIcon>
                            <Text style={{ marginLeft: Taro.pxTransform(8) }}>{publishItem.read_number || 0}</Text>
                            <Text>浏览</Text>
                        </View>
                        <View className='item_like'>
                            <AtIcon prefixClass='icon' value='dianzan' size='12px' color='#333'></AtIcon>
                            <Text style={{ marginLeft: Taro.pxTransform(8) }}>{publishItem.likes_number || 0}</Text>
                            <Text>赞</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

Index.defaultProps = {
    publishItem: {
        images: ''
    }
}