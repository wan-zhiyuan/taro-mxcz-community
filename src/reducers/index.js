import { combineReducers } from 'redux'
import user from './user'
import home from './home'
import community from './community'

export default combineReducers({
  user,
  home,
  community,
})
