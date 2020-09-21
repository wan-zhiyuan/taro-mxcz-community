import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

export default function Index(props) {

    const { target_id } = props

    function handleCollect() {

    }
    function handleRepost() {
        // 弹出一个弹层，包括转发给好友，转发海报
        // 把这个分享层，做成了一个公共组件，onShareAppMessage要放在父组件中！！！！
        // 显示/关闭 弹层的方法，也在父组件中，也就是说，在子组件中点击关闭按钮，来触发父组件中的关闭事件！！！！

        
    }
    function handleComment() {
        // 跳转到评论页面，完成评论后返回页面，并且刷新页面数据
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
    target_id: 0
}