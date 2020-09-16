import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import RankItem from '../signInRank/RankItem'

import './signIn.scss'

export default function SignIn() {

    // 获取手速列表  截取前三的数据用于页面数据展示

    const [top3, setTop3] = useState([1, 2, 3])

    function naviToRank() {
        Taro.navigateTo({
            url: `/subPages1/pages/signInRank/signInRank`
        })
    }

    return (
        <View className='signin_index'>
            <View className='header'>
                <Image className='avatar'></Image>
                <View className='header_box1'>
                    <View className='box1_up'>
                        <Text>已签到</Text>
                        <Text>积分+1</Text>
                    </View>
                    <Text className='box1_down'>已连续签到2天</Text>
                </View>
            </View>
            <View className='top3'>
                <View className='top3_title'>
                    <Text style={{marginLeft:Taro.pxTransform(20)}}>今日前三</Text>
                </View>
                <View className='top3_content'>
                    {
                        top3.map((item, idx) => {
                            return (
                                <RankItem key={'index_'+idx}  item={item} index={idx}/>
                            )
                        })
                    }
                </View>
                <View className='all_rank' onClick={naviToRank}>查看全部榜单</View>
            </View>
        </View>
    )
}
SignIn.config = {
    navigationBarTitleText: '签到',
}