import Taro, { useState, } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import MyRichText from '../../../../components/MyRichText'
import { useSelector } from '@tarojs/redux'

import './index.scss'

/* 社区的详情模块 */
export default function Index(props) {

    const detail = useSelector(state => state.community.businessDetail.basic)

    function goToLocate() {
        Taro.navigateTo({
            url: `/subPages2/pages/communityLocate/communityLocate`
        })
    }

    return (
        <View className='tab_main'>
            <View className='memo'>
                <Text>{detail.memo}</Text>
            </View>
            {/* <View className='details'>
                <MyRichText richText={detail.details} />
            </View> */}
            {
                detail.details !== '' &&
                <View className='main_details'>
                    {
                        detail.details.split('|').map((item, idx) => {
                            return (
                                <Image
                                    key={'index_' + idx}
                                    className='details_image'
                                    src={item}
                                    mode='widthFix'></Image>
                            )
                        })
                    }
                </View>
            }
            <View className='want_locate' onClick={goToLocate}>
                <View className='locate_btn'>我是商家，我要入驻</View>
            </View>
        </View>
    )
}

Index.defaultProps = {

}