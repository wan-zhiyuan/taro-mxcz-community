import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

export default function Index(props) {

    const { } = props

    const [status, setStatus] = useState(20)
    const [navHeight, setNavHeight] = useState(44)

    useEffect(() => {
        let sysinfo = Taro.getSystemInfoSync()
        let statusHeight = sysinfo.statusBarHeight
        let isiOS = sysinfo.system.indexOf('iOS') > -1
        let navHeight
        if (!isiOS) {
            navHeight = 48;
        } else {
            navHeight = 44;
        }
        setStatus(statusHeight) // 顶部状态栏高度
        setNavHeight(navHeight) // 导航栏高度
    }, [])

    function goback() {
        let pages = Taro.getCurrentPages() // 栈中的所有页面
        console.log(pages)
        if (pages.length > 1) {
            Taro.navigateBack({
                delta: 1 // 返回上一级页面。
            });
        } else {
            // Toast('cannot navigate back at first page')
            console.log('cannot navigate back at first page')
            Taro.switchTab({
                url: '/pages/home/home'
            })
        }
    }

    return (
        <View className='mall_nav'>
            <View className='nav' style={{ height: `${status + navHeight}px` }}>
                <View className='status' style={{ 'height': status + 'px' }}></View>
                <View className='navbar' style={{ 'height': navHeight + 'px' }}>
                    <View className='back-icon' onClick={goback}>
                        <AtIcon value='chevron-left' size='20' color='#000'></AtIcon>
                    </View>
                    <View  className='nav-title'>
                        <Text>{'积分商城'}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
Index.defaultProps = {

}