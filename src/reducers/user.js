import { USER_INFO } from '../constants/user'

const INITIAL_STATE = {
  userInfo: {}
}

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_INFO:
      return { ...state, userInfo: action.payload }
    default:
      return state
  }
}