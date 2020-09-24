import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { ClTabs } from 'mp-colorui'
import PublishList from '../../../components/PublishList'

import './myCommunity.scss'

export default function MyCommunity() {

    const [tabs, setTabs] = useState([
        { text: '全部', id: 'verb-1' }, 
        { text: '审核中', id: 'verb-2' },
        { text: '已通过', id: 'verb-3' },
        { text: '已拒绝', id: 'verb-4' },
    ])
    const [list, setList] = useState([])

    function handleClickTabs(index) {
        console.log('index:' + index)
        // 初始化时会执行一次，在这里直接请求数据
        if (index === 0) {
            
        } else if (index === 1) {
            setList([])
        } else if (index === 2) {
            
        } else if (index === 3) {
            setList([])
        }
    }

    return (
        <View className='my_community_index'>
            <ClTabs
                    tabs={tabs}
                    type="verb"
                    activeColor='orange'
                    // bgColor="gradualPink"
                    bgColor="white"
                    onClick={handleClickTabs}
                >
                    {tabs.map((item, idx) => (
                        // 文档：ClTabs 内部元素必须由一层 View 包裹，且 id 必须和 tabs 一一对应，且 id 不能为纯数字
                        <View key={item.id} id={item.id}>
                            <PublishList list={list}/>
                        </View>
                    ))}
                </ClTabs>
        </View>
    )

}
MyCommunity.config = {
    navigationBarTitleText: '我的社区',
}