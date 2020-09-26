import Taro, { useState } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import { AtInput, AtIcon } from 'taro-ui'
import { useDispatch, useSelector } from '@tarojs/redux'
import { updateServiceSiteApply } from '../../../../actions/community'

import './index.scss'

export default function Index(props) {

    const serviceSiteApply = useSelector(state => state.community.serviceSiteApply)
    const dispatch = useDispatch()

    const [selector, setSelector] = useState(['社区助餐', '社区养老',])
    const [selectorChecked, setSelectorChecked] = useState('社区助餐')
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')

    function handleChangeName(value) {
        setName(value)
    }
    function hanldeBlurName(v) {
        let data = JSON.parse(JSON.stringify(serviceSiteApply))
        data.company_name = v
        dispatch(updateServiceSiteApply(data))
    }

    function handleChangeMobile(value) {
        setMobile(value)
    }
    function handleBlurMobile(v) {
        let data = JSON.parse(JSON.stringify(serviceSiteApply))
        data.company_phone = v
        dispatch(updateServiceSiteApply(data))
    }

    function onChange(e) {
        setSelectorChecked(selector[e.detail.value])

        let data = JSON.parse(JSON.stringify(serviceSiteApply))
        data.industry = selector[e.detail.value]
        dispatch(updateServiceSiteApply(data))
    }
    return (
        <View className='locate_info'>
            <AtInput
                name='value1'
                title='公司名称：'
                type='text'
                maxLength={32}
                placeholder='请输入公司名称'
                value={name}
                onChange={handleChangeName}
                onBlur={hanldeBlurName}
            />
            <AtInput
                name='value2'
                title='公司电话：'
                type='phone'
                maxLength={16}
                placeholder='请输入公司电话'
                value={mobile}
                onChange={handleChangeMobile}
                onBlur={handleBlurMobile}
            />
            <View className='industry'>
                <Text className='industry_label'>行业分类：</Text>
                <View className='industry_value'>
                    <View className='industry_value_item'>
                        <Picker mode='selector' range={selector} onChange={onChange}>
                            <View className='picker'>
                                <Text style={{ marginRight: Taro.pxTransform(16) }}>{selectorChecked}</Text>
                                <AtIcon value='chevron-right' size={16} color='#333'></AtIcon>
                                {/* {selectorChecked} */}
                            </View>
                        </Picker>
                    </View>
                </View>
            </View>
        </View>
    )
}
Index.defaultProps = {

}