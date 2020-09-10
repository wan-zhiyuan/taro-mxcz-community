import Taro, { useState, useEffect, } from '@tarojs/taro'
import { View, MovableArea, MovableView } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { useDispatch } from '@tarojs/redux'
import { showPopQr } from '../../../../actions/community'
import { getWindowHeightNoPX } from '../../../../utils/style'

import './index.scss'

export default function Index(props) {

    const dispatch = useDispatch()

    const [movX, setMovX] = useState(getCartX())
    const [movY, setMovY] = useState(getCartY())

    function getCartY() {
        const info = Taro.getSystemInfoSync()
        const { screenHeight } = info
        // console.log('screenHeight=' + screenHeight)
        return (screenHeight)
    }
    function getCartX() {
        const info = Taro.getSystemInfoSync()
        const { screenWidth } = info
        return screenWidth
    }

    function handleComment() {
        Taro.navigateTo({
            url: `/subPages2/pages/communityComment/communityComment`
        })
    }

    function handleWeChat() {
        console.log('弹出社区二维码')
        dispatch(showPopQr())
    }

    return (
        <MovableArea className='movable_area' style={{ height: `${getWindowHeightNoPX() - 60}px` }}>
            <MovableView
                className='movable_view'
                direction='none'
                x={movX}
                y={movY}
                inertia={false}
            >
                <View className='view_box'>
                    <Button
                        className='view_item_1'
                        openType='share'
                        dataShare={{ foo: '123' }}
                    >分享</Button>
                </View>
                <View className='view_box'>
                    <Text className='view_item_2' onClick={handleComment}>评论</Text>
                </View>
                <View className='view_box'>
                    <Text className='view_item_3' onClick={handleWeChat}>微信</Text>
                </View>
            </MovableView>
        </MovableArea>
    )
}