import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtIcon } from 'taro-ui'
import { chooseAddress } from '../../../../utils/location'

import './index.scss'

export default function Index() {

    const [keyword, setKeyword] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [notice, setNotice] = useState('')

    function handleChangeKeyword(v) {
        setKeyword(v)
    }
    function handleChangeAddress(v) {
        setAddress(v)
    }
    function handleChangePhone(v) {
        setPhone(v)
    }
    function handleChangeNotice(v) {
        setNotice(v)
    }

    return (
        <View className='locate_part_2'>
            <AtInput
                name='value2'
                title='关 键 字：'
                type='text'
                maxLength={16}
                placeholder='请输入行业关键字'
                value={keyword}
                onChange={handleChangeKeyword}
            />
            <AtInput
                name='value3'
                title='详细地址：'
                type='text'
                maxLength={16}
                placeholder='输入地址或点击地图选择'
                value={address}
                onChange={handleChangeAddress}
            >
                <View className='icon_address' onClick={chooseAddress}>
                    <AtIcon prefixClass='icon' value='dingwei' size='16' color='#00D8A0'></AtIcon>
                </View>
            </AtInput>
            <AtInput
                name='value4'
                title='联系电话：'
                type='phone'
                placeholder='请输入你的手机号'
                value={phone}
                onChange={handleChangePhone}
            />
            <AtInput
                name='value5'
                border={false}
                title='商家公告：'
                type='text'
                placeholder='请输入商家公告'
                value={notice}
                onChange={handleChangeNotice}
            />
        </View>
    )
}