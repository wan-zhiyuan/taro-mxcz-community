import Taro, { useState, useEffect, useRouter, useShareAppMessage } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtIcon, AtRate } from 'taro-ui'
import { getWindowHeightNoPX } from '../../../utils/style'
import PopupQRcode from './../../../components/Popup/PopupQRcode'
import { useSelector, useDispatch } from '@tarojs/redux'
import { hidePopQr } from '../../../actions/community'
import DetailTab from './DetailTab'
import DetailFooter from './DetailFooter'
import DetailRight from './DetailRight'

import './communityDetail.scss'

export default function CommunityDetail() {

    const router = useRouter()
    const { cid = 0 } = router.params

    const isOpenedPopQr = useSelector(state => state.community.isOpenedPopQr)
    const dispatch = useDispatch()

    const [community, setCommunity] = useState({
        cid: '1', name: '上海市浦东新区人民政府潍坊新村街道办事处', address: '上海市浦东新区福山路317号', rate: 5, popul: 120, phone: 68757800, range: '15.4km',
        pic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3607787663,2825710095&fm=26&gp=0.jpg',
        detail: `<p style="text-align:center;">	<img src="http://static.ibarrel.top/userimages/prd/202009/01/2020090108584587449.jpg" alt="" /></p><p style="text-align:center;">	<img src="http://static.ibarrel.top/userimages/prd/202008/24/2020082412422073796.jpg" alt="" /></p>`,
    })
    const [qrTitle, setQrTitle] = useState('')
    const [qrTxt, setQrTxt] = useState('二维码内容')

    useEffect(() => {
        // 获取社区详情信息


    }, [])

    // 分享配置
    useShareAppMessage(res => {
        if (res.from === 'button') {
            console.log('来自页面内转发按钮')
            let eData = res.target.dataset.share
            console.log(res.target)
            console.log(eData)
            return {
                title: `盟享诚珍-${community.name}`,
                path: `/pages/home/home?target=communityDetail&cid=${cid}`,
                imageUrl: ''
            }
        }
        return {
            title: '盟享诚珍', // 分享卡片展示的标题
            path: '/pages/home/home', // 分享卡片的路径
            imageUrl: '',
        }
    })

    function handlePhone() {
        Taro.makePhoneCall({
            phoneNumber: String(community.phone)
        })
    }

    return (
        <View className='community_detail_index'>
            <PopupQRcode isOpened={isOpenedPopQr} qrTitle={qrTitle} qrTxt={qrTxt} onClose={() => { dispatch(hidePopQr()) }}></PopupQRcode>
            {/* 右侧悬浮模块 */}
            <DetailRight />
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
                        <View className='box1_right' onClick={handlePhone}>
                            <AtIcon prefixClass='icon' value='dianhua' size='28' color='#00D8A0'></AtIcon>
                        </View>
                    </View>

                    <View className='community_box2'>
                        <AtRate value={community.rate} size={14} />
                        <Text className='box2_right'>分享：10 浏览量：3699</Text>
                    </View>
                </View>

                {/* 社区详情主内容 */}
                <DetailTab community={community} />
            </ScrollView>
            {/* 底部模块 */}
            <DetailFooter community={community} />
        </View>
    )
}

CommunityDetail.config = {
    navigationBarTitleText: '社区',
}