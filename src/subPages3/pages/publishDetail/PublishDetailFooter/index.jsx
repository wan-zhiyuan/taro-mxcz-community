import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { publishExtend } from '../../../../actions/publish'

import './index.scss'
import { ToastSuccess } from '../../../../utils/toast'

export default function Index(props) {

    const { target_id, repost } = props

    /* 收藏 */
    function handleCollect() {
        let postData = {
            op: 'publish_extend',
            target_id,
            type: 4,
            content: '',
        }
        publishExtend(postData).then(res => {
            if (res.code === 200) {
                ToastSuccess('收藏成功')
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
                <View className='footer_item' onClick={handleCollect}>
                    <AtIcon prefixClass='icon' value='xingji' size='26' color='#333'></AtIcon>
                    <Text className='item_txt'>收藏</Text>
                </View>
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
    repost: ()=>{},
}