import React, { Component } from 'react'

import { connect } from 'react-redux'
import { fetchPost } from '../actions/postactions'


class Post extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPost(this.props.location.pathname))
  }

  render(){
    const { isLoaded } = this.props

    return (
      <div>
        {isLoaded ?
          <div>
          <div>
            {this.props.singlePost.item[0].data.children[0].data.title}
          </div>

          <ul>
            {this.props.singlePost.item[1].data.children.map((comment, i) =>
              <li key={i}>{comment.data.body}</li>
            )}
          </ul>
        

          </div>
          :
          <h2>Loading...</h2>
        }
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    singlePost: state.singlePost,
    isLoaded: state.singlePost.isLoaded,
  }
}

export default connect(mapStateToProps)(Post)
