import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

// 弹窗外层的包裹框
export default function Index(props) {
    
    const { children, isOpened, onClose} = props

    function handleClick(e) {
        onClose()
        // 主要目的：避免点击穿透
        e.stopPropagation() // 阻止点击事件继续冒泡
    }

    return (
        <View className='popup_wrap' style={isOpened ? {} : { display:'none'}} onClick={handleClick}>
            <View className='mask'>
                <View className='content'>
                    {children}
                </View>
            </View>
        </View>
    )
}

Index.defaultProps = {
    isOpened: false,
    onClose: ()=>{},
}