import { USER_INFO, CITY_INFO } from '../constants/user'

const INITIAL_STATE = {
  userInfo: {},
  city: ''
}

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_INFO:
      let newState = JSON.parse(JSON.stringify(state))
      let newUserInfo = action.payload
      if (JSON.stringify(newState.userInfo) === JSON.stringify(newUserInfo)) {
        return state
      } else {
        return { ...state, userInfo: action.payload }
      }

      // ⬇️⬇️⬇️优化前代码⬇️⬇️⬇️
      // return { ...state, userInfo: action.payload }
    case CITY_INFO:
      return { ...state, city: action.payload }
    default:
      return state
  }
}