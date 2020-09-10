import { COMMUNITY_IS_OPENED_QRCODE } from '../constants/community'

const INITIAL_STATE = {

    communityDetail: {}, // 社区详情

    isOpenedPopQr: false,
}

export default function community(state = INITIAL_STATE, action) {
    switch (action.type) {
        case COMMUNITY_IS_OPENED_QRCODE:
            const { isOpenedPopQr } = action.payload
            return { ...state, isOpenedPopQr }
        default:
            return state
    }
}