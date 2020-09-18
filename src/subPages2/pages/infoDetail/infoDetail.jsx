import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { getWindowHeight } from '../../../utils/style'
import InfoDetailHeader from './InfoDetailHeader'
import InfoDetailContent from './InfoDetailContent'
import InfoDetailLike from './InfoDetailLike'
import InfoDetailComment from './InfoDetailComment'

import './infoDetail.scss'

export default function InfoDetail() {

    return (
        <View className='info_detail_index'>
            <InfoDetailHeader />
            <InfoDetailContent />
            <InfoDetailLike />
            <InfoDetailComment />
        </View>
    )

}
InfoDetail.config = {
    navigationBarTitleText: '资讯',
}