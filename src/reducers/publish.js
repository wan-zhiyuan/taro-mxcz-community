import { PUBLISH_DETAIL, INFORMATION_DETAIL } from '../constants/publish'

const INITIAL_STATE = {
  publishDetail: {
    basic: {
      content: '',
      create_time: 0,
      images: '',
    },
    extend: [],
    read: [],
    like: [],
    comment: [],
  },
  informationDetail: {
    basic: {
      content: '',
      create_time: 0,
      images: '',
    },
    extend: [],
    read: [],
    like: [],
    comment: [],
  },
}

export default function publish(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PUBLISH_DETAIL:
      return { ...state, publishDetail: action.payload }
    case INFORMATION_DETAIL:
      return { ...state, informationDetail: action.payload }
    default:
      return state
  }
}