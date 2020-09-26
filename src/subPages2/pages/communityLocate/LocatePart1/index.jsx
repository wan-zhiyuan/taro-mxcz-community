import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import { AtInput, AtIcon } from 'taro-ui'
import { useDispatch, useSelector } from '@tarojs/redux'
import { updateBusinessApply } from '../../../../actions/community'

import './index.scss'

export default function Index(props) {

    const { industryList } = props

    const businessApply = useSelector(state => state.community.businessApply)
    const dispatch = useDispatch()

    /* 可删除 */
    // const [name, setName] = useState('')

    const [selector, setSelector] = useState([])
    const [selectorChecked, setSelectorChecked] = useState('所有社区')
    const [selector2, setSelector2] = useState([ '杨浦区','虹口区'])
    const [selector2Checked, setSelector2Checked] = useState('杨浦区')

    useEffect(() => {
        // 提交的时候，如果industry为空，默认取数组第一支值

    }, [])

    /* 可删除 */
    // function handleChangeName(value) {
    //     setName(value)
    // }
    /* 输入框失去焦点的时候触发 */
    function handleBlurName(v) {
        console.log('商家名称输入框失去焦点:' + v)
        // 更新businessApply
        let data = JSON.parse(JSON.stringify(businessApply))
        data.busines_name = v
        // data['busines_name'] = v // 两种方式都可以
        dispatch(updateBusinessApply(data))
    }

    function onChange(e) {
        setSelectorChecked(selector[e.detail.value])
    }
    function onChange2(e) {
        console.log('onChange2()')
        // 更新选中状态
        setSelector2Checked(selector2[e.detail.value])
        // 更新businessApply
        let data = JSON.parse(JSON.stringify(businessApply))
        data.industry = selector2[e.detail.value]
        dispatch(updateBusinessApply(data))
    }

    return (
        <View className='locate_part_1'>
            <AtInput
                name='value1'
                title='商家名称：'
                type='text'
                maxLength={16}
                placeholder='请输入商家名称'
                // value={name}
                // onChange={handleChangeName}
                onBlur={handleBlurName}
            />
            <View className='industry'>
                <Text className='industry_label'>行业分类：</Text>
                <View className='industry_value'>
                    <View className='industry_value_item'>
                        <Picker mode='selector' range={selector} onChange={onChange}>
                            <View className='picker'>
                                <Text style={{ marginRight: Taro.pxTransform(8) }}>{selectorChecked}</Text>
                                <AtIcon value='chevron-down' size='12px' color='#333'></AtIcon>
                            </View>
                        </Picker>
                    </View>
                    <View className='industry_value_item'>
                        <Picker mode='selector' range={selector2} onChange={onChange2}>
                            <View className='picker'>
                                <Text style={{ marginRight: Taro.pxTransform(8) }}>{selector2Checked}</Text>
                                <AtIcon value='chevron-down' size='12px' color='#333'></AtIcon>
                            </View>
                        </Picker>
                    </View>
                </View>
            </View>
        </View>
    )
}
Index.defaultProps = {
    industryList: []
}