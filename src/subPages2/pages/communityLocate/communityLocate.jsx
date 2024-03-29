import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtInput, AtIcon } from 'taro-ui'
import LocatePart1 from './LocatePart1'
import LocatePart2 from './LocatePart2'
import LocatePart3 from './LocatePart3'
import LocatePart4 from './LocatePart4'
import LocatePart5 from './LocatePart5'
import LocatePart6 from './LocatePart6'
import BusinessNotice from './BusinessNotice'
import { getWindowHeightNoPX } from '../../../utils/style'
import { createCommunityBusiness, updateBusinessApply } from '../../../actions/community'
import { useDispatch, useSelector } from '@tarojs/redux'
import { geocoder } from '../../../utils/geocoder'
import { ClUtils } from "mp-colorui/dist/weapp/lib"

import './communityLocate.scss'
import { Toast, ToastSuccess } from '../../../utils/toast'

export default function CommunityLocate() {

    const businessApply = useSelector(state => state.community.businessApply)
    const dispatch = useDispatch()

    const [allowNotice, setAllowNotice] = useState(true)

    useEffect(() => {
        // 获取行业分类信息,

        // 设置用户创建商户的时候 可选的分类数据

        return () => {
            console.log('CommunityLocate页面销毁')
            dispatch(updateBusinessApply()) // 清空数据
        }
    }, [])

    async function handleActivate() {
        console.log('申请开通')
        console.log(businessApply)
        let data = JSON.parse(JSON.stringify(businessApply))
        // 判断数据是否合规
        if (!ClUtils.rule.required(data.business_name || '')) {
            Toast('请输入商家名称')
            return
        }
        if (!ClUtils.rule.required(data.industry || '')) {
            data.industry = '杨浦区'
        }
        if (!ClUtils.rule.required(data.keyword || '')) {
            Toast('请输入行业关键字')
            return
        }
        if (!ClUtils.rule.required(data.address || '')) {
            Toast('请输入地址')
            return
        }
        if (!ClUtils.rule.phone(data.contact_phone)) {
            Toast('联系电话不正确')
            return
        }
        if (!ClUtils.rule.required(data.notice || '')) {
            Toast('请输入商家公告')
            return
        }
        if (!ClUtils.rule.required(data.logo || '')) {
            Toast('请选择商家logo')
            return
        }
        if (!ClUtils.rule.required(data.wechat_pic || '')) {
            Toast('请选择微信图片')
            return
        }
        if (!ClUtils.rule.required(data.images || '')) {
            Toast('商家轮播图至少添加一张')
            return
        }
        if (!ClUtils.rule.required(data.memo || '')) {
            Toast('请输入商家介绍')
            return
        }
        if (!ClUtils.rule.required(data.apply_mobile || '')) {
            Toast('请获取申请手机号')
            return
        }
        // 逆解析地址获取经纬度
        const res = await geocoder(data.address || '')
        console.log(res)
        if (res.statusCode === 200 && res.data.status === 0) {
            let location = res.data.result.location
            data.location = location.lat + ',' + location.lng
        } else {
            Toast('地址解析错误')
            return
        }
        data.op = 'business'
        console.log(data)
        // 发出申请开通请求
        const r = await createCommunityBusiness(data)
        if (r.code === 200) {
            console.log('申请开通成功')
            ToastSuccess('申请开通成功')
            Taro.showLoading()
            setTimeout(()=>{
                Taro.hideLoading()
                Taro.switchTab({
                    url: `/pages/home/home`
                })
            },1500)
        } else {
            Toast(r.msg)
        }
    }

    return (
        <View className='community_locate_index'>
            <ScrollView
                className='locate_scroll'
                scrollY
                scrollWithAnimation
                enableFlex={true}
                style={{ height: `${getWindowHeightNoPX() - 50}px` }}
            >
                {/* 名称 && 分类 */}
                <LocatePart1 />
                {/* 关键字 && 地址 && 电话 && 公告 */}
                <LocatePart2 />
                {/* logo && 微信图片 */}
                <LocatePart3 />
                {/* 商家轮播图 */}
                <LocatePart4 />
                {/* 商家介绍 && 商家详情图 */}
                <LocatePart5 />
                {/* 申请手机号 */}
                <LocatePart6 />
                <BusinessNotice />
            </ScrollView>
            <View className='footer' onClick={handleActivate}>申请开通</View>
        </View>
    )
}
CommunityLocate.config = {
    navigationBarTitleText: '商家入驻',
}