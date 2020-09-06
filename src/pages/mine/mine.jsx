import Taro, { useState } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { getWindowHeight } from '../../utils/style'
import MineHeader from './MineHeader'
import MineService from './MineService'

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
                <MineService title={'我的服务'} />
                <MineService title={'平台服务'} />
            </ScrollView>

        </View>
    )
}

Mine.config = {
    navigationBarTitleText: '个人中心',
    navigationStyle: 'custom',
}