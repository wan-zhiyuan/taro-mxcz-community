import {
  PUBLISH_DETAIL, INFORMATION_DETAIL, PUBLISH_APPLY_UPDATE, INFORMATION_APPLY_UPDATE,
} from '../constants/publish'

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
  publishApply: {
    cate_id: 0,
    cate_name: '',
    content: '',
    images: '',
    contact_name: '', // 联系人
    contact_mobile: '', // 联系方式
  },
  informationApply: {
    cate_id: 0,
    cate_name: '',
    title: '',
    content: '',
    images: '',
    video_url: '',
  },
}

export default function publish(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PUBLISH_DETAIL:
      return { ...state, publishDetail: action.payload }
    case INFORMATION_DETAIL:
      return { ...state, informationDetail: action.payload }
    case PUBLISH_APPLY_UPDATE:
      return { ...state, publishApply: action.payload.publishApply }
    case INFORMATION_APPLY_UPDATE:
      console.log('######################')
      console.log(action.payload)
      return { ...state, informationApply: action.payload.informationApply }
    default:
      return state
  }
}