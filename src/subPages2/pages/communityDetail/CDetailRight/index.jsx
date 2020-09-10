import Taro, { useState, useEffect, } from '@tarojs/taro'
import { View, MovableArea, MovableView } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

export default function Index(props) {

    const [movX, setMovX] = useState(getCartX())
    const [movY, setMovY] = useState(getCartY())

    function getCartY() {
        const info = Taro.getSystemInfoSync()
        const { screenHeight } = info
        return screenHeight - 150
    }
    function getCartX() {
        const info = Taro.getSystemInfoSync()
        const { screenWidth } = info
        return screenWidth - 80
    }

    function handleComment() {
        console.log('弹出填写评论弹窗')
    }

    function handleWeChat() {
        console.log('弹出社区二维码')
    }

    return (
        <MovableArea className='movable_area'>
            <MovableView
                className='movable_view'
                direction='none'
                x={movX}
                y={movY}
                inertia={false}
            // disabled={true}
            >
                {/* <Text className='view_item_1'>转发</Text> */}
                <Button
                    className='view_item_1'
                    openType='share'
                    dataShare={{ foo: '123' }}
                >分享</Button>
                <Text className='view_item_2' onClick={handleComment}>评论</Text>
                <Text className='view_item_3' onClick={handleWeChat}>微信</Text>
            </MovableView>
        </MovableArea>
    )
}