import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { useSelector } from '@tarojs/redux'

import './index.scss'

export default function Index() {

    const userInfo = useSelector(state => state.user.userInfo)

    /* 签到 */
    function handleSignIn() {
        if (!userInfo.nickname) {
            Taro.navigateTo({
                url: '/subPages1/pages/login/login'
            })
            return
        }
        console.log('跳转签到页面')
        Taro.navigateTo({
            url: `/subPages1/pages/signIn/signIn`
        })
    }

    /* 登录 */
    function handleLogin() {
        Taro.navigateTo({
            url: '/subPages1/pages/login/login'
        })
    }


    return (
        <View className='mine_top'>
            <View className='mine_top_box'>
                {
                    !!userInfo.nickname
                        ? <Image className='mine_avatar' src={userInfo.avatar || ''} mode='scaleToFill'></Image>
                        : <View className='mine_avatar_logout'></View>
                }
                {
                    !!userInfo.nickname
                        ? <Text className='mine_nickname'>{userInfo.nickname || ''}</Text>
                        : <Text className='mine_nickname' onClick={handleLogin}>登录/注册</Text>
                }
                {/* {
                    barUser.avatar ? (
                        <Image src={getImagePath(barUser.avatar)} className='mine_avatar' onClick={onImageClick} />
                    ) : (
                            // <AtAvatar size='large' circle text='未' />
                            <View className='mine_avatar_logout'>未</View>
                        )
                } */}
                <View className='mine_sign' onClick={handleSignIn}>
                    <AtIcon prefixClass='icon' value='qiandao' size='20' color='#fff'></AtIcon>
                    <Text style={{ fontSize: '14px', lineHeight: '14px', fontWeight: '500', color: '#fff', marginLeft: '4px' }}>签到</Text>
                </View>
            </View>

        </View>
    )
}