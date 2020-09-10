import Taro, { useState, useEffect } from '@tarojs/taro'
import { RichText } from '@tarojs/components'
import { isEmpty } from '../../utils/is'
import { richParse } from '../../utils/tools'

import './index.scss'

export default function MyRichText(props) {

    const { richText } = props

    return (
        <View>
            {
                !isEmpty(richText) &&
                <RichText className='richtext' nodes={richParse(richText)} ></RichText>
            }
        </View>
    )
}

MyRichText.defaultProps = {
    richText: ''
}