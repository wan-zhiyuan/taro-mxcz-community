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
        // 内容描述
        content: '新胜社区在履行胜利街道创建四邻社区工作要求的同时，根据对以往的工作总结，形成“领”“帮”“引”“带”“聚”“融”“推”“享”的八字工作法，扎实推进四邻社区工作常态化、制度化运行。\n社区“领”路，走近群众\n在四邻责任社区的创建过程中充分发挥社区的主导作用，实现社区牵头、统领全局、科学设计、系统谋划，全面推进，为营造四邻社区赋予五大职能，即指挥决策、民需征集、资源统筹、实践载体策划、长效运行保障。新胜社区成立四邻建设专项队伍，组织网格员入户走访，了解群众所需，整理汇总详细分析，召开居民代表专项会议，征集民意群策群力，用真情和真心拉近社区与居民之间的关系，打造熟人社区，激活基层群众自觉性和创造性。', 
        images: [
            'http://0.rc.xiniu.com/g1/M00/A7/89/CgAGTFjLml-AK0u8AAOlv9Gxors475.jpg',
            // 'http://0.rc.xiniu.com/g1/M00/A7/89/CgAGTFjLmlyALvzuAAMlwfOz4ms167.jpg',
            // 'http://0.rc.xiniu.com/g1/M00/A7/89/CgAGTFjLml2AY1iGAAM3svfTX_E935.jpg',
            // 'http://0.rc.xiniu.com/g1/M00/A7/89/CgAGTFjLmmCAVzksAANpVQBy_JE934.jpg',
            // 'http://0.rc.xiniu.com/g1/M00/A7/89/CgAGTFjLmmGAcKM8AALUKDI6l5E915.jpg',
            // 'http://0.rc.xiniu.com/g1/M00/A7/89/CgAGTFjLmmKAT6w8AAN5CqstMc4303.jpg',

        ], // 发布的图片
        read_number: 222, // 阅读数量
        comment_number: 33, // 评论数量
        like_number: 111, // 点赞数量
        create_time: 1599901136, // 创建日期，单位：秒

    })
    const [commentList, setCommentList] = useState([1,2,3,4])

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
                style={{ height: `${getWindowHeightNoPX() - 50}px` }}
            >
                {/* 头部信息 */}
                <PublishDetailHeader publishDetail={publishDetail} />
                {/* 发布的主要内容 */}
                <PublishDetailContent publishDetail={publishDetail} />
                {/* scrolView设置enableFlex后，无内容的组件将不会撑开 */}
                <View style={{width:'100%',height:'20px',backgroundColor:'#f2f2f2', color:'#f2f2f2'}}>1</View>
                {/* 评论 */}
                <PublishDetailComment commentList={commentList} comment_number={publishDetail.comment_number}/>
                <View style={{width:'100%',height:'20px',backgroundColor:'#f2f2f2', color:'#f2f2f2'}}>1</View>
            </ScrollView>
            <PublishDetailFooter />

        </View>
    )
}

PublishDetail.config = {
    navigationBarTitleText: '',
}