import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { AtFloatLayout } from "taro-ui"
import IconFont from '../../components/iconfont';

import './index.scss'

/* 分享弹层组件 */
export default function Index(props) {

    const { isOpened, onClose, showBill } = props

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

    function handleCancel() {
        onClose()
    }

    return (
        <View className='share_components'>
            <AtFloatLayout
                isOpened={isOpened}
                title=""
                onClose={handleClose}>
                <View className='box'>
                    <View className='share'>
                        <Button
                            className='wechat'
                            onClick={handleShare}
                            openType='share'
                        >
                            <IconFont name='weixin' size={120} />
                            <Text style={{ marginTop: '15px' }}>微信</Text>
                        </Button>
                        {
                            showBill &&
                            <Button
                                className='bill'
                                onClick={handleBill}
                            >
                                <IconFont name='haibao' size={120} />
                                <Text style={{ marginTop: '15px' }}>海报</Text>
                            </Button>
                        }

                    </View>
                    <View className='cancel' onClick={handleCancel}>取消</View>
                </View>
            </AtFloatLayout>
        </View>
    )
}
Index.defaultProps = {
    isOpened: false,
    onClose: () => { },
    showBill: true,
}