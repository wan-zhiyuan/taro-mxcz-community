import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { isEmpty } from '../../../utils/is'

import './index.scss'

export default function Index(props) {

    const [gridData, setGridData] = useState([
        { id: '1', name: '社区助餐', pic: 'http://source.bingu.cn/icon_01.png', url: '' },
        { id: '2', name: '社区通', pic: 'http://source.bingu.cn/icon_02.png', url: '/subPages2/pages/community/community' },
        { id: '3', name: '每日签到', pic: 'http://source.bingu.cn/icon_03.png', url: '' },
        { id: '4', name: '活动报名', pic: 'http://source.bingu.cn/icon_04.png', url: '/subPages2/pages/activity/activity' },
        { id: '5', name: '积分商城', pic: 'http://source.bingu.cn/icon_05.png', url: '' },
    ])

    function goTo(url) {
        if (isEmpty(url)) return
        Taro.navigateTo({
            url: url,
        })
    }

    return (
        <View className='home_grid'>
            <View className='home_grid_bg'></View>
            <View className='grid'>
                {
                    gridData.map((item, idx) => {
                        return (
                            <View
                                key={'index_' + idx}
                                className='grid_item'
                                onClick={() => { goTo(item.url) }}
                            >
                                {
                                    isEmpty(item.pic)
                                        ? <View className='grid_item_pic_default'></View>
                                        : <Image
                                            className='grid_item_pic'
                                            src={item.pic}
                                            mode='scaleToFill'
                                            lazyLoad={true}
                                        ></Image>
                                }
                                <Text className='grid_item_name'>{item.name}</Text>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}