import Taro, { useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { getDateTypeDays } from '../../../../utils/timer'

import './index.scss'

export default function Index(props) {

    const { detail } = props

    useEffect(()=>{
        console.log('#############')
        console.log(detail)
    },[])

    return (
        <View className='site_detail_header'>
            <View className='header_box'>
                <View className='left'>
                    <Image className='logo'></Image>
                </View>
                <View className='right'>
                    <Text className='name'>{detail.company_name || ''}</Text>
                    <View className='industry_createtime'>
                        <View className='industry'><Text>{detail.industry || ''}</Text></View>
                        <Text className='create_time'>入驻时间：{getDateTypeDays(detail.create_time || 0)}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
Index.defaultProps = {
    detail: {}
}