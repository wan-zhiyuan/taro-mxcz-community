import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { useDispatch, useSelector } from '@tarojs/redux'
import { informationExtend, dispatchPublishDetail, dispatchInformationDetail } from '../../../../actions/publish'
import { ToastSuccess } from '../../../../utils/toast'

import './index.scss'

export default function Index(props) {

    const { target_id, repost} = props

    const informationDetail = useSelector(state => state.publish.informationDetail)
    const dispatch = useDispatch()

    /* 点赞 */
    function handleLike() {
        let postData = {
            op: 'information_extend',
            target_id,
            type: 1,
            content: '',
        }
        informationExtend(postData).then(res => {
            if (res.code === 200) {
                ToastSuccess('点赞成功')
                dispatch(dispatchInformationDetail(target_id))
            }
        })
    }
    /* 转发 */
    function handleRepost() {
        repost()
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
                {
                    informationDetail.is_like === 0
                        ? (
                            <View className='footer_item' onClick={handleLike}>
                                <AtIcon prefixClass='icon' value='dianzan' size='26' color='#333'></AtIcon>
                                <Text className='item_txt'>点赞</Text>
                            </View>
                        ) : (
                            <View className='footer_item' onClick={()=>{}}>
                                <AtIcon prefixClass='icon' value='dianzan' size='26' color='#00D8A0'></AtIcon>
                                <Text className='item_txt' style={{ color: '#00D8A0' }}>已点赞</Text>
                            </View>
                        )
                }
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
    target_id: 0,
    repost: ()=>{},
}