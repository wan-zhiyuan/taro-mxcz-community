import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ClCard, ClInput } from 'mp-colorui'
import { ClUtils } from "mp-colorui/dist/weapp/lib"
import { applyVolunteer } from '../../../actions/activity'
import { Toast } from '../../../utils/toast'
import { useSelector } from '@tarojs/redux'

import './volunteer.scss'

export default function Volunteer() {

    const userInfo = useSelector(state => state.user.userInfo)

    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [address, setAddress] = useState('')
    const [reason, setReason] = useState('')

    useEffect(() => {
        // 判断用户是否已经是志愿者，是：返回首页  不是：继续申请
        if (Number(userInfo.is_volunteer || 0) === 1) {
            Taro.showModal({
                title: '提示',
                content: '您已经是志愿者。',
                success: function (res) {
                    console.log(res)
                    if (res.confirm) {
                        Taro.navigateBack()
                    } else if (res.cancel) {
                        
                    }
                },
                showCancel: false,
            })
        }
    }, [])

    async function handleApply() {
        console.log('申请')
        if (!ClUtils.rule.required(name)) {
            Toast('姓名不允许为空')
            return
        }
        if (!ClUtils.rule.phone(mobile)) {
            Toast('联系电话不正确')
            return
        }
        if (!ClUtils.rule.required(address)) {
            Toast('地址不允许为空')
            return
        }
        if (!ClUtils.rule.required(reason)) {
            Toast('理由不允许为空')
            return
        }
        let postData = {
            op: 'volunteer',
            realname: name,
            mobile: mobile,
            address: address,
            reason: reason,
        }
        const res = await applyVolunteer(postData)
        if (res.code === 200) {
            Toast('申请成功')
            Taro.navigateBack()
        } else {
            Toast(res.msg)
        }
    }

    return (
        <View className='volunteer_index'>
            <View className='msg'>
                <ClCard type="card">
                    <ClInput title="真实姓名" placeholder="请输入您的姓名"
                        value={name} onChange={(v) => { setName(v) }} />
                    <ClInput title="联系电话" placeholder="请输入您的电话" type="number"
                        value={mobile} onChange={(v) => { setMobile(v) }} />
                    <ClInput title="联系地址" placeholder="请输入您的地址" type="text"
                        value={address} onChange={(v) => { setAddress(v) }} />
                    <ClInput title="申请理由" placeholder="请输入您申请的理由" type="text"
                        value={reason} onChange={(v) => { setReason(v) }} />
                </ClCard>
            </View>
            <View className='apply' onClick={handleApply}>申请</View>
        </View>
    )

}
Volunteer.config = {
    navigationBarTitleText: '志愿者申请',
}