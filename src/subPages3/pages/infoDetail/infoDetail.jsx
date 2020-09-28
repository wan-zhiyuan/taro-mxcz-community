import Taro, { useState, useEffect, useRouter, useDidShow, useShareAppMessage } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { getWindowHeightNoPX } from '../../../utils/style'
import InfoDetailHeader from './InfoDetailHeader'
import InfoDetailContent from './InfoDetailContent'
import InfoDetailLike from './InfoDetailLike'
import InfoDetailComment from './InfoDetailComment'
import InfoDetailFooter from './InfoDetailFooter'
import { useDispatch, useSelector } from '@tarojs/redux'
import { getInformationDetail, dispatchInformationDetail, informationExtend } from '../../../actions/publish'
import ShareComponent from '../../../components/ShareComponent'

import './infoDetail.scss'

export default function InfoDetail() {

    const router = useRouter()
    const { target_id = 0 } = router.params
    const informationDetail = useSelector(state => state.publish.informationDetail)
    const dispatch = useDispatch()

    const [isOpenedShare, setIsOpenedShare] = useState(false)

    useEffect(() => {
        // 阅读数+1
        let postData = {
            op: 'information_extend',
            target_id,
            type: 0, // 0-阅读
            content: ''
        }
        informationExtend(postData)
    }, [])

    useDidShow(() => {
        dispatch(dispatchInformationDetail(target_id))
    })

    useShareAppMessage(res => {
        if (res.from === 'button') {
            return {
                title: `盟享诚珍-${informationDetail.basic.title}`,
                path: `/pages/home/home?target=informationDetail&target_id=${target_id}`,
                imageUrl: ''
            }
        }
        return {
            title: '盟享诚珍社区', // 分享卡片展示的标题
            path: '/pages/home/home', // 分享卡片的路径
            imageUrl: '',
        }
    })

    /* 关闭分享弹层 */
    function handleCloseShare() {
        setIsOpenedShare(false)
    }
    function handleOpenShare() {
        setIsOpenedShare(true)
    }

    return (
        <View className='info_detail_index'>
            {/* 分享弹层组件 */}
            <ShareComponent isOpened={isOpenedShare} onClose={handleCloseShare} showBill={false} />
            <ScrollView
                className='main'
                style={{ height: `${getWindowHeightNoPX() - 50}px` }}
                scrollY
                scrollWithAnimation
            >
                <InfoDetailHeader />
                <InfoDetailContent />
                <InfoDetailLike />
                <InfoDetailComment />
                <View style={{ height: '20px' }}></View>
            </ScrollView>
            <View className='footer'>
                <InfoDetailFooter target_id={target_id} repost={handleOpenShare} />
            </View>
        </View>
    )

}
InfoDetail.config = {
    navigationBarTitleText: '资讯',
}