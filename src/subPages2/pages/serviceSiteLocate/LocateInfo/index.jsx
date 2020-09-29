import Taro, { useState } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import { AtInput, AtIcon } from 'taro-ui'
import { useDispatch, useSelector } from '@tarojs/redux'
import { updateServiceSiteApply } from '../../../../actions/community'

import './index.scss'

export default function Index() {

    const serviceSiteApply = useSelector(state => state.community.serviceSiteApply)
    const dispatch = useDispatch()

    const [selector, setSelector] = useState(['社区助餐', '社区养老',])
    const [selectorChecked, setSelectorChecked] = useState('请选择')

    /* 公司名称 */
    function handleChangeName(value) {
        // setName(value)
        let data = JSON.parse(JSON.stringify(serviceSiteApply))
        data.company_name = value
        dispatch(updateServiceSiteApply(data))
    }
    function hanldeBlurName(v) {
    }

    /* 公司电话 */
    function handleChangeMobile(value) {
        // setMobile(value)
        let data = JSON.parse(JSON.stringify(serviceSiteApply))
        data.company_phone = value
        dispatch(updateServiceSiteApply(data))
    }
    function handleBlurMobile(v) {
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
                value={serviceSiteApply.company_name || ''}
                onChange={handleChangeName}
                onBlur={hanldeBlurName}
            />
            <AtInput
                name='value2'
                title='公司电话：'
                type='phone'
                maxLength={16}
                placeholder='请输入公司电话'
                value={serviceSiteApply.company_phone || ''}
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