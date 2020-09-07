import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { getWindowHeight } from '../../utils/style'

import './order.scss'

export default function Order() {

    const [current, setCurrent] = useState([0])
    const [tabList, setTabList] = useState([
        { title: '全部订单' },
        { title: '待付款' },
        { title: '待发货' },
        { title: '待收货' },
        { title: '已完成' },
    ])

    useEffect(()=>{
        setCurrent(0)
    },[])

    function handleClick(value) {
        setCurrent(value)
    }

    return (
        <View className='order_index'>
            <AtTabs height={getWindowHeight()}
                current={current} tabList={tabList} onClick={handleClick} animated={true}>
                <AtTabsPane current={current} index={0} >
                    <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;' >标签页一的内容</View>
                </AtTabsPane>
                <AtTabsPane current={current} index={1}>
                    <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
                </AtTabsPane>
                <AtTabsPane current={current} index={2}>
                    <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
                </AtTabsPane>
                <AtTabsPane current={current} index={3}>
                    <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页四的内容</View>
                </AtTabsPane>
                <AtTabsPane current={current} index={4}>
                    <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页五的内容</View>
                </AtTabsPane>
            </AtTabs>
        </View>
    )
}

Order.config = {
    navigationBarTitleText: '我的订单',
}