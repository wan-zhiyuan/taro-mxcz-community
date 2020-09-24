import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import RankItem from '../signInRank/RankItem'
import { sign, getSignList } from '../../../actions/signIn'
import PopupSigned from './PopupSigned'
import PopupCalendar from './PopupCalendar'
import SignInBanner from '../../images/signin_reward.jpeg'
import { isEmpty } from '../../../utils/is'
import { Toast } from '../../../utils/toast'
import dayjs from 'dayjs'

import './signIn.scss'

export default function SignIn() {

    // 获取手速列表  截取前三的数据用于页面数据展示
    const [top3, setTop3] = useState([])
    const [signData, setSignData] = useState({})
    const [isSign, setIsSign] = useState(0) // 默认没有签到过
    const [signList, setSignList] = useState([])
    const [isOpenedPop, setIsOpenedPop] = useState(true)
    const [isOpenedCalendar, setIsOpenedCalendar] = useState(false)

    useEffect(() => {
        async function initData() {
            const res = await sign()
            console.log(res)
            if (res.code === 200) {
                setIsSign(res.data.is_sign)
                setSignData(res.data.basic)
                setTop3(res.data.ranking_time)
            } else {
                Toast('签到失败')
            }

        }
        initData()
        async function getSignL() {
            const res = await getSignList()
            if (res.code !== 200) return
            let list = []
            for (let i = 0; i < res.data.length; i++) {
                list.push(
                    {
                        date: dayjs(Number(res.data[i].create_time) * 1000).format("YYYY-MM-DD"),
                        tipTop: '已签到',
                        tipTopColor: 'red',
                    }
                )
            }
            console.log(list)
            setSignList(list)
        }
        getSignL()
    }, [])

    /* 查看签到排行榜 */
    function naviToRank() {
        Taro.navigateTo({
            url: `/subPages1/pages/signInRank/signInRank`
        })
    }

    /* 关闭签到弹窗 */
    function handleClose() {
        setIsOpenedPop(false)
    }
    /* 关闭日历弹窗 */
    function handleCloseCalendar() {
        setIsOpenedCalendar(false)
    }
    /* 打开日历弹窗 */
    function handleOpenCalendar() {
        setIsOpenedCalendar(true)
    }

    return (
        <View className='signin_index'>
            {
                (!isEmpty(signData) && isSign === 0) &&
                <PopupSigned signData={signData} isOpened={isOpenedPop} onClose={handleClose} />
            }
            {
                isOpenedCalendar &&
                <PopupCalendar isOpened={isOpenedCalendar} onClose={handleCloseCalendar} signList={signList} />
            }
            <Image className='banner' src={SignInBanner} mode='widthFix'></Image>
            <View className='header'>
                <View className='header_box1'>
                    <View className='box1_left'>
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
                    <View className='box1_right' onClick={handleOpenCalendar}>
                        签到日历
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