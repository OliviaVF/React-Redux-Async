export const REQUEST_POST = 'REQUEST_POST'


export const fetchPost = permalink => dispatch => {
  // dispatch(requestPost(reddit))
  return fetch(`https://www.reddit.com${permalink}.json`)
    .then(response => response.json())
    .then((result) => dispatch({
      type: 'REQUEST_POST',
      result
    }))
}
