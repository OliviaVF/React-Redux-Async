import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
const Posts = (props) => (
  <ul>
  {Object.keys(props.posts).map((key, id) =>
    <div key={id}>
      <li>{props.posts[key].title}</li>
      <button onClick={() => props.postRemoved(key)}>Remove</button>
      <NavLink to={props.posts[key].permalink}>View</NavLink>
    </div>
  )}

  </ul>
)

Posts.propTypes = {
  posts: PropTypes.object.isRequired
}

export default Posts
