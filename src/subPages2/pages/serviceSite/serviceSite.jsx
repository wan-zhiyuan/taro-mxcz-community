import Taro, { useState, useEffect, useDidShow } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtGrid, AtTabs, AtTabsPane, AtIcon } from 'taro-ui'
import { ClTabs } from "mp-colorui"
import ListView, { LazyBlock } from "taro-listview";
import { getCommunityServiceSite } from '../../../actions/community'
import { getLocationString, getLocationStringPopup } from '../../../utils/location'
import ServiceSiteList from './ServiceSiteList'
import ServiceSiteFooter from './ServiceSiteFooter'
import { getWindowHeightNoPX } from '../../../utils/style'


import './serviceSite.scss'
import { Toast } from '../../../utils/toast';

export default function ServiceSite() {

    const [location, setLocation] = useState('')
    const [hasMore, setHasMore] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false) // list是否已经请求完毕
    const [serviceSiteCate, setServiceSiteCate] = useState([
        {
            image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
            value: '社区助餐',
            cate_id: 1,
            cate_name: '社区助餐',
        },
        {
            image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
            value: '社区养老',
            cate_id: 2,
            cate_name: '社区养老',
        },
        {
            image: 'http://source.mxcz.love/upload/20210204/731d0558cc76432326ce732e124f0316.png',
            value: '社区教育',
            cate_id: 3,
            cate_name: '社区教育',
        },
        {
            image: 'http://source.mxcz.love/upload/20210204/5f08e05673f72159c261511486e6a6b0.png',
            value: '社区服务',
            cate_id: 4,
            cate_name: '社区服务',
        },
        {
            image: 'http://source.mxcz.love/upload/20210204/9b1122171663f646739e8462d3ecd0c1.png',
            value: '社区科技',
            cate_id: 5,
            cate_name: '社区科技',
        },
        {
            image: 'http://source.mxcz.love/upload/20210204/4f7ea27d9e85aaad9799abdc9773ae37.png',
            value: '社区文化',
            cate_id: 6,
            cate_name: '社区文化',
        },
        {
            image: 'http://source.mxcz.love/upload/20210204/63174c29879e9ab25deb46a2facc8d28.png',
            value: '社区生活',
            cate_id: 7,
            cate_name: '社区生活',
        },
        
    ])
    const [serviceSiteList, setServiceSiteList] = useState([])
    const [tabs, setTabs] = useState([{ text: "附近发现", id: "verb-1" }, { text: "最新收录", id: "verb-2" }, { text: "热门推荐", id: "verb-3" }])

    useEffect(() => {
        // 请求社区服务站分类数据
        // 数据暂时写死

        // 因为ClTabs初始化时会默认执行一次handleClickTabs方法，list数据放在那里请求
    }, [])


    // 仅页面初始化的时候获取用户定位
    async function getServiceSite(is_near = 0) {
        const location = await getLocationStringPopup()
        setLocation(location)
        if (location === '') {
            console.log('未获取到用户定位权限，不请求数据')
        } else {
            const res = await getCommunityServiceSite(location, '', is_near)
            if (res.code === 200) {
                setIsLoaded(true)
                setServiceSiteList(res.data)
            }
        }
    }
    async function getServiceSiteTabs(is_near = 0) {
        const res = await getCommunityServiceSite(location, '', is_near)
        if (res.code === 200) {
            setServiceSiteList(res.data)
        }
    }

    /* 点击服务站子分类 */
    function handleClickCate(item) {
        if (location === '') {
            Toast('用户定位未授权')
        } else {
            Taro.navigateTo({
                url: `/subPages2/pages/serviceSiteSub/serviceSiteSub?cate_id=${item.cate_id}&cate_name=${item.cate_name}&location=${location}`
            })
        }
    }

    function handleClickTabs(index) {
        console.log('index:' + index)
        if (isLoaded) {
            if (index === 0) {
                getServiceSiteTabs(1)
            } else {
                getServiceSiteTabs(0) // 最新收录、热门推荐暂时都使用is_near=0的全部列表
            }
        } else {
            // 初始化时 使用获取定位的函数
            if (index === 0) {
                getServiceSite(1)
            } else {
                getServiceSite(0)
            }
        }
    }

    return (
        <View className='service_site_index lazy-view'>
            <ListView
                className='service_site__listview'
                style={{ height: `${getWindowHeightNoPX() - 60}px` }}
                lazy
                hasMore={hasMore}
            >
                <View className='sub_grid'>
                    <View className='title'>
                        <Text style={{ marginLeft: '12px' }}>服务站分类</Text>
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
                        activeColor="blue"
                        // bgColor="gradualPink"
                        bgColor="white"
                        onClick={handleClickTabs}
                    >
                        {tabs.map(item => (
                            // 文档：ClTabs 内部元素必须由一层 View 包裹，且 id 必须和 tabs 一一对应，且 id 不能为纯数字
                            <View key={item.id} id={item.id}>
                                <ServiceSiteList list={serviceSiteList} isLoaded={isLoaded} />
                            </View>
                        ))}
                    </ClTabs>
                </View>
            </ListView>
            <ServiceSiteFooter location={location} />
        </View>
    )

}
ServiceSite.config = {
    navigationBarTitleText: '社区服务站',
    disableScroll: true,
}