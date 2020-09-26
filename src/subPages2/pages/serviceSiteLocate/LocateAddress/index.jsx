import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useDispatch, useSelector } from '@tarojs/redux'
import { updateServiceSiteApply } from '../../../../actions/community'

import './index.scss'

export default function Index(props) {

    const { } = props

    const serviceSiteApply = useSelector(state => state.community.serviceSiteApply)
    const dispatch = useDispatch()

    // const [address, setAddress] = useState('')

    function chooseAddress() {
        Taro.getLocation({
            type: 'gcj02',
            success: function (res) {
                console.log(res)
                const latitude = res.latitude
                const longitude = res.longitude
                Taro.chooseLocation({
                    latitude: latitude,
                    longitude: longitude,
                    success: function (res) {
                        console.log(res)
                        // setAddress(res.address)
                        let data = JSON.parse(JSON.stringify(serviceSiteApply))
                        data.address = res.address
                        data.location = res.latitude + ',' + res.longitude
                        dispatch(updateServiceSiteApply(data))
                    }
                })
            },
        })
    }

    return (
        <View className='locate_address'>
            <Text className='title'>公司地址</Text>
            {
                serviceSiteApply.address === ''
                    ? <Text className='tishi'>请定位您的位置信息</Text>
                    : <Text className='value'>{serviceSiteApply.address}</Text>
            }
            <View className='location' onClick={chooseAddress}>{!!serviceSiteApply.address ? '重新定位' : '定位'}</View>

        </View>
    )
}
Index.defaultProps = {

}