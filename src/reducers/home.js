import { HOME_INDEX } from '../constants/home'

const INITIAL_STATE = {
  // 首页数据
  homeIndex: {
    banner: [],
    middle_navigation: [],
  },
}

export default function home(state = INITIAL_STATE, action) {
  switch (action.type) {
    case HOME_INDEX:
      return { ...state, homeIndex: action.payload }
    default:
      return state
  }
}