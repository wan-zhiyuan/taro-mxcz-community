import Taro, { useState } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import { AtInput, AtIcon } from 'taro-ui'

import './index.scss'

export default function Index() {

    const [name, setName] = useState('')
    const [selector, setSelector] = useState(['美国', '中国', '巴西', '日本'])
    const [selectorChecked, setSelectorChecked] = useState('所有社区')
    const [selector2, setSelector2] = useState(['浦东新区', '松江区',])
    const [selector2Checked, setSelector2Checked] = useState('浦东新区')

    function handleChangeName(value) {
        setName(value)
    }

    function onChange(e) {
        setSelectorChecked(selector[e.detail.value])
    }
    function onChange2(e) {
        setSelector2Checked(selector2[e.detail.value])
    }

    return (
        <View className='locate_part_1'>
            <AtInput
                name='value1'
                title='商家名称：'
                type='text'
                maxLength={16}
                placeholder='请输入商家名称'
                value={name}
                onChange={handleChangeName}
            />
            <View className='industry'>
                <Text className='industry_label'>行业分类：</Text>
                <View className='industry_value'>
                    <View className='industry_value_item'>
                        <Picker mode='selector' range={selector} onChange={onChange}>
                            <View className='picker'>
                                <Text style={{ marginRight: Taro.pxTransform(8) }}>{selectorChecked}</Text>
                                <AtIcon value='chevron-down' size='12px' color='#333'></AtIcon>
                                {/* {selectorChecked} */}
                            </View>
                        </Picker>
                    </View>
                    <View className='industry_value_item'>
                        <Picker mode='selector' range={selector2} onChange={onChange2}>
                            <View className='picker'>
                                <Text style={{ marginRight: Taro.pxTransform(8) }}>{selector2Checked}</Text>
                                <AtIcon value='chevron-down' size='12px' color='#333'></AtIcon>
                                {/* {selector2Checked} */}
                            </View>
                        </Picker>
                    </View>
                </View>
            </View>
        </View>
    )
}