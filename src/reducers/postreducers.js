import { REQUEST_POST } from '../actions/postactions'

const initialState = {
  isLoaded: false,
  item: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_POST:
      return {
        ...state,
        isLoaded: true,
        item: action.result
      }
    default:
      return state
  }
}
