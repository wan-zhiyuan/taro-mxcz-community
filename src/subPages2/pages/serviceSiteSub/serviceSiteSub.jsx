import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { getWindowHeight } from '../../../utils/style'

import './serviceSiteSub.scss'

export default function ServiceSiteSub() {

    const router = useRouter()
    const { cate_id = 0, cate_name = '' } = router.params

    useEffect(()=>{
        Taro.setNavigationBarTitle({
            title: cate_name || ''
        })
    },[])

    return (
        <View className='service_site_sub_index'>
            
        </View>
    )

}
ServiceSiteSub.config = {
    navigationBarTitleText: '服务站子列表',
}