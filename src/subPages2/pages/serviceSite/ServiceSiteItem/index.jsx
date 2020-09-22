import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import IconFont from '../../../../assets/iconfont';
import { caleDistance } from '../../../../utils/tools'

import './index.scss'

export default function Index(props) {

    const { item } = props

    function handleItem() {
        Taro.navigateTo({
            url: `/subPages2/pages/serviceSiteDetail/serviceSiteDetail?target_id=${item.id}`
        })
    }

    return (
        <View className='service_site_item' onClick={handleItem}>
            <View className='item_box'>
                <View className='item_box1'>
                    <Image className='site_logo'></Image>
                    <View className='name_phone'>
                        <Text className='name'>{item.company_name || ''}</Text>
                        <View className='phone'>
                            <IconFont name='dianhua' size={30} />
                            <Text>{item.company_phone || ''}</Text>
                        </View>
                    </View>
                </View>
                <View className='item_box2'>
                    <View className='address'>
                        <IconFont name='dingwei' size={28} />
                        <Text style={{ marginLeft: Taro.pxTransform(6) }}>{item.address || ''}</Text>
                    </View>
                    <Text className='distance'>{caleDistance(item.distance || 0)}</Text>
                </View>
                <View className='item_box3'></View>
            </View>
        </View>
    )
}
Index.defaultProps = {
    item: {}
}