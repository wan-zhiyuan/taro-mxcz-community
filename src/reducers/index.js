import { combineReducers } from 'redux'
import user from './user'
import home from './home'
import community from './community'
import publish from './publish'

export default combineReducers({
  user,
  home,
  community,
  publish,
})
