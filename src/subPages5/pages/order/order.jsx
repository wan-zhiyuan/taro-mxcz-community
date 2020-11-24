import Taro, { useState, useEffect, useDidShow, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { getWindowHeight } from '../../../utils/style'
import { useDispatch } from '@tarojs/redux'
import { getOrderList } from '../../../actions/mall'
import OrderList from './OrderList'

import './order.scss'

export default function Order() {

    const router = useRouter()
    const { currentIndex = 0 } = router.params

    const [current, setCurrent] = useState(0)
    const [tabList, setTabList] = useState([
        { title: '全部订单' },
        { title: '待付款' },
        { title: '待提货' },
        { title: '已完成' },
    ])
    const [list, setList] = useState([]) // 订单列表数据
    const [orderData, setOrderData] = useState([]) // 

    useEffect(() => {
    }, [])

    useDidShow(() => {
        async function getData() {
            const res = await getOrderList(1, 1000)
            if (res.code !== 200) {
                return
            }
            // setList(res.data.list)
            setOrderData(res.data.list)
            handleOrderData(current, res.data.list)
        }
        getData()
    })

    function handleOrderData(index, orderData) {
        if (index === 0) {
            setList(orderData)
        } else {
            let newList = []
            let status = 0
            switch (index) {
                case 1:
                    status = 1
                    break;
                case 2:
                    status = 2
                    break;
                case 3:
                    status = 4
                    break;
                default:
                    break;
            }
            for (let i = 0; i < orderData.length; i++) {
                if (orderData[i].status === status) {
                    newList.push(orderData[i])
                }
            }
            setList(newList)
        }
    }

    function handleClickTabs(value) {
        console.log('handleClick:' + value)
        setCurrent(value)
        if (value === 0) {
            setList(orderData)
        } else {
            let newList = []
            let status = 0
            switch (value) {
                case 1:
                    status = 1
                    break;
                case 2:
                    status = 2
                    break;
                case 3:
                    status = 4
                    break;
                default:
                    break;
            }
            for (let i = 0; i < orderData.length; i++) {
                if (orderData[i].status === status) {
                    newList.push(orderData[i])
                }
            }
            setList(newList)
        }
    }

    return (
        <View className='order_index'>
            <AtTabs
                // height={getWindowHeight()}
                current={current} tabList={tabList} onClick={handleClickTabs} animated={true}>
                {
                    tabList.map((item, idx) => {
                        return (
                            <AtTabsPane current={current} index={idx} key={'index_' + idx}>
                                <OrderList list={list} />
                            </AtTabsPane>
                        )
                    })
                }
            </AtTabs>
        </View>
    )
}

Order.config = {
    navigationBarTitleText: '我的订单',
}