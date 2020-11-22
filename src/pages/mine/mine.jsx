import Taro, { useState, useDidShow, useShareAppMessage } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { getWindowHeight } from '../../utils/style'
import MineHeader from './MineHeader'
import MineData from './MineData'
import MineService from './MineService'
import PlatformService from './PlatformService'
import MerchantService from './MerchantService'
import { useDispatch } from '@tarojs/redux'
import { dispatchUser } from '../../actions/user'

import './mine.scss'

export default function Mine() {

    const dispatch = useDispatch()

    useDidShow(()=>{
        // 更新用户信息
        dispatch(dispatchUser())
    })

    useShareAppMessage( res => {
        return {
            title: '盟享诚珍',
            path: '/pages/home/home',
            imageUrl: '',
        }
    })

    return (
        <View className='mine_index'>
            <ScrollView
                className='mine_scrollview'
                scrollY={true}
                scrollWithAnimation
                enableFlex={true}
                style={{ height: getWindowHeight() }}
            >
                <MineHeader />
                <MineData />
                <MineService title={'我的服务'} />
                <PlatformService title={'平台服务'} />
                <MerchantService title={'商家服务'} />

            </ScrollView>

        </View>
    )
}

Mine.config = {
    navigationBarTitleText: '',
    // navigationStyle: 'custom',
}