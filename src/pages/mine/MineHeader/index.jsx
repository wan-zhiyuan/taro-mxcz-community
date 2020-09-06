import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

export default function Index() {

    function handleSign() {
        console.log('跳转签到页面')
    }

    return (
        <View className='mine_top'>
            <View className='place'></View>
            <View className='mine_top_box'>
                <View className='mine_avatar_logout'></View>
                <Text className='mine_nickname'>楽</Text>
                {/* {
                    barUser.avatar ? (
                        <Image src={getImagePath(barUser.avatar)} className='mine_avatar' onClick={onImageClick} />
                    ) : (
                            // <AtAvatar size='large' circle text='未' />
                            <View className='mine_avatar_logout'>未</View>
                        )
                } */}
                <View className='mine_sign' onClick={handleSign}>
                    <AtIcon prefixClass='icon' value='qiandao' size='20' color='#fff'></AtIcon>
                    <Text style={{fontSize:'14px',lineHeight:'14px',fontWeight:'500',color:'#fff', marginLeft:'4px'}}>签到</Text>
                </View>
            </View>

        </View>
    )
}