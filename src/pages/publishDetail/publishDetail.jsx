import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { getWindowHeightNoPX } from '../../utils/style'
import PublishDetailHeader from './PublishDetailHeader'
import PublishDetailContent from './PublishDetailContent'
import PublishDetailComment from './PublishDetailComment'
import PublishDetailFooter from './PublishDetailFooter'

import './publishDetail.scss'

/* 用户社区发布内容的详情页面 */
export default function PublishDetail() {

    const router = useRouter()
    const { id = '' } = router.params

    const [publishDetail, setPublishDetail] = useState({
        id: 5,
        cate_name: '二手闲置',
        content: '', // 内容描述
        images: [], // 发布的图片
        read_number: 222, // 阅读数量
        comment_number: 33, // 评论数量
        like_number: 111, // 点赞数量
        create_time: 1599901136, // 创建日期，单位：秒

    })
    const [commentList, setCommentList] = useState([])

    useEffect(() => {
        // 使用id查询社区发布内容

        // 使用id查询社区发布的评论
        console.log(publishDetail.cate_name)
        // Taro.setNavigationBarTitle(String(publishDetail.cate_name) || '分类名称')
    }, [])

    return (
        <View className='publish_detail_index'>
            <ScrollView
                className='publish_detail_scroll'
                scrollY
                scrollWithAnimation
                enableFlex={true}
                style={{ height: `${getWindowHeightNoPX() - 50}` }}
            >
                <PublishDetailHeader publishDetail={publishDetail} />

                <PublishDetailContent publishDetail={publishDetail} />

                <PublishDetailComment commentList={commentList}/>
            </ScrollView>
            <PublishDetailFooter />

        </View>
    )
}

PublishDetail.config = {
    navigationBarTitleText: '',
}