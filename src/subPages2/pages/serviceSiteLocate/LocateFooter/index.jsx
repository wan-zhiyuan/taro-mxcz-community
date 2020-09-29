import Taro, { useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useDispatch, useSelector } from '@tarojs/redux'
import { createCommunityServiceSite, updateServiceSiteApply } from '../../../../actions/community'
import { geocoder } from '../../../../utils/geocoder'
import { ClUtils } from "mp-colorui/dist/weapp/lib"
import { Toast, ToastSuccess } from '../../../../utils/toast'

import './index.scss'

export default function Index(props) {

    const { } = props

    const serviceSiteApply = useSelector(state => state.community.serviceSiteApply)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            console.log('serviceSiteLocate页面销毁')
            dispatch(updateServiceSiteApply()) // 清空数据
        }
    },[])

    async function handleApply() {
        console.log('申请入驻')
        console.log(serviceSiteApply)
        let data = JSON.parse(JSON.stringify(serviceSiteApply))
        // 判断数据是否合规
        if (!ClUtils.rule.required(data.logo || '')) {
            Toast('请选择logo')
            return
        }
        if (!ClUtils.rule.required(data.address || '')) {
            Toast('请选择公司地址')
            return
        }
        if (!ClUtils.rule.required(data.company_name || '')) {
            Toast('请输入公司名称')
            return
        }
        if (!ClUtils.rule.phone(data.company_phone)) {
            Toast('电话不正确')
            return
        }
        if (!ClUtils.rule.required(data.industry || '')) {
            Toast('请选择行业分类')
            return
        }
        if (!ClUtils.rule.required(data.memo || '')) {
            Toast('请输入公司简介')
            return
        }
        data.op = 'service_site'
        console.log(data)
        // 发出申请入驻请求
        const r = await createCommunityServiceSite(data)
        if (r.code === 200) {
            console.log('申请入驻成功')
            ToastSuccess('申请入驻成功')
            Taro.showLoading()
            setTimeout(() => {
                Taro.hideLoading()
                Taro.switchTab({
                    url: `/pages/home/home`
                })
            }, 1500)
        } else {
            Toast(r.msg)
        }
    }

    return (
        <View className='locate_footer'>
            <View className='footer_box'>
                <Text style={{ marginLeft: Taro.pxTransform(24) }}>入驻社区服务站</Text>
            </View>
            <View className='locate_btn' onClick={handleApply}>
                <Text>申请入驻</Text>
            </View>
        </View>
    )
}
Index.defaultProps = {

}