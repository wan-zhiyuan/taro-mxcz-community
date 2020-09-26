import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtFab } from 'taro-ui'
import InformationList from '../../../components/InformationList'
import { getInformation, getInformationCate } from '../../../actions/publish'
import ListView, { LazyBlock } from "taro-listview";

import './Information.scss'

/* 资讯列表页面 */
export default function Information() {

    const [current, setCurrent] = useState(0)
    const [tabsList, setTabsList] = useState([
        // { title: '标签页1', cate_id: 0, cate_name: '', },
        // { title: '标签页2', cate_id: 1, cate_name: '', },
        // { title: '标签页3', cate_id: 2, cate_name: '', },
        // { title: '标签页4', cate_id: 3, cate_name: '', },
        // { title: '标签页5', cate_id: 4, cate_name: '', },
        // { title: '标签页6', cate_id: 5, cate_name: '', }
    ])
    const [cateId, setCateId] = useState(0)

    const [list, setList] = useState([])
    const [pageIndex, setPageIndex] = useState(1)
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        async function getInit() {
            const data = await getData()
            setList(data.list)
            setHasMore(data.hasMore)
            setIsLoaded(data.isLoaded)

            const res = await getInformationCate()
            if (res.code === 200) {
                let d = res.data
                let newList = [{ title: '全部', cate_id: 0 }]
                for (let i = 0; i < d.length; i++) {
                    newList.push({ title: d[i].title, cate_id: d[i].id })
                }
                setTabsList(newList)
            }
        }
        getInit()
    }, [])

    // 调用的三种情况：
    // 1、页面初始化 
    // 2、下拉加载 
    // 3、点击tabs切换的时候 
    // 处理好三种情况传入的参数
    async function getData(cate_id = 0, pIndex = pageIndex) {
        if (pIndex === 1) {
            setIsLoaded(false)
        }
        const res = await getInformation(cate_id, pIndex, 10)
        let hasMore = true
        let listNum = 0
        if (pIndex === 1) { // 场景1和3的时候，不取list的长度，避免旧数据还没有更新或清空
            listNum = res.data.list.length
        } else {
            listNum = list.length + res.data.list.length
        }
        if (listNum >= Number(res.data.total)) {
            console.log('没有更多了')
            hasMore = false
        }
        return { list: res.data.list, hasMore: hasMore, isLoaded: pIndex === 1 }
    }

    async function handleClick(v) {
        setCurrent(v)
        // 请求数据 更新
        let newCateId = tabsList[v].cate_id
        setCateId(newCateId)
        // 分页变量初始化
        // setList([])
        setPageIndex(1)
        setHasMore(true)

        const data = await getData(newCateId, 1)
        setList(data.list)
        setHasMore(data.hasMore)
        setIsLoaded(data.isLoaded)
    }

    /* 跳转资讯发布页面 */
    function handlePublish(e) {
        Taro.navigateTo({
            url: '/subPages3/pages/infoPublish/infoPublish'
        })
        e.stopPropagation() // 阻止点击事件继续冒泡
    }

    async function onScrollToLower() {
        console.log('onScrollToLower()')
        let index = pageIndex + 1
        setPageIndex(index)
        console.log('index=' + index)
        const { list: newList, hasMore } = await getData(cateId, index)
        console.log(newList)
        console.log('hasMore:' + hasMore)
        setList(list.concat(newList))
        setHasMore(hasMore)
    }

    return (
        <View className='information_index lazy-view'>
            <ListView
                className='information_listview'
                lazy
                isLoaded={isLoaded}
                hasMore={hasMore}
                onScrollToLower={onScrollToLower}
                color='#ff0044'
                // distanceToRefresh={100}
                footerLoading='加载'
                footerLoaded='没有更多了'
            >
                <AtTabs
                    current={current}
                    scroll={tabsList.length > 3 ? true : false}
                    swipeable={false}
                    tabList={tabsList}
                    onClick={handleClick}>
                    {
                        tabsList.map((item, idx) => {
                            return (
                                <AtTabsPane current={current} index={idx} key={'index_' + idx}>
                                    <InformationList list={list} />
                                </AtTabsPane>
                            )
                        })
                    }
                </AtTabs>
            </ListView>
            <View className='publish_button'>
                <AtFab size='small' onClick={handlePublish}>
                    <Text className='at-fab__icon at-icon at-icon-add'></Text>
                </AtFab>
            </View>
        </View>
    )

}
Information.config = {
    navigationBarTitleText: '资讯列表',
}