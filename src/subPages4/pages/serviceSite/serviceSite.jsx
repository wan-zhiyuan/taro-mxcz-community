import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtGrid, AtTabs, AtTabsPane } from 'taro-ui'
import { ClTabs } from "mp-colorui";
import ListView, { LazyBlock } from "taro-listview";
import { getCommunityServiceSite } from '../../../actions/community'
import { getLocationString } from '../../../utils/location'
import ServiceSiteList from './ServiceSiteList'

import './serviceSite.scss'

export default function ServiceSite() {

    const [hasMore, setHasMore] = useState(false)
    const [serviceSiteCate, setServiceSiteCate] = useState([
        {
            image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
            value: '社区养老',
            cate_id: 1,
            cate_name: '社区养老',
        },
        {
            image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
            value: '社区助餐',
            cate_id: 2,
            cate_name: '社区助餐',
        },
        {
            image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
            value: '社区帮困',
            cate_id: 3,
            cate_name: '社区帮困',
        },
    ])
    const [serviceSiteList, setServiceSiteList] = useState([])
    const [tabs, setTabs] = useState([{ text: "标签 1", id: "verb-1" }, { text: "标签 2", id: "verb-2" }, { text: "标签 3", id: "verb-3" }])

    useEffect(() => {
        // 请求社区服务站分类数据

        // 请求社区列表数据
        async function getServiceSite() {
            const location = await getLocationString()
            const res = await getCommunityServiceSite(location, '社区助餐', 0,)
            console.log(res)
            setServiceSiteList(res.data)
        }
        getServiceSite()
    }, [])

    /* 点击服务站子分类 */
    function handleClickCate() {

    }


    function handleClickTabs(index) {
        console.log('index:' + index)
    }

    return (
        <View className='service_site_index lazy-view'>
            <ListView
                className='service_site__listview'
                lazy
                hasMore={hasMore}
            // onScrollToLower={onScrollToLower}
            >
                <View className='sub_grid'>
                    <View className='title'>
                        <Text>服务站分类</Text>
                    </View>
                    <AtGrid
                        columnNum={5}
                        data={serviceSiteCate}
                        onClick={handleClickCate}
                    />
                </View>
                <View className='tabs_cate'>
                    <ClTabs
                        tabs={tabs}
                        type="verb"
                        activeColor="cyan"
                        bgColor="gradualPink"
                        onClick={handleClickTabs}
                    >
                        {tabs.map(item => (
                            // 文档：ClTabs 内部元素必须由一层 View 包裹，且 id 必须和 tabs 一一对应，且 id 不能为纯数字
                            <View key={item.id} id={item.id}>
                                <ServiceSiteList list={serviceSiteList} />
                            </View>
                        ))}
                    </ClTabs>
                </View>
            </ListView>
        </View>
    )

}
ServiceSite.config = {
    navigationBarTitleText: '社区服务站',
}