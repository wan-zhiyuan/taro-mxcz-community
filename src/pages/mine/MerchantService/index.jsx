import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

export default function Index(props) {

    const {  title } = props

    return (
        <View className='mine_service'>
            <View className='title'>
                <View style={{ height: '100%', width: '10px' }}></View>
                <AtIcon prefixClass='icon' value='xingji' size='20' color='#EBC00F'></AtIcon>
                <Text className='title_txt'>{title}</Text>
            </View>
            
            <View className='middle_item' onClick={() => { }}>
                <View className='item_left'>
                    <AtIcon prefixClass='icon' value='dianhua' size='16' color='#1CCEAB'></AtIcon>
                    <Text style={{ fontSize: '15px', lineHeight: '15px', marginLeft: '11px', color: '#333' }}>商家入口</Text>
                    <Text style={{ fontSize: '12px', lineHeight: '12px', marginLeft: '8px', color: '#333' }}>MERCHANT ENTRANCE</Text>
                </View>
                <View style={{ marginRight: '10px' }}>
                    <AtIcon value='chevron-right' size='17' color='#d4d4d4'></AtIcon>
                </View>
            </View>
        </View>
    )
}

Index.defaultProps = {
    title: '',
}