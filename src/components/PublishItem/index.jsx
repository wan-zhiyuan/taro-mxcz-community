import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon, AtTag } from 'taro-ui'
import { getDateTypeMinutes } from '../../utils/timer'
import { ClUtils } from "mp-colorui/dist/weapp/lib"
import { deleteMyPublish } from '../../actions/publish'
import { Toast, ToastSuccess } from '../../utils/toast'
import { ClText, ClTag  } from "mp-colorui"

import './index.scss'

/* 发布信息列表展示时每一项item */
export default function Index(props) {

    const { publishItem, from } = props

    // const tags = [{ text: `${publishItem.cate_name}`, color: 'cyan' }]

    function onImageClick(item, index) {
        let picArr = publishItem.images.split('|') || []
        console.log('index:' + index)
        Taro.previewImage({
            urls: picArr,
            current: item,
        })
    }

    function naviToPublishDetail() {
        Taro.navigateTo({
            url: `/subPages3/pages/publishDetail/publishDetail?target_id=${publishItem.id}`
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

    /* 删除(仅我的发布页面有删除和编辑功能) */
    async function handleDelete() {
        const res = await deleteMyPublish(publishItem.id)
        if (res.code === 200) {
            ToastSuccess('删除成功')
            // 优化点：我的发布 删除我的发布 编辑我的发布 置顶我的发布 都返回相同的数据格式，然后统一使用redux管理
            Taro.showLoading()
            setTimeout(() => {
                Taro.hideLoading()
                Taro.navigateBack() // 这里可以不用返回
            }, 1500)
        } else {
            Toast(res.msg)
        }
    }

    /* 编辑 */
    function handleEdit() {
        Taro.navigateTo({
            url: `/subPages3/pages/publishEdit/publishEdit?target_id=${publishItem.id}`
        })
    }

    return (
        <View className='publish_item'>
            <View className='publish_item_box'>
                {
                    from === 'myPublish' &&
                    <View className='extra_module'>
                        <View className='extra_item' onClick={handleEdit}>
                            <View className='edit'>编辑</View>
                        </View>
                        <View className='extra_item' onClick={handleDelete}>
                            <AtIcon value='trash' size='22' color='#ccc'></AtIcon>
                        </View>
                    </View>
                }
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
                            {/* <ClTag tags={[{ text: `${publishItem.cate_name}`, color: 'cyan' }]} shape='radius' size='small' /> */}
                        </View>
                    </View>
                    <View className='detail_distance'>
                        <View className='item_detail' onClick={naviToPublishDetail}>{`查看详情>>`}</View>
                        {
                            from === 'myPublish' || from === 'myCollect'
                                ? <Text className='item_distance'></Text>
                                : <Text className='item_distance'>{caleDistance()}</Text>
                        }

                    </View>
                </View>
                <View className='item_desc'>
                    {publishItem.content || ''}
                </View>
                {/* <ClText textColor='black'>
                    {publishItem.content || ''}
                </ClText> */}

                {/* 发布详情图片 */}
                {
                    publishItem.images !== '' &&
                    <View className='item_pic'>
                        {
                            // 最多只显示四张
                            publishItem.images.split('|').slice(0,4).map((item, idx) => {
                                return (
                                    <View key={'index_' + idx}>
                                        {
                                            !ClUtils.rule.url(item)
                                                ? <Image className='publish_pic_default'></Image>
                                                : <Image
                                                    className='publish_pic'
                                                    src={item}
                                                    mode='scaleToFill'
                                                    lazyLoad={true}
                                                    onClick={() => { onImageClick(item, idx) }}
                                                ></Image>
                                        }
                                    </View>

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
    },
    from: '',
}