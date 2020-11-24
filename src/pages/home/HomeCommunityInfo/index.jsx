import Taro, { useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'

import './index.scss'

export default function Index(props) {

    const { } = props

    const userInfo = useSelector(state => state.user.userInfo)
    const middle_navigation = useSelector(state => state.home.homeIndex.middle_navigation)

    function naviToMall() {
        if (!userInfo.nickname) {
            Taro.navigateTo({
                url: '/subPages1/pages/login/login'
            })
            return
        }
        Taro.navigateTo({
            url: '/subPages5/pages/mall/mall'
        })
    }

    /* 跳转发布信息列表 及 分类 */
    function naviToPublishCate() {
        if (!userInfo.nickname) {
            Taro.navigateTo({
                url: '/subPages1/pages/login/login'
            })
            return
        }
        Taro.navigateTo({
            url: '/subPages3/pages/category/category'
        })
    }

    /* 跳转资讯信息列表 */
    function naviToCommunityInfo() {
        if (!userInfo.nickname) {
            Taro.navigateTo({
                url: '/subPages1/pages/login/login'
            })
            return
        }
        Taro.navigateTo({
            url: '/subPages3/pages/information/information'
        })
    }

    function naviTo(href) {
        if (!userInfo.nickname) {
            Taro.navigateTo({
                url: '/subPages1/pages/login/login'
            })
            return
        }
        switch (href) {
            case 'mall':
                Taro.navigateTo({
                    url: '/subPages5/pages/mall/mall'
                })
                return;
            case 'category':
                Taro.navigateTo({
                    url: '/subPages3/pages/category/category'
                })
                return;
            case 'information':
                Taro.navigateTo({
                    url: '/subPages3/pages/information/information'
                })
                return;
            default:
                break;
        }
    }

    return (
        <View className='home_community_info'>
            <View className='title'>
                <Text style={{ marginLeft: '15px' }}>社区资讯</Text>
            </View>
            <View className='content'>
                {
                    middle_navigation.length <= 1
                        ?
                        <Image
                            className='content_item_one'
                            src={middle_navigation[0].image}
                            mode='scaleToFill'
                            onClick={()=>{naviTo(middle_navigation[0].href)}}></Image>
                        :
                        <View className='content_item_two'>
                            <Image
                                className='content_item_left'
                                src={middle_navigation[0].image}
                                mode='scaleToFill'
                                onClick={()=>{naviTo(middle_navigation[0].href)}}></Image>
                            <Image
                                className='content_item_right'
                                src={middle_navigation[1].image}
                                mode='scaleToFill'
                                onClick={()=>{naviTo(middle_navigation[1].href)}}></Image>
                        </View>
                }

            </View>
        </View>
    )
}
Index.defaultProps = {

}