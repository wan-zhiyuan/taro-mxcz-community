import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'

import './publishDetail.scss'

export default function PublishDetail() {

    const router = useRouter()
    const { id='' } = router.params

    useEffect(()=>{
        Taro.setNavigationBarTitle('二手闲置')
    },[])

    return (
        <View>

        </View>
    )
}

PublishDetail.config = {
    navigationBarTitleText: '',
}