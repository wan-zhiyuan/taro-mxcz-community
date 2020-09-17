import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { getWindowHeight } from '../../../utils/style'
import PointHeader from './PointHeader'
import PointList from './PointList'

import './pointDetail.scss'

export default function PointDetail() {

    return (
        <View className='point_detail_index'>
            <ScrollView
                className='point_detail_scroll'
                scrollY
                scrollWithAnimation
                style={{ height: getWindowHeight() }}
            >
                <PointHeader />
                <PointList />

            </ScrollView>
        </View>
    )

}
PointDetail.config = {
    navigationBarTitleText: '积分明细',
}