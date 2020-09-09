import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtIcon, AtRate } from 'taro-ui'
import CDetailFooter from './CDetailFooter'

import './communityDetail.scss'

export default function CommunityDetail() {

    const router = useRouter()
    const { cid = 0 } = router.params

    const [community, setCommunity] = useState({
        cid: '1', name: '上海市浦东新区人民政府潍坊新村街道办事处', address: '上海市浦东新区福山路317号', rate: 5, popul: 120, phone: 68757800, range: '15.4km',
        pic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3607787663,2825710095&fm=26&gp=0.jpg'
    })

    useEffect(() => {
        // 获取社区详情信息



    }, [])

    return (
        <View className='community_detail_index'>
            <Image className='community_pic' src={community.pic} mode='scaleToFill'></Image>
            <View className='community_top'>
                <View className='community_box1'>
                    <View className='box1_left'>
                        <Text className='community_name'>{community.name}</Text>
                        <Text className='community_address'>{community.address}</Text>
                    </View>
                    <View className='box1_right'>
                        <AtIcon prefixClass='icon' value='dianhua' size='28' color='#00D8A0'></AtIcon>
                    </View>
                </View>

                <View className='community_box2'>
                    <AtRate value={community.rate} size={14} />
                    <Text className='box2_right'>分享：10 浏览量：3699</Text>
                </View>
            </View>

            <CDetailFooter />
        </View>
    )
}

CommunityDetail.config = {
    navigationBarTitleText: '社区',
}