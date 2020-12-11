import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteRducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'

const reducer = combineReducers({
  anecdotes: anecdoteRducer, 
  notification: notificationReducer
})  

export const store = createStore(
  reducer, 
  composeWithDevTools()
)

export default reducer