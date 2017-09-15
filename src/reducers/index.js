import { combineReducers } from 'redux'
import singlePost from './postreducers'


import {
  SELECT_REDDIT, INVALIDATE_REDDIT,
  REQUEST_POSTS, RECEIVE_POSTS, POSTS_REMOVED, POST_REMOVED
} from '../actions'

const selectedReddit = (state = 'reactjs', action) => {
  switch (action.type) {
    case SELECT_REDDIT:
      return action.reddit
    default:
      return state
  }
}

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {

    case INVALIDATE_REDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: postsById(state[action.reddit], action),
        lastUpdated: action.receivedAt
      }
    case POSTS_REMOVED:{
      console.log('in heeeere');
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: [],
      }
    }
    case POST_REMOVED:
      const items = {...state.items};
      delete items[action.id];
      return {
        ...state,
        items: items
      }
    default:
      return state
  }
}

const postsByReddit = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_REDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
    case POSTS_REMOVED:
    case POST_REMOVED:
      return {
        ...state,
        [action.reddit]: posts(state[action.reddit], action)
      }
    default:
      return state
  }
}

const postsById = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        ...action.posts.reduce((obj, post) => {
          obj[post.id] = post
          return obj
        }, {})
      }
    default:
      const { postId } = action
      if (postId) {
        return {
          ...state,
          [postId]: posts(state[postId], action)
        }
      }
      return state
  }
}

const rootReducer = combineReducers({
  'postsByReddit': postsByReddit,
  'postsById': postsById,
  'selectedReddit': selectedReddit,
  'singlePost': singlePost
})



export default rootReducer
