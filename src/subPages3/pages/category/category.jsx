import Taro, { useState, useEffect, useDidShow } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtGrid, AtTabs, AtTabsPane } from 'taro-ui'
import { getPublish, getPublishCate } from '../../../actions/publish'
import PublishList from '../../../components/PublishList'
import { getLocationString } from '../../../utils/location'
import ListView, { LazyBlock } from "taro-listview";
import { get as getGlobalData } from '../../../global_data'

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

        async function getGridData() {
            const res = await getPublishCate()
            if (res.code === 200) {
                const d = res.data
                let gridData = []
                let cateList = [{ title: '全部', cate_id: 0 },{ title: '附近', cate_id: 0 }]
                for (let i = 0; i < d.length; i++) {
                    gridData.push({ image: d[i].image, value: d[i].title, cate_id: d[i].id, cate_name: d[i].title })
                    cateList.push({ title: d[i].title, cate_id: d[i].id })
                }
                console.log(cateList)
                setGridData(gridData)
                setCateTitleList(cateList)
            }
        }
        getGridData()



        // setTimeout(() => {
        //     setGridData([
        //         {
        //             image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
        //             value: '二手闲置',
        //             cate_id: 1,
        //             cate_name: '二手闲置',
        //         },
        //         {
        //             image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
        //             value: '健康食集',
        //             cate_id: 2,
        //             cate_name: '健康食集',
        //         },
        //         {
        //             image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
        //             value: '邻里分享',
        //             cate_id: 3,
        //             cate_name: '邻里分享',
        //         },
        //         {
        //             image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
        //             value: '邻里分享',
        //             cate_id: 4,
        //             cate_name: '邻里分享',
        //         },
        //         {
        //             image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
        //             value: '社区互动',
        //             cate_id: 5,
        //             cate_name: '社区互动',
        //         },
        //         {
        //             image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
        //             value: '志愿者之家',
        //             cate_id: 6,
        //             cate_name: '志愿者之家',
        //         }
        //     ])
        //     Taro.hideLoading()
        // }, 500)
        // let list = ['全部', '附近', '二手闲置', '健康食集', '邻里分享', '手机教学', '社区活动', '志愿者之家']
        // let newList = []
        // for (let i = 0; i < list.length; i++) {
        //     newList.push({ title: list[i], cate_id: i })
        // }
        // setCateTitleList(newList)


        // 获取发布信息列表数据
        let location = getGlobalData('location')
        setLocation(location)
        getPublishData(0, location, 0, 0)
    }, [])

    useDidShow(() => {
        // 优化点：页面显示在前台时请求数据，从详情页面返回时请求数据，注意cate_id等参数的传值 (可以不优化)

    })

    /* 请求发布信息数据
        1、页面初始化
        2、点击tabs时
    */
    async function getPublishData(cate_id = 0, location = '', is_near = 0, index = pIndex) {
        // 优化点：小程序启动时获取定位存入GlobalData,需要时取出使用 (已完成)
        const res = await getPublish(cate_id, location, is_near)
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

    // 切换tabs时候需要执行的操作
    function handleClickTabs(v) {
        setCurrentCate(v)
        // 请求新的发布信息数据
        setPIndex(0)
        setHasMore(true)
        // 此处使用的cate_id还不正确 !!!!!!!!!!
        if (v == 1) { // 附近
            getPublishData(cateTitleLsit[v].cate_id, location, 1, 0)
        } else { // 非附近
            getPublishData(cateTitleLsit[v].cate_id, location, 0, 0)
        }
    }

    // 注意⚠️：没有设置固定高度 或者 hasMore为false此函数都不会触发
    async function onScrollToLower() {
        console.log('onScrollToLower()')
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


    /* 跳转对应子分类页面 */
    function handleClickGrid(item, index) {
        console.log(item)
        console.log('index:' + index)
        Taro.navigateTo({
            url: `/subPages3/pages/categorySub/categorySub?cate_id=${item.cate_id}&cate_name=${item.cate_name}&location=${location}`
        })
    }

    return (
        <View className='category_index lazy-view'>

            <ListView
                className='category_listview'
                lazy
                hasMore={hasMore}
                onScrollToLower={onScrollToLower}
            >
                <View className='sub_grid'>
                    <AtGrid
                        columnNum={5}
                        data={gridData}
                        onClick={handleClickGrid}
                    />
                </View>
                <View className='tabs_cate'>
                    <AtTabs
                        current={currentCate}
                        scroll={cateTitleLsit.length > 3 ? true : false}
                        animated={true}
                        swipeable={false}
                        tabList={cateTitleLsit}
                        onClick={handleClickTabs}>
                        {
                            cateTitleLsit.map((item, idx) => {
                                return (
                                    <AtTabsPane key={'indx_' + idx} current={currentCate} index={idx} >
                                        <PublishList list={publishList} hasMore={hasMore} />
                                    </AtTabsPane>
                                )
                            })
                        }
                    </AtTabs>
                </View>
            </ListView>

        </View>
    )

}
Category.config = {
    navigationBarTitleText: '发布分类',
}