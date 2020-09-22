import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

export default function Index(props) {

    const { target_id } = props

    /* 点赞 */
    function handleLike() {

    }
    function handleRepost() {
        // 同发布信息详情的分享

    }
    function handleComment() {
        // 跳转到评论页面，完成评论后返回页面，并且刷新页面数据
        Taro.navigateTo({
            url: `/subPages1/pages/commentPage/commentPage?type=information&target_id=${target_id}`
        })
    }

    return (
        <View className='info_detail_footer'>
            <View className='footer_left'>
                <View className='footer_item' onClick={() => { Taro.switchTab({ url: '/pages/home/home' }) }}>
                    <AtIcon prefixClass='icon' value='shouye' size='26' color='#333'></AtIcon>
                    <Text className='item_txt'>首页</Text>
                </View>
                <View className='footer_item' onClick={handleLike}>
                    <AtIcon prefixClass='icon' value='dianzan' size='26' color='#333'></AtIcon>
                    <Text className='item_txt'>点赞</Text>
                </View>
                <View className='footer_item' onClick={handleRepost}>
                    <AtIcon prefixClass='icon' value='zhuanfa' size='26' color='#333'></AtIcon>
                    <Text className='item_txt'>分享</Text>
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