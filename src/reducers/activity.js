import { COMMUNITY_ACTIVITY_DETAIL, ACTIVITY_MY_ENROLL } from '../constants/activity'

const INITIAL_STATE = {
  // 社区活动详情
  communityActivityDetail: {
    basic: {
      images: '',
    },
  },
  myEnrollList: [],

}

export default function activity(state = INITIAL_STATE, action) {
  switch (action.type) {
    case COMMUNITY_ACTIVITY_DETAIL:
      return { ...state, communityActivityDetail: action.payload }
    case ACTIVITY_MY_ENROLL:
      return { ...state, myEnrollList: action.payload }
    default:
      return state
  }
}