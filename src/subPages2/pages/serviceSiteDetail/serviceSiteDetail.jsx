import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { getServiceSiteDetail } from '../../../actions/community'
import SiteDetailHeader from './SiteDetailHeader'
import SiteDetailContent from './SiteDetailContent'
import SiteDetailFooter from './SiteDetailFooter'

import './serviceSiteDetail.scss'

export default function ServiceSiteDetail() {

    const router = useRouter()
    const { target_id } = router.params

    const [detail, setDetail] = useState({})

    useEffect(() => {
        async function getDetail() {
            const res = await getServiceSiteDetail(target_id)
            console.log(res)
            setDetail(res.data.basic || {})
        }
        getDetail()
    }, [])

    return (
        <View className='service_site_detail_index'>
            <SiteDetailHeader detail={detail}/>
            <SiteDetailContent detail={detail}/>
            <SiteDetailFooter detail={detail}/>
        </View>
    )

}
ServiceSiteDetail.config = {
    navigationBarTitleText: '服务站详情',
}