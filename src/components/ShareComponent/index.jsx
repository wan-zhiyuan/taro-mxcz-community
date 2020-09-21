import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { AtFloatLayout } from "taro-ui"
import IconFont from '../iconfont';

import './index.scss'

/* 分享弹层组件 */
export default function Index(props) {

    const { isOpened, onClose } = props

    function handleClose() {
        console.log('分享浮窗关闭')
        onClose()
    }

    function handleShare() {
        onClose()
    }
    function handleBill() {
        onClose()
    }

    return (
        <View className='share_components'>
            <AtFloatLayout
                isOpened={isOpened}
                title=""
                onClose={handleClose}>
                <View className='share'>
                    <Button
                        className='wechat'
                        onClick={handleShare}
                        openType='share'
                    >
                        <IconFont name='weixin' size={120} />
                        <Text style={{ marginTop: '15px' }}>微信</Text>
                    </Button>
                    <Button
                        className='bill'
                        onClick={handleBill}
                    >
                        <IconFont name='haibao' size={120} />
                        <Text style={{ marginTop: '15px' }}>海报</Text>
                    </Button>
                </View>
            </AtFloatLayout>
        </View>
    )
}
Index.defaultProps = {
    isOpened: false,
    onClose: () => { },
}