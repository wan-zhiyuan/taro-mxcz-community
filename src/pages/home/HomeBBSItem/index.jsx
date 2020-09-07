import Taro, { useState } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

export default function Index(props) {

    const { bbsItem } = props

    return (
        <View className='bbs_item'>
            <View className='item_top'>
                <View className='item_user'>
                    {
                        bbsItem.avatar
                            ? <Image className='user_avatar' src={bbsItem.avatar} mode='scaleToFill'></Image>
                            : <Image className='user_avatar_default'></Image>
                    }
                    <View className='item_user_right'>
                        <Text className='user_name'>{bbsItem.realname || ''}</Text>
                        <Text className='item_cate'>二手闲置</Text>
                    </View>
                </View>
                <View className='item_detail'>{`查看详情>>`}</View>
            </View>
            <View className='item_desc'>{bbsItem.desc || ''}</View>
            {/* 最多只显示四张 */}
            {
                bbsItem.picArr.length !== 0 &&
                <View className='item_pic'>
                    {
                        bbsItem.picArr.map((item, idx) => {
                            return (
                                <Image
                                    key={'index_' + idx}
                                    className='bbs_pic'
                                    src={item}
                                    mode='scaleToFill'
                                ></Image>
                            )
                        })
                    }
                </View>
            }
            <View className='item_msg'>
                <Text className='item_time'>{bbsItem.publishTime || ''}发布</Text>
                <View className='msg_right'>
                    <View className='item_readnum'>
                        <AtIcon prefixClass='icon' value='liulan' size='12px' color='#333'></AtIcon>
                        <Text style={{marginLeft:'4px'}}>{bbsItem.readed || 0}</Text>
                        <Text>浏览</Text>
                    </View>
                    <View className='item_praise'>
                        <AtIcon prefixClass='icon' value='dianzan' size='12px' color='#333'></AtIcon>
                        <Text style={{marginLeft:'4px'}}>{bbsItem.praise || 0}</Text>
                        <Text>赞</Text>
                    </View>
                </View>

            </View>
        </View>
    )
}

Index.defaultProps = {
    bbsItem: {
        picArr:[]
    }
}