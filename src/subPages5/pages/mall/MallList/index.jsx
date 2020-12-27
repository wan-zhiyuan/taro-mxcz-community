import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { ClGrid } from "mp-colorui";
import GoodsItem from './GoodsItem'
import { useDispatch, useSelector } from '@tarojs/redux'
import { getGoodsCate, dispatchGoodsList } from '../../../../actions/mall'
import { getWindowHeightNoPX, getCustomNavHeight } from '../../../../utils/style'

import './index.scss'

export default function Index(props) {

    const { ssid } = props

    const goodsList = useSelector(state => state.mall.goodsList.list)
    const dispatch = useDispatch()

    const [subtags, setSubtags] = useState([])

    const [selectIndex, setSelectIndex] = useState(0)
    const [scrollInto, setScrollInto] = useState('')

    useEffect(() => {
        async function getInit() {
            let originalTags = [
                { id: 0, title: '全部' }
            ]
            const res = await getGoodsCate()
            if (res.code === 200) {
                let newTags = originalTags.concat(res.data)
                setSubtags(newTags)
            }
        }
        getInit()
    }, [])

    async function handleSubtag(index) {
        if (selectIndex !== index) {
            // 设置索引
            setSelectIndex(index)
            // 滚动到指定元素位置
            setScrollInto(`item-${index}`)
            // 更新列表数据
            await dispatch(dispatchGoodsList(0, 1000, subtags[index].id, ssid))
        }
    }

    return (
        <View className='mall_list' style={{ minHeight: `${getWindowHeightNoPX() - getCustomNavHeight()}px` }}>
            <View className='tabs_box'>
                <ScrollView
                    className='scroll_tabs'
                    scrollX={true}
                    scrollWithAnimation
                    scrollIntoView={scrollInto}
                >
                    {
                        subtags.map((item, idx) => {
                            return (
                                <View
                                    key={'index_' + idx}
                                    className='item_tag'
                                    id={`item-${idx}`}
                                    onClick={(e) => {
                                        handleSubtag(idx)
                                        e.stopPropagation()
                                    }}>
                                    <View className={selectIndex === idx ? 'tag_select' : 'tag'}>
                                        <Text>{item.title || ''}</Text>
                                        <View className='tag_slide' style={selectIndex === idx ? {} : { display: 'none' }}></View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
            <View className='goods_list'>
                {
                    goodsList.map((item, idx) => {
                        return (
                            <GoodsItem goods={item} key={'index_' + idx} />
                        )
                    })
                }
            </View>
        </View>
    )
}
Index.defaultProps = {
    ssid: 0,
}