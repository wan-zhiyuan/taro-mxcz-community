import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { getWindowHeight } from '../../../utils/style'
import { useDispatch } from '@tarojs/redux'
import { getOrderList } from '../../../actions/mall'
import OrderList from './OrderList'

import './order.scss'

export default function Order() {

    const [current, setCurrent] = useState([0])
    const [tabList, setTabList] = useState([
        { title: '全部订单' },
        { title: '待发货' },
        { title: '待收货' },
        { title: '已完成' },
    ])
    const [list, setList] = useState([]) // 订单列表数据
    const [orderData, setOrderData] = useState([]) // 

    useEffect(() => {
        setCurrent(0)
        async function getData() {
            const res = await getOrderList()
            if (res.code === 200) {
                setList(res.data.list)
                setOrderData(res.data.list)
            }
        }
        getData()
    }, [])

    function handleClick(value) {
        console.log('handleClick:' + value)
        setCurrent(value)
        if (value === 0) {
            setList(orderData)
        } else {
            let newList = []
            let status = 0
            switch (value) {
                case 1:
                    status = 2
                    break;
                case 2:
                    status = 3
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
            <AtTabs height={getWindowHeight()}
                current={current} tabList={tabList} onClick={handleClick} animated={true}>
                {
                    tabList.map((item, idx) => {
                        return (
                            <AtTabsPane current={current} index={idx} key={'index_'+idx}>
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