import Taro, { useState, useEffect, useRouter, useDidShow, useShareAppMessage } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import PublishDetailHeader from './PublishDetailHeader'
import PublishDetailContent from './PublishDetailContent'
import PublishDetailComment from './PublishDetailComment'
import PublishDetailFooter from './PublishDetailFooter'
import { getPublishDetail, dispatchPublishDetail, publishExtend } from '../../../actions/publish'
import { getWindowHeightNoPX } from '../../../utils/style'
import { useDispatch } from '@tarojs/redux'
import ShareComponent from '../../../components/ShareComponent'

import './publishDetail.scss'

/* 用户社区发布内容的详情页面 */
export default function PublishDetail() {

    const router = useRouter()
    const { target_id = 0 } = router.params
    const dispatch = useDispatch()

    const [isOpenedShare, setIsOpenedShare] = useState(false)

    useEffect(() => {
        // 阅读数+1
        doPublishExtend(0,'')
    }, [])

    useDidShow(() => {
        dispatch(dispatchPublishDetail(target_id))
    })

    useShareAppMessage(res => {
        if (res.from === 'button') {
            // 分享+1
            doPublishExtend(3,'')
            return {
                title: `盟享诚珍-发布信息`,
                path: `/pages/home/home?target=publishDetail&target_id=${target_id}`,
                imageUrl: ''
            }
        }
        return {
            title: '盟享诚珍社区', // 分享卡片展示的标题
            path: '/pages/home/home', // 分享卡片的路径
            imageUrl: '',
        }
    })

    /* 发布信息：0-阅读 1-点赞 2-评论 (3-分享 4-收藏) */
    function doPublishExtend(type=0, content='') {
        let postData = {
            op: 'publish_extend',
            target_id,
            type,
            content,
        }
        publishExtend(postData)
    }


    // 评论分页暂时未完成

    /* 关闭分享弹层 */
    function handleCloseShare() {
        setIsOpenedShare(false)
    }
    function handleOpenShare() {
        setIsOpenedShare(true)
    }

    return (
        <View className='publish_detail_index'>
            {/* 分享弹层组件 */}
            <ShareComponent isOpened={isOpenedShare} onClose={handleCloseShare} />
            <ScrollView
                className='publish_detail_scroll'
                scrollY
                scrollWithAnimation
                enableFlex={true}
                style={{ height: `${getWindowHeightNoPX() - 50}px` }}
            >
                {/* 头部信息 */}
                <PublishDetailHeader />
                {/* 发布的主要内容 */}
                <PublishDetailContent target_id={target_id} />
                {/* scrolView设置enableFlex后，无内容的组件将不会撑开 */}
                <View style={{ width: '100%', height: '20px', backgroundColor: '#f2f2f2', color: '#f2f2f2' }}>1</View>
                {/* 评论 */}
                <PublishDetailComment />
                <View style={{ width: '100%', height: '20px', backgroundColor: '#f2f2f2', color: '#f2f2f2' }}>1</View>
            </ScrollView>
            <PublishDetailFooter target_id={target_id} repost={handleOpenShare} />

        </View>
    )
}

PublishDetail.config = {
    navigationBarTitleText: '',
}