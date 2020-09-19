import Taro, { useEffect, useState } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtGrid, AtTabs, AtTabsPane } from 'taro-ui'
import { getPublish } from '../../../actions/publish'
import PublishList from '../../../components/PublishList'
import { getLocationString } from '../../../utils/location'
import ListView, { LazyBlock } from "taro-listview";
import Divider from '../../../components/DividerComponent'

import './category.scss'

export default function Category() {

    const [currentCate, setCurrentCate] = useState(0)

    const [gridData, setGridData] = useState([])

    const [cateTitleLsit, setCateTitleList] = useState([])
    const [location, setLocation] = useState('')
    const [hasMore, setHasMore] = useState(true)
    const [pIndex, setPIndex] = useState(0)
    const [publishList, setPublishList] = useState([])
    const [publishAll, setPublishAll] = useState([])

    useEffect(() => {


        // 模拟获取顶部grid数据
        Taro.showLoading({
            title: '加载中'
        })
        setTimeout(() => {
            setGridData([
                {
                    image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                    value: '二手闲置'
                },
                {
                    image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                    value: '健康食集'
                },
                {
                    image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                    value: '邻里分享'
                },
                {
                    image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                    value: '手机教学'
                },
                {
                    image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
                    value: '社区互动'
                },
                {
                    image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
                    value: '志愿者之家'
                }
            ])
            Taro.hideLoading()
        }, 1000)
        let list = ['全部', '附近', '二手闲置', '健康食集', '邻里分享', '手机教学', '社区活动', '志愿者之家']
        let newList = []
        for (let i = 0; i < list.length; i++) {
            newList.push({ title: list[i], cate_id: i })
        }
        setCateTitleList(newList)

        // 获取发布信息列表数据
        getPublishData()
    }, [])

    async function getPublishData(cate_id = 0, location = '', is_near = 0) {
        let lo = ''
        // 当状态location没传或者传了但是为空时，获取location
        if (!location) {
            const newlocation = await getLocationString()
            setLocation(newlocation)
            lo = newlocation
        } else {
            lo = location
        }
        const res = await getPublish(cate_id, lo, is_near)
        if (res.code === 200) {
            let listData = res.data
            setPublishAll(listData)
            let newIndex = pIndex + 10
            setPIndex(newIndex)
            if (newIndex >= Number(listData.length)) {
                setHasMore(false)
            }
            let newArr = listData.slice(0, newIndex)
            console.log(newArr)
            setPublishList(newArr)
        }
    }


    // 切换tabs时候需要执行的操作
    function handleClickTabs(v) {
        setCurrentCate(v)
        // 请求新的发布信息数据
        setPIndex(0)
        // 通过v找到对应的cate_id

        // 再使用cate_id查询新的发布信息数组

    }

    // 注意⚠️：没有设置固定高度 或者 hasMore为false此函数都不会触发
    async function onScrollToLower() {
        console.log('onScrollToLower()')
        Taro.showLoading({
            title: '加载中'
        })
        let newIndex = pIndex + 10
        setPIndex(newIndex)
        if (newIndex >= Number(publishAll.length)) {
            setHasMore(false)
        }
        let newArr = publishAll.slice(0, newIndex)
        setTimeout(() => {
            console.log(newArr)
            setPublishList(newArr)
            Taro.hideLoading()
        }, 500)
    }

    return (
        <View className='category_index'>
            <ListView
                className='category_listview'
                lazy
                hasMore={hasMore}
                onScrollToLower={onScrollToLower}
            >
                <View className='sub_grid'>
                    <AtGrid
                        columnNum={5}
                        data={gridData} />
                </View>
                <View className='tabs_cate'>
                    <AtTabs
                        current={currentCate}
                        scroll
                        animated={false}
                        swipeable={false}
                        tabList={cateTitleLsit}
                        onClick={handleClickTabs}>
                        {
                            cateTitleLsit.map((item, idx) => {
                                return (
                                    <AtTabsPane key={'indx_' + idx} current={currentCate} index={idx} >
                                        <PublishList list={publishList} />
                                    </AtTabsPane>
                                )
                            })
                        }
                    </AtTabs>
                </View>
                {
                    !hasMore &&
                    <Divider />
                }
            </ListView>

        </View>
    )

}
Category.config = {
    navigationBarTitleText: '发布分类',
}