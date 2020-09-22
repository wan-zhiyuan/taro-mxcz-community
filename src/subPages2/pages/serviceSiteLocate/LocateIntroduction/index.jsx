import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ClTextarea } from "mp-colorui";

import './index.scss'

export default function Index(props) {

    const { } = props

    const[value, setValue] = useState('')

    function onChange(v) {
        setValue(v)
    }

    return (
        <View className='locate_introduction'>
            <Text className='label'>公司简介：</Text>
            <View className='value'>
                <ClTextarea 
                className='textarea'
                value={value}
                onChange={onChange}
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