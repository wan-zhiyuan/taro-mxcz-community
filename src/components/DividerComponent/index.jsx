import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtDivider } from 'taro-ui'

export default function Index(props) {

    const { content, fontSize, height, fontColor, lineColor } = props

    return (
        <View className='divider' style={{backgroundColor:'#fff'}}>
            <AtDivider
                content={content}
                fontSize={fontSize}
                height={height}
                fontColor={fontColor}
                lineColor={lineColor} />
        </View>
    )
}
Index.defaultProps = {
    content: '没有更多了',
    fontSize: 20,
    height: 50,
    fontColor: '#ccc',
    lineColor: '#ccc',
}