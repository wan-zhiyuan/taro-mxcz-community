import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import RankItem from '../signInRank/RankItem'
import { sign } from '../../../actions/signIn'
import PopupSigned from './PopupSigned'
import SignInBanner from '../../images/signin_reward.jpeg'

import './signIn.scss'
import { isEmpty } from '../../../utils/is'

export default function SignIn() {

    // 获取手速列表  截取前三的数据用于页面数据展示

    const [top3, setTop3] = useState([])
    const [signData, setSignData] = useState({})
    const [isSign, setIsSign] = useState(0) // 默认没有签到过
    const [isOpenedPop, setIsOpenedPop] = useState(true)

    useEffect(() => {
        async function doSign() {
            const res = await sign()
            console.log(res)
            if (res.code === 0) {
                setIsSign(res.data.is_sign)
                setSignData(res.data.basic)
                setTop3(res.data.ranking_time)
            } else {
                alert('签到失败')
            }
        }
        doSign()
    }, [])

    function naviToRank() {
        Taro.navigateTo({
            url: `/subPages1/pages/signInRank/signInRank`
        })
    }

    function handleClose() {
        setIsOpenedPop(false)
    }

    return (
        <View className='signin_index'>
            {
                (!isEmpty(signData) && isSign === 0) &&
                <PopupSigned signData={signData} isOpened={isOpenedPop} onClose={handleClose} />
            }
            <Image className='banner' src={SignInBanner} mode='widthFix'></Image>
            <View className='header'>
                <View className='header_box1'>
                    {
                        !!signData.avatar
                            ? <Image className='avatar' src={signData.avatar} mode='scaleToFill'></Image>
                            : <Image className='avatar_default'></Image>
                    }

                    <View className='header_msg'>
                        <View className='msg_up'>
                            <Text>已签到</Text>
                            <Text>积分+{signData.number}</Text>
                        </View>
                        <Text className='msg_down'>已连续签到{signData.cumulative_days}天</Text>
                    </View>
                </View>
                <View className='header_box2'>
                    <Text>今日签到排名：</Text>
                    <Text style={{ color: '#ff0044', marginLeft: Taro.pxTransform(12) }}>{signData.ranking}</Text>
                </View>
            </View>
            {
                top3.length !== 0 &&
                <View className='top3'>
                    <View className='top3_title'>
                        <Text style={{ marginLeft: Taro.pxTransform(20) }}>今日前三</Text>
                    </View>
                    <View className='top3_content'>
                        {
                            top3.map((item, idx) => {
                                return (
                                    <RankItem key={'index_' + idx} item={item} index={idx} />
                                )
                            })
                        }
                    </View>
                    <View className='all_rank' onClick={naviToRank}>查看全部榜单</View>
                </View>
            }
        </View>
    )
}
SignIn.config = {
    navigationBarTitleText: '签到',
}