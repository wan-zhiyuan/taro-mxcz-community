import { COMMUNITY_ACTIVITY_DETAIL, VOLUNTEER_ACTIVITY_DETAIL } from '../constants/activity'

const INITIAL_STATE = {
  // 社区活动详情
  communityActivityDetail: {
    basic: {
      images: '',
    },
  },

  // 志愿者活动详情
  volunteerActivityDetail: {
    basic: {},
  },
  
}

export default function activity(state = INITIAL_STATE, action) {
  switch (action.type) {
    case COMMUNITY_ACTIVITY_DETAIL:
      return { ...state, communityActivityDetail: action.payload }
    case VOLUNTEER_ACTIVITY_DETAIL:
      return { ...state, volunteerActivityDetail: action.payload }
    default:
      return state
  }
}