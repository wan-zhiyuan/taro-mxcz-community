import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import IconFont from '../../../../components/iconfont';
import ServiceSiteItem from '../ServiceSiteItem'

import './index.scss'

export default function Index(props) {

    const { list, isLoaded } = props

    return (
        <View className='service_site_list'>
            {
                isLoaded &&
                <View>
                    {
                        list.length === 0
                            ? <View className='empty'><IconFont name='meiyoushuju' size={200} /></View>
                            : <View>
                                {
                                    list.map((item, idx) => {
                                        return (
                                            <ServiceSiteItem key={'index_' + idx} item={item} />
                                        )
                                    })
                                }
                            </View>
                    }
                </View>
            }
        </View>
    )
}
Index.defaultProps = {
    list: [],
    isLoaded: false,
}