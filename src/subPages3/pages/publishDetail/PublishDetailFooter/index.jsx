import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { useDispatch, useSelector } from '@tarojs/redux'
import { publishExtend, dispatchPublishDetail, delPublishExtend } from '../../../../actions/publish'
import { ToastSuccess } from '../../../../utils/toast'

import './index.scss'


export default function Index(props) {

    const { target_id, repost } = props

    const publishDetail = useSelector(state => state.publish.publishDetail)
    const dispatch = useDispatch()

    /* 收藏 */
    function handleCollect() {
        let postData = {
            op: 'publish_extend',
            target_id,
            type: 3,
            content: '',
        }
        publishExtend(postData).then(res => {
            if (res.code === 200) {
                ToastSuccess('收藏成功')
                dispatch(dispatchPublishDetail(target_id))
            }
        })
    }
    /* 取消收藏 */
    function handleCancelCollect() {
        let postData = {
            op: 'del_publish_extend',
            target_id,
            type: 3,
        }
        delPublishExtend(postData).then(res => {
            if (res.code === 200) {
                ToastSuccess('收藏取消')
                dispatch(dispatchPublishDetail(target_id))
            }
        })
    }

    /* 转发 */
    function handleRepost() {
        // 弹出一个弹层，包括转发给好友，转发海报
        // 把这个分享层，做成了一个公共组件，onShareAppMessage要放在父组件中！！！！
        // 显示/关闭 弹层的方法，也在父组件中，也就是说，在子组件中点击关闭按钮，来触发父组件中的关闭事件！！！！
        repost()
    }
    /* 评论 */
    function handleComment() {
        Taro.navigateTo({
            url: `/subPages1/pages/commentPage/commentPage?type=publish&target_id=${target_id}`
        })
    }

    return (
        <View className='publish_detail_footer'>
            <View className='footer_left'>
                <View className='footer_item' onClick={() => { Taro.switchTab({ url: '/pages/home/home' }) }}>
                    <AtIcon prefixClass='icon' value='shouye' size='26' color='#333'></AtIcon>
                    <Text className='item_txt'>首页</Text>
                </View>
                {
                    publishDetail.is_collect === 0
                        ? (
                            // 未收藏
                            <View className='footer_item' onClick={handleCollect}>
                                <AtIcon prefixClass='icon' value='weishoucang' size='26' color='#333'></AtIcon>
                                <Text className='item_txt'>收藏</Text>
                            </View>
                        ) : (
                            // 已收藏
                            <View className='footer_item' onClick={handleCancelCollect}>
                                <AtIcon prefixClass='icon' value='yishoucang' size='26' color='#00D8A0'></AtIcon>
                                <Text className='item_txt' style={{ color: '#00D8A0' }}>已收藏</Text>
                            </View>
                        )
                }
                <View className='footer_item' onClick={handleRepost}>
                    <AtIcon prefixClass='icon' value='zhuanfa' size='26' color='#333'></AtIcon>
                    <Text className='item_txt'>转发</Text>
                </View>
            </View>
            <View className='footer_right' onClick={handleComment}>
                我要评论
                </View>
        </View>
    )
}

Index.defaultProps = {
    target_id: 0,
    repost: () => { },
}