import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

/* 活动列表展示时每一项item */
export default function Index(props) {

    const { activityItem } = props

    function onImageClick(item) {
        Taro.previewImage({
            urls: [item]
            // urls: [getImagePath(item)]
        })
    }

    return (
        <View className='activity_item'>
            <View className='activity_item_box'>
                <View className='item_top'>
                    <View className='item_user'>
                        {
                            activityItem.avatar
                                ? <Image className='user_avatar' src={activityItem.avatar} mode='scaleToFill'></Image>
                                : <Image className='user_avatar_default'></Image>
                        }
                        <View className='item_user_right'>
                            <Text className='user_name'>{activityItem.realname || ''}</Text>
                            <Text className='item_cate'>二手闲置</Text>
                        </View>
                    </View>
                    <View className='item_detail'>{`查看详情>>`}</View>
                </View>
                <View className='item_desc'>{activityItem.desc || ''}</View>
                {/* 最多只显示四张 */}
                {
                    activityItem.picArr.length !== 0 &&
                    <View className='item_pic'>
                        {
                            activityItem.picArr.map((item, idx) => {
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
                    <Text className='item_time'>{activityItem.publishTime || ''}发布</Text>
                    <View className='msg_right'>
                        <View className='item_read'>
                            <AtIcon prefixClass='icon' value='liulan' size='12px' color='#333'></AtIcon>
                            <Text style={{ marginLeft: Taro.pxTransform(8) }}>{activityItem.read || 0}</Text>
                            <Text>浏览</Text>
                        </View>
                        <View className='item_like'>
                            <AtIcon prefixClass='icon' value='dianzan' size='12px' color='#333'></AtIcon>
                            <Text style={{ marginLeft: Taro.pxTransform(8) }}>{activityItem.like || 0}</Text>
                            <Text>赞</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

Index.defaultProps = {
    activityItem: {
        picArr: []
    }
}