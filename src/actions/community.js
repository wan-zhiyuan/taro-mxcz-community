import { COMMUNITY_IS_OPENED_QRCODE } from '../constants/community'


export const showPopQr = () => {
    return {
        type: COMMUNITY_IS_OPENED_QRCODE,
        payload: { isOpenedPopQr: true }
    }
}
export const hidePopQr = () => {
    return {
        type: COMMUNITY_IS_OPENED_QRCODE,
        payload: { isOpenedPopQr: false }
    }
}

