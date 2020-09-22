import {
    COMMUNITY_IS_OPENED_QRCODE,
    BUSINESS_APPLY_UPDATE, SERVICE_SITE_APPLU_UPDATE
} from '../constants/community'

const INITIAL_STATE = {

    communityDetail: {}, // 社区详情

    isOpenedPopQr: false,

    // 申请社区服务站
    serviceSiteApply: {
        location: '',
        logo: '',
        apply_mobile: '', // 申请手机号
        address: '',
        company_name: '',
        company_phone: '',
        industry: '', // 社区助餐或社区养老
        memo: '', // 简介
    },
    // 申请社区商户
    businessApply: {
        location: '',
        busines_name: '',
        apply_mobile: '', // 申请手机号
        address: '',
        keyword: '', // 行业关键字
        industry: '',// 行业分类 杨浦区或虹桥区
        memo: '',    // 商家简介
        contact_phone: '', // 联系电话
        notice: '',  // 商家公告
        logo: '',
        wechat_pic: '',
        banner: '',
        details: '',
    }
}

export default function community(state = INITIAL_STATE, action) {
    switch (action.type) {
        case COMMUNITY_IS_OPENED_QRCODE:
            const { isOpenedPopQr } = action.payload
            return { ...state, isOpenedPopQr }
        case BUSINESS_APPLY_UPDATE:
            return { ...state, businessApply: action.payload.businessApply }
        case SERVICE_SITE_APPLU_UPDATE:
            return { ...state, serviceSiteApply: action.payload.serviceSiteApply }
        default:
            return state
    }
}