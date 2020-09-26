import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { getWindowHeight } from '../../../utils/style'
import { ClTabs } from 'mp-colorui'
import { getCollectList } from '../../../actions/user'
import PublishList from '../../../components/PublishList'
import InformationList from '../../../components/InformationList'
import ListView, { LazyBlock } from "taro-listview";

import './myCollection.scss'

export default function MyCollection() {

    const [tabs, setTabs] = useState([{ text: "收藏信息", id: "verb-1" }, { text: "收藏商家", id: "verb-2" }])
    const [publishList, setPublishList] = useState([])
    const [informationList, setInformationList] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        async function getData() {
            const res = await getCollectList()
            console.log(res)
            if (res.code != 200) return
            setPublishList(res.data.collect_bussiness) // 目前数据返回的内容有问题 和其他的发布信息列表不一致
            setInformationList(res.data.collect_information)
            setIsLoaded(true)
        }
        getData()
    }, [])

    function handleClickTabs(index) {
        console.log('index:' + index)

    }

    return (
        <View className='my_collection_index'>
            <ListView
                className='my_collection_listview'
                lazy
                hasMore={hasMore}
                isLoaded={isLoaded}
            >
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
                            {
                                idx === 0 &&
                                <InformationList list={informationList} />
                            }
                            {
                                idx === 1 &&
                                <PublishList list={publishList} />
                            }
                        </View>
                    ))}
                </ClTabs>
            </ListView>
        </View>
    )

}
MyCollection.config = {
    navigationBarTitleText: '我的收藏',
}