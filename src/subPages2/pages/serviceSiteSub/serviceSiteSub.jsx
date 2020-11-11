import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { getWindowHeight } from '../../../utils/style'
import ServiceSiteList from '../serviceSite/ServiceSiteList'
import { getCommunityServiceSite } from '../../../actions/community'

import './serviceSiteSub.scss'

export default function ServiceSiteSub() {

    const router = useRouter()
    const { cate_id = 0, cate_name = '' } = router.params

    const [isLoaded, setIsLoaded] = useState(false) // list是否已经请求完毕
    const [serviceSiteList, setServiceSiteList] = useState([])

    useEffect(() => {
        Taro.setNavigationBarTitle({
            title: cate_name || ''
        })
        async function getServiceSiteList() {
            const res = await getCommunityServiceSite('', cate_name, 0)
            if (res.code === 200) {
                setIsLoaded(true)
                setServiceSiteList(res.data)
            }
        }
        getServiceSiteList()
    }, [])

    return (
        <View className='service_site_sub_index'>
            <ServiceSiteList list={serviceSiteList} isLoaded={isLoaded} />


        </View>
    )

}
ServiceSiteSub.config = {
    navigationBarTitleText: '服务站子列表',
}