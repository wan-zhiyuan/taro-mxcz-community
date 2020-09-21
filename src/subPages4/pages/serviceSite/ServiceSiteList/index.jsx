import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import IconFont from '../../../../assets/iconfont';
import ServiceSiteItem from '../ServiceSiteItem'

import './index.scss'

export default function Index(props) {

    const { list } = props

    return (
        <View className='service_site_list'>
            {
                list.length === 0
                    ? <View className='empty'><IconFont name='meiyoushuju' size={200} /></View>
                    : <View></View>
            }
        </View>
    )
}
Index.defaultProps = {
    list: []
}