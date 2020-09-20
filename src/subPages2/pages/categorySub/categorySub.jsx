import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { getWindowHeight } from '../../../utils/style'
import ListView, { LazyBlock } from "taro-listview";
import PublishList from '../../../components/PublishList'
import { getPublish } from '../../../actions/publish'

import './categorySub.scss'

export default function CategorySub() {

    const router = useRouter()
    const { cate_id = '0', cate_name = '分类名称', location = '' } = router.params

    const [hasMore, setHasMore] = useState(true)
    const [pIndex, setPIndex] = useState(0)
    const [publishList, setPublishList] = useState([])
    const [publishAll, setPublishAll] = useState([])

    useEffect(() => {
        console.log('cate_name:' + cate_name)
        Taro.setNavigationBarTitle({
            title: cate_name
        })

        getPublishData()
    }, [])

    /* 请求发布信息数据(此处的is_near都传0 或者不传) */
    async function getPublishData(index=pIndex) {
        const res = await getPublish(cate_id, location)
        if (res.code === 200) {
            let listData = res.data
            setPublishAll(listData)
            let newIndex = index + 10
            setPIndex(newIndex)
            if (newIndex >= Number(listData.length)) {
                setHasMore(false)
            }
            let newArr = listData.slice(0, newIndex)
            console.log(newArr)
            setPublishList(newArr)
        }
    }

    async function onScrollToLower() {
        Taro.showLoading({
            title: '加载中'
        })
        let newIndex = pIndex + 10
        setPIndex(newIndex)
        let newArr = publishAll.slice(0, newIndex)
        setTimeout(() => {
            console.log(newArr)
            setPublishList(newArr)
            Taro.hideLoading()
        }, 500)
        if (newIndex >= Number(publishAll.length)) {
            setHasMore(false)
        }
    }

    return (
        <View className='category_sub_index'>
            <ListView
                className='category_sub_listview'
                lazy
                hasMore={hasMore}
                onScrollToLower={onScrollToLower}
            >
                <PublishList list={publishList} hasMore={hasMore}/>
            </ListView>
        </View>
    )

}
CategorySub.config = {
    navigationBarTitleText: '发布子分类',
}