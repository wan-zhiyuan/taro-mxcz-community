import Taro, { useState } from '@tarojs/taro'
import { View, Button, Text, ScrollView } from '@tarojs/components'

import './home.scss'

export default function Home() {

    const [triggered, setTriggered] = useState(true)

    function onRefresh() {
        setTriggered(true)

        // 下拉刷新 3秒后关闭
        setTimeout(()=>{
            setTriggered(false)
        },3000)
    }

    return (
        <View className='home_index'>
            <ScrollView
                className='home_scrollview'
                scrollWithAnimation
                scrollY={true}
                refresherEnabled={true} // 开启
                refresherThreshold={100} // 阀值
                refresherDefaultStyle='white' // 三个点颜色
                refresherBackground='lightgreen' // 下拉区域背景色
                refresherTriggered={triggered} // 控制下拉刷新状态
                onRefresherRefresh={onRefresh} // 开始下拉刷新时触发
            >
                <View className='test_1'></View>
                <View className='test_2'></View>
                <View className='test_3'></View>
                <View className='test_1'></View>
                <View className='test_2'></View>
                {/* <View className='test_3'></View>
                <View className='test_1'></View>
                <View className='test_2'></View>
                <View className='test_3'></View> */}

            </ScrollView>
        </View>
    )
}

Home.config = {
    navigationBarTitleText: '首页',
}