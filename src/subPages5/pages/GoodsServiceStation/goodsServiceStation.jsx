import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { getGoodsServiceStation } from '@/actions/mall'

import './goodsServiceStation.scss'

export default function GoodsServiceStation() {

    const [stationArr, setStationArr] = useState([])

    useEffect(() => {
        async function getInit() {
            const res = await getGoodsServiceStation()
            console.log(res)
            setStationArr(res.data)
        }
        getInit()
    }, [])

    function handleClick(id) {
        Taro.navigateTo({
            url: `/subPages5/pages/mall/mall?id=${id}`
        })
    }

    return (
        <View className='station_index'>
            <View className='at-row at-row--wrap'>
                {
                    stationArr.map((item, idx) => {
                        return (
                            <View
                                className='at-col at-col-4'
                                key={'index_' + idx}
                                onClick={() => { handleClick(item.id) }}
                            >
                                <View className='station_item'>
                                    <Image className='station_img' src={item.image}></Image>
                                    <View className='station_title'>{item.title || ''}</View>
                                </View>
                            </View>
                        )
                    })
                }

            </View>
        </View>
    )

}
GoodsServiceStation.config = {
    navigationBarTitleText: '商品社区服务站',
}