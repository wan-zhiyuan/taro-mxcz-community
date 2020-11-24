import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, WebView } from '@tarojs/components'

import './webview.scss'

export default function Webview() {

    const router = useRouter()
    const { url='', title='' } = router.params

    useEffect(()=>{
        Taro.setNavigationBarTitle(title)
    },[])

    function handleMessage() { }

    return (
        <WebView src={url} onMessage={handleMessage} />
    )

}
Webview.config = {
    navigationBarTitleText: '',
}