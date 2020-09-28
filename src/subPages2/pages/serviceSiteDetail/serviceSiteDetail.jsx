import Taro, { useState, useEffect, useRouter, useShareAppMessage } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { getServiceSiteDetail } from '../../../actions/community'
import SiteDetailHeader from './SiteDetailHeader'
import SiteDetailContent from './SiteDetailContent'
import SiteDetailFooter from './SiteDetailFooter'
import ShareComponent from '../../../components/ShareComponent'
import { useDispatch, useSelector } from '@tarojs/redux'

import './serviceSiteDetail.scss'

export default function ServiceSiteDetail() {

    const router = useRouter()
    const { target_id } = router.params

    const [detail, setDetail] = useState({})
    const [isOpenedShare, setIsOpenedShare] = useState(false)

    useEffect(() => {
        async function getDetail() {
            const res = await getServiceSiteDetail(target_id)
            console.log(res)
            setDetail(res.data.basic || {})
        }
        getDetail()
    }, [])

    useShareAppMessage(res => {
        if (res.from === 'button') {
            return {
                title: `盟享诚珍社区服务站-${detail.company_name}`,
                path: `/pages/home/home?target=serviceSiteDetail&target_id=${target_id}`,
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
        <View className='service_site_detail_index'>
            {/* 分享弹层组件 */}
            <ShareComponent isOpened={isOpenedShare} onClose={handleCloseShare} showBill={false} />
            <SiteDetailHeader detail={detail} />
            <SiteDetailContent detail={detail} />
            <SiteDetailFooter detail={detail} repost={handleOpenShare} />
        </View>
    )

}
ServiceSiteDetail.config = {
    navigationBarTitleText: '服务站详情',
}