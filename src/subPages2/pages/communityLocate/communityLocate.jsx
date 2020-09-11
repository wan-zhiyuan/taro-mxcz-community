import Taro, { useState, useRouter } from '@tarojs/taro'
import { View, ScrollView, Picker } from '@tarojs/components'
import { AtInput, AtIcon } from 'taro-ui'
import LocatePart1 from './LocatePart1'
import LocatePart2 from './LocatePart2'

import './communityLocate.scss'

export default function CommunityLocate() {

    const [name, setName] = useState('')
    const [value, setValue] = useState('')
    const [selector, setSelector] = useState(['美国', '中国', '巴西', '日本'])
    const [selectorChecked, setSelectorChecked] = useState('所有社区')
    const [selector2, setSelector2] = useState(['浦东新区', '松江区',])
    const [selector2Checked, setSelector2Checked] = useState('浦东新区')

    function handleChangeName(value) {
        setName(value)
    }

    function handleChange(value) {
        setValue(value)
    }

    function onChange(e) {
        setSelectorChecked(selector[e.detail.value])
    }
    function onChange2(e) {
        setSelector2Checked(selector2[e.detail.value])
    }

    return (
        <View className='community_locate_index'>
            <LocatePart1 />
            <LocatePart2 />
        </View>
    )
}
CommunityLocate.config = {
    navigationBarTitleText: '商家入驻',
}