import Taro, { useState, useShareAppMessage } from '@tarojs/taro'
import { View } from '@tarojs/components'
import LocateHeader from './LocateHeader'
import LocateAddress from './LocateAddress'
import LocateInfo from './LocateInfo'
import LocateIntroduction from './LocateIntroduction'
import LocateFooter from './LocateFooter'

import './serviceSiteLocate.scss'

export default function ServiceSiteLocate() {

    useShareAppMessage(res => {
        return {
            title: `盟享诚珍-服务站入驻`,
            path: `/pages/home/home?target=serviceSiteLocate`,
            imageUrl: ''
        }
    })

    return (
        <View className='service_site_locate_index'>
            <LocateHeader />
            <LocateAddress />
            <LocateInfo />
            <LocateIntroduction />
            <LocateFooter />
        </View>
    )

}
ServiceSiteLocate.config = {
    navigationBarTitleText: '服务站入驻',
}