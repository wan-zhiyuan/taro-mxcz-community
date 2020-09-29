import Taro, { useState, useEffect, useRouter, useShareAppMessage, useDidShow } from '@tarojs/taro'
import { View } from '@tarojs/components'
import SiteDetailHeader from './SiteDetailHeader'
import SiteDetailContent from './SiteDetailContent'
import SiteDetailFooter from './SiteDetailFooter'
import { getServiceSiteDetail, dispatchServiceSiteDetail } from '../../../actions/community'
import { useDispatch, useSelector } from '@tarojs/redux'
import ShareComponent from '../../../components/ShareComponent'
import PopupLogin from '../../../components/PopupLogin'

import './serviceSiteDetail.scss'

export default function ServiceSiteDetail() {

    const router = useRouter()
    const { target_id } = router.params

    const dispatch = useDispatch()

    const [detail, setDetail] = useState({})
    const [isOpenedShare, setIsOpenedShare] = useState(false)
    const [isLogin, setIsLogin] = useState(true)

    useEffect(() => {
        
    }, [])

    useDidShow(()=>{
        getData()
    })

    async function getData() {
        const res = await dispatch(dispatchServiceSiteDetail(target_id))
        if (res.code === 200) {
            setIsLogin(true)
            setDetail(res.data.basic || {})
        }
        if (res.code === 491) {
            setIsLogin(false)
        }
    }

    useShareAppMessage(res => {
        if (res.from === 'button') {
            return {
                title: `盟享诚珍社区服务站-${detail.company_name}`,
                path: `/pages/home/home?target=serviceSiteDetail&target_id=${target_id}`,
                // path: `/subPages2/pages/serviceSiteDetail/serviceSiteDetail?target_id=${target_id}`,
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
            {/* 登录弹窗模块 */}
            {
                !isLogin &&
                <PopupLogin />
            }
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