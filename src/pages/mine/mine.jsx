import Taro, { useState } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { getWindowHeight } from '../../utils/style'
import MineHeader from './MineHeader'
import MineData from './MineData'
import MineService from './MineService'
import PlatformService from './PlatformService'
import MerchantService from './MerchantService'

import './mine.scss'

export default function Mine() {

    const [myService, setMyService] = useState([])
    const [platformService, setPlatformService] = useState([])

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