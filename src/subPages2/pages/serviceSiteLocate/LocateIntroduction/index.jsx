import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ClTextarea } from "mp-colorui";
import { useDispatch, useSelector } from '@tarojs/redux'
import { updateServiceSiteApply } from '../../../../actions/community'

import './index.scss'

export default function Index(props) {

    const { } = props

    const serviceSiteApply = useSelector(state => state.community.serviceSiteApply)
    const dispatch = useDispatch()

    /* 简介 */
    function handleChangeMemo(v) {
        let data = JSON.parse(JSON.stringify(serviceSiteApply))
        data.memo = v
        dispatch(updateServiceSiteApply(data))
    }

    return (
        <View className='locate_introduction'>
            <Text className='label'>公司简介：</Text>
            <View className='value'>
                <ClTextarea
                    className='textarea'
                    value={serviceSiteApply.memo || ''}
                    onChange={handleChangeMemo}
                    placeholder="请输入……"
                    showLengthTip
                    height={220}
                    maxLength={200} />
            </View>

        </View>
    )
}
Index.defaultProps = {

}