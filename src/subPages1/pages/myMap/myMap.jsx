import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView, Map } from '@tarojs/components'
import MapCoverView from './MapCoverView'
import { getWindowHeightNoPX } from '../../../utils/style'

import './myMap.scss'

export default function MyMap() {

    const router = useRouter()
    // const { latitude, longitude, } = router.params

    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [markers, setMarkers] = useState([])
    const [markerTaped, setMarkerTaped] = useState([])
    const [markerTapedId, setMarkerTapedId] = useState([])

    useEffect(() => {
        // 
    }, [])

    return (
        <View className='map_index'>
            <Map
                // id="map"
                style={{ width: '100%', height: `${getWindowHeightNoPX() - 75}px` }}
                controls={[{
                    id: 1,//必须要加id才能触发此事件
                    iconPath: '../../../images/icon_01.png',
                    position: {
                        top: 430,
                        left: 25,
                        width: 30,
                        height: 30,
                    },
                    clickable: true

                }]}
                showLocation
            // scale="14" 
            // controls='{{controls}}'
            // bindcontroltap="controltap" 
            // markers="{{markers}}" 
            // bindmarkertap="markertap" 
            // polyline="{{polyline}}" 
            // bindregionchange="regionchange" 
            // show-location 
            ></Map>
            <MapCoverView />
        </View>

    )
}