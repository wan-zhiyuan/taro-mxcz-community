import { USER_INFO, CITY_INFO } from '../constants/user'

const INITIAL_STATE = {
  userInfo: {},
  city: ''
}

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_INFO:
      return { ...state, userInfo: action.payload }
    case CITY_INFO:
      return { ...state, city: action.payload }
    default:
      return state
  }
}