import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useDispatch, useSelector } from '@tarojs/redux'
import { updateInformationApply, getInformationCate } from '../../../../actions/publish'

import './index.scss'

export default function Index(props) {

    const { } = props

    const informationApply = useSelector(state => state.publish.informationApply)
    const dispatch = useDispatch()

    const [category, setCategory] = useState([])
    const [currentCate, setCurrentCate] = useState(0)

    useEffect(() => {
        getInformationCate().then(res => {
            if (res.code === 200) {
                let d = res.data
                let newList = [{ title: '请选择', cate_id: 0 }]
                for (let i = 0; i < d.length; i++) {
                    newList.push({ title: d[i].title, cate_id: d[i].id })
                }
                setCategory(newList)
            }
        })
    }, [])

    // 选择分类
    function changeCurrentCate(idx) {
        setCurrentCate(idx)
        if (idx === 0) {
            // 更新informationApply
            let data = JSON.parse(JSON.stringify(informationApply))
            data.cate_id = 0
            data.cate_name = ''
            dispatch(updateInformationApply(data))
        } else {
            // 更新informationApply
            let data = JSON.parse(JSON.stringify(informationApply))
            data.cate_id = category[idx].cate_id
            data.cate_name = category[idx].title
            dispatch(updateInformationApply(data))
        }
    }

    return (
        <View className='info_publish_header'>
            <Text className='title'>选择主题分类</Text>
            <View className='publish_category'>
                <ScrollView
                    className='category_scroll'
                    scrollX
                    scrollWithAnimation
                    enableFlex={true}
                >
                    {
                        category.map((item, idx) => {
                            return (
                                <View
                                    className='item_category'
                                    key={'index_' + idx}
                                    style={(currentCate === idx) ? { color: '#ff0044', borderColor: '#ff0044' } : {}}
                                    onClick={() => { changeCurrentCate(idx) }}
                                >
                                    {item.title}
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    )
}
Index.defaultProps = {

}