import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtFloatLayout } from "taro-ui"

import './index.scss'

/* 分享弹层组件 */
export default function Index(props) {

    const { isOpened, onClose } = props

    function handleClose() {
        onClose()
    }

    return (
        <View className='share_components'>
            <AtFloatLayout isOpened title="这是个标题" onClose={handleClose}>
                这是内容区 随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写这是内容区
                随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写
</AtFloatLayout>
        </View>
    )
}
Index.defaultProps = {
    isOpened: false,

}