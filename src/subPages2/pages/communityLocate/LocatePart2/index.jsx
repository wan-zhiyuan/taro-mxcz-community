import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtIcon } from 'taro-ui'

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

    // icon选择地址
    function chooseAddress() {
        Taro.getLocation({
            type: 'gcj02',
            // type: 'wgs84',
            success: function (res) {
                console.log(res)
                const latitude = res.latitude
                const longitude = res.longitude
                const speed = res.speed
                const accuracy = res.accuracy

                Taro.chooseLocation({
                    latitude: latitude,
                    longitude: longitude,
                    success: function (res) {
                        console.log(res)
                        Taro.showToast({
                            title: res.address
                        })
                    }
                })
            },
            fail: function (err) {
                console.log(err)
                Taro.getSetting({
                    success: function (res) {
                        let statu = res.authSetting
                        if (!statu['scope.userLocation']) {
                            Taro.showModal({
                                content: '检测到你还没打开地理位置权限，是否去开启？',
                                success: function (tip) {
                                    if (tip.confirm) {
                                        Taro.openSetting({
                                            success: function (data) {
                                                // 设置界面返回
                                                console.log('########123')
                                                if (data.authSetting["scope.userLocation"] === true) {
                                                    // 定位权限打开了
                                                    console.log('########4')
                                                    // 重新执行获取定位打开地址选择的功能
                                                    Taro.showLoading({
                                                        title: '加载中',
                                                    })
                                                    Taro.getLocation({
                                                        type: 'gcj02',
                                                        // type: 'wgs84',
                                                        success: function (res) {
                                                            console.log(res)
                                                            const latitude = res.latitude
                                                            const longitude = res.longitude
                                                            const speed = res.speed
                                                            const accuracy = res.accuracy

                                                            Taro.chooseLocation({
                                                                latitude: latitude,
                                                                longitude: longitude,
                                                                success: function (res) {
                                                                    console.log(res)
                                                                    Taro.showToast({
                                                                        title: res.address
                                                                    })
                                                                }
                                                            })
                                                        },
                                                        complete: function (res) {
                                                            Taro.hideLoading()
                                                        }
                                                    })

                                                } else {
                                                    // 定位权限未打开
                                                    console.log('########5')
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        } else {

                        }
                    }
                })
            }
        })
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