import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

export default function Index(props) {

    const { detail, repost } = props

    /* 转发 */
    function handleRepost() {
        repost()
    }

    function handleNavi() {
        // 1、先使用腾讯位置服务逆解析出经纬度
        // 2、在使用openLocation打开微信自带位置导航页面

        let lat = Number(detail.lat || 0)
        let lng = Number(detail.lng || 0)
        Taro.openLocation({
            latitude: lat, // 纬度，范围为-90~90，负数表示南纬
            longitude: lng, // 经度，范围为-180~180，负数表示西经
            scale: 8, // 缩放比例
            name: detail.company_name || '公司名称',
            address: detail.address || '公司地址',
            success: function (r) {
                console.log(r)
            }
        })
    }

    function handlePhone() {
        Taro.makePhoneCall({
            phoneNumber: String(detail.company_phone)
        })
    }


    return (
        <View className='site_detail_footer'>
            <View className='footer_left'>
                <View className='footer_item' onClick={() => { Taro.switchTab({ url: '/pages/home/home' }) }}>
                    <AtIcon prefixClass='icon' value='shouye' size='23' color='#333'></AtIcon>
                    <Text className='item_txt'>首页</Text>
                </View>
                <View className='footer_item' onClick={handleRepost}>
                    <AtIcon prefixClass='icon' value='zhuanfa' size='23' color='#333'></AtIcon>
                    <Text className='item_txt'>转发</Text>
                </View>
                <View className='footer_item' onClick={handleNavi}>
                    <AtIcon prefixClass='icon' value='dingwei' size='23' color='#333'></AtIcon>
                    <Text className='item_txt'>导航</Text>
                </View>
            </View>
            <View className='footer_right' onClick={handlePhone}><Text>联系我们</Text></View>
        </View>
    )
}
Index.defaultProps = {
    detail: {},
    repost: ()=>{},
}