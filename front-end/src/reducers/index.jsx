import { combineReducers } from 'redux'
import reducerApp from './app'
import reducerPosts from './posts'
import reducerStats from './stats'
import reducerUser from './user'

export default combineReducers({
    app:reducerApp,
    posts:reducerPosts,
    stats:reducerStats,
    user:reducerUser
})
