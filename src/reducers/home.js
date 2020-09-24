import { HOME_INDEX } from '../constants/home'

const INITIAL_STATE = {
  // 首页数据
  homeIndex: {
    banner: [
      // 'https://yanxuan.nosdn.127.net/bbd03799ba1e0cf7f37966966a0eb0bd.jpg',
      // 'https://yanxuan.nosdn.127.net/c4d2e4ad4fb2ce5ebe8e11f927198be1.jpg',
      // 'https://yanxuan.nosdn.127.net/0ecde204ff8fa5ae1a699d63e95b048a.jpg',
      // 'https://yanxuan.nosdn.127.net/f52b77ae677017256aed881c93f6f0a7.jpg',
    ]
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