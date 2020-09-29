import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtIcon } from 'taro-ui'
import { useDispatch, useSelector } from '@tarojs/redux'
import { updateBusinessApply } from '../../../../actions/community'

import './index.scss'

export default function Index() {

    const businessApply = useSelector(state => state.community.businessApply)
    const dispatch = useDispatch()

    const [keyword, setKeyword] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [notice, setNotice] = useState('')

    /* 关键字 */
    function handleChangeKeyword(v) {
        // setKeyword(v)
        // 更新businessApply
        let data = JSON.parse(JSON.stringify(businessApply))
        data.keyword = v
        dispatch(updateBusinessApply(data))
    }
    function handleBlurKeyword(v) {
        // 更新businessApply
        // let data = JSON.parse(JSON.stringify(businessApply))
        // data.keyword = v
        // dispatch(updateBusinessApply(data))
    }
    /* 详细地址 */
    function handleChangeAddress(v) {
        // setAddress(v)
        let data = JSON.parse(JSON.stringify(businessApply))
        data.address = v
        dispatch(updateBusinessApply(data))
    }
    function handleBlurAddress(v) {
        // let data = JSON.parse(JSON.stringify(businessApply))
        // data.address = v
        // dispatch(updateBusinessApply(data))
    }
    /* 联系电话 */
    function handleChangePhone(v) {
        // setPhone(v)
        let data = JSON.parse(JSON.stringify(businessApply))
        data.contact_phone = v
        dispatch(updateBusinessApply(data))
    }
    function handleBlurPhone(v) {
        // let data = JSON.parse(JSON.stringify(businessApply))
        // data.contact_phone = v
        // dispatch(updateBusinessApply(data))
    }
    /* 商家公告 */
    function handleChangeNotice(v) {
        // setNotice(v)
        let data = JSON.parse(JSON.stringify(businessApply))
        data.notice = v
        dispatch(updateBusinessApply(data))
    }
    function handleBlurNotice(v) {
        let data = JSON.parse(JSON.stringify(businessApply))
        data.notice = v
        dispatch(updateBusinessApply(data))
    }

    /* 地址选择成功后的地址处理方法 */
    function changeAddress(address) {
        setAddress(address)
        let data = JSON.parse(JSON.stringify(businessApply))
        data.address = address
        dispatch(updateBusinessApply(data))
    }

    /* 地图选择地址 */
    function chooseAddress() {
        Taro.getLocation({
            type: 'gcj02',
            success: function (res) {
                console.log(res)
                const latitude = res.latitude
                const longitude = res.longitude
                Taro.chooseLocation({
                    latitude: latitude,
                    longitude: longitude,
                    success: function (res) {
                        console.log(res)
                        // Taro.showToast({
                        //     title: res.address
                        // })
                        changeAddress(res.address)
                    }
                })
            },
            fail: function (err) {
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
                                                if (data.authSetting["scope.userLocation"] === true) {
                                                    // 定位权限打开了
                                                    // 重新执行获取定位打开地址选择的功能
                                                    Taro.showLoading({
                                                        title: '加载中',
                                                    })
                                                    Taro.getLocation({
                                                        type: 'gcj02',
                                                        success: function (res) {
                                                            console.log(res)
                                                            const latitude = res.latitude
                                                            const longitude = res.longitude
                                                            Taro.chooseLocation({
                                                                latitude: latitude,
                                                                longitude: longitude,
                                                                success: function (res) {
                                                                    console.log(res)
                                                                    // Taro.showToast({
                                                                    //     title: res.address
                                                                    // })
                                                                    changeAddress(res.address)
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
                value={businessApply.keyword || ''}
                onChange={handleChangeKeyword}
                onBlur={handleBlurKeyword}
            />
            <AtInput
                name='value3'
                title='详细地址：'
                type='text'
                maxLength={16}
                placeholder='输入地址或点击地图选择'
                value={businessApply.address || ''}
                onChange={handleChangeAddress}
                onBlur={handleBlurAddress}
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
                value={businessApply.contact_phone || ''}
                onChange={handleChangePhone}
                onBlur={handleBlurPhone}
            />
            <AtInput
                name='value5'
                border={false}
                title='商家公告：'
                type='text'
                placeholder='请输入商家公告'
                value={businessApply.notice || ''}
                onChange={handleChangeNotice}
                onBlur={handleBlurNotice}
            />
        </View>
    )
}