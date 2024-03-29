import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { Toast } from '../../../../utils/toast'

import './index.scss'

export default function Index(props) {

    const { location } = props

    /* 跳转入驻页面 */
    function handleRuzhu() {
        if (location === '') {
            Toast('用户定位未授权')
        } else {
            Taro.navigateTo({
                url: `/subPages2/pages/serviceSiteLocate/serviceSiteLocate`
            })
        }
    }

    /* 跳转合作申请页面 */
    function handleCooperate() {
        Taro.navigateTo({
            url: `/subPages2/pages/cooperate/cooperate?status=0`
        })
    }

    return (
        <View className='service_site_footer' >
            <View className='left' onClick={handleCooperate}>
                <AtIcon prefixClass='icon' value='shouye' size='20' color='#fff'></AtIcon>
                <Text style={{ marginLeft: Taro.pxTransform(24) }}>我要合作</Text>
            </View>
            <View className='right' onClick={handleRuzhu}>
                <AtIcon prefixClass='icon' value='huiyuan' size='20' color='#fff'></AtIcon>
                <Text style={{ marginLeft: Taro.pxTransform(24) }}>入驻</Text>
            </View>
        </View>
    )
}
Index.defaultProps = {

}