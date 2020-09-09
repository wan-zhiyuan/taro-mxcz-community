import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView, CoverView, CoverImage } from '@tarojs/components'
import NavIcon from '../../../images/icon_01.png'

import './index.scss'

export default function Index(props) {

    // MapContext传递过来 坐标点也传递过来
    
    function moveToLocation() {
        // MapContext.moveToLocation({'longitude','latitude',function success()})

        // 不需要专门谢map页面 直接使用openLocation就可以了 😄
        Taro.openLocation({
            latitude: 31, // 纬度，范围为-90~90，负数表示南纬
            longitude: 121, // 经度，范围为-180~180，负数表示西经
            scale: 8, // 缩放比例
            name: "测试",
            address: "测试详细地址",
            success: function (r) {
              console.log(r)
            }
          })
    }

    return (
        <View className='controls' onClick={moveToLocation}>
            <View className='controls_txt'>
                <Text className='txt_name'>社区名字</Text>
                <Text className='txt_address'>地址社区地址社区地区地址地址社区地址社区地址区地址社区地址</Text>
            </View>
            <Image src={NavIcon} className='controls_icon'></Image>
        </View>
    )

}