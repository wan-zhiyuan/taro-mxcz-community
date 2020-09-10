import Taro, { useState, useEffect, useRouter, useShareAppMessage } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtIcon, AtRate } from 'taro-ui'
import { getWindowHeightNoPX } from '../../../utils/style'
import CDetailFooter from './CDetailFooter'
import CDetailRight from './CDetailRight'
import MyRichText from '../../../components/MyRichText'


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

    useShareAppMessage(res => {
        if (res.from === 'button') {
            console.log('来自页面内转发按钮')
            let eData = res.target.dataset.share
            console.log(res.target)
            console.log(eData)
            return {
                title: `期待与你在ibarrel爱杯吧相遇`,
                path: `/pages/home/home?target=communityDetail&cid=${cid}`,
                imageUrl: ''
            }
        }
        return {
            title: '分享标题', // 分享卡片展示的标题
            path: '/pages/home/home', // 分享卡片的路径
            imageUrl: '',
        }
    })

    return (
        <View className='community_detail_index'>
            {/* 右侧悬浮模块 */}
            <CDetailRight />
            <ScrollView
                style={{ height: `${(getWindowHeightNoPX() - 60)}px` }}
                scrollY
                scrollWithAnimation
            >
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

                <View className='community_detail'>
                    <View className='community_detail_box'>
                        <Text className='detail_title'>商家详情</Text>
                        <MyRichText richText={community.detail} />
                    </View>
                </View>
            </ScrollView>
            {/* 底部模块 */}
            <CDetailFooter community={community} />
        </View>
    )
}

CommunityDetail.config = {
    navigationBarTitleText: '社区',
}