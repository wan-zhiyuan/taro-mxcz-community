import { GOODS_LIST, GOODS_DETAIL } from '../constants/mall'

const INITIAL_STATE = {
    goodsList: {
        list:[],
        banner:[],
    },
    goodsDetail: {
        images:''
    }
}

export default function home(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GOODS_LIST:
            return { ...state, goodsList: action.payload }
        case GOODS_DETAIL:
            return { ...state, goodsDetail: action.payload }
        default:
            return state
    }
}